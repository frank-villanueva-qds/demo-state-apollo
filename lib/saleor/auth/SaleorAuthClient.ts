import {
  CHECKOUT_CUSTOMER_DETACH,
  PASSWORD_RESET,
  TOKEN_CREATE,
  TOKEN_DESACTIVATE_ALL,
  TOKEN_REFRESH,
} from './mutations'
import {
  type CustomerDetachVariables,
  type Fetch,
  type PasswordResetResponse,
  type PasswordResetVariables,
  type TokenCreateResponse,
  type TokenCreateVariables,
  type TokenRefreshResponse,
} from './types'
import { getRequestData, isExpiredToken } from './utils'

import { SaleorAuthStorageHandler } from './SaleorAuthStorageHandler'
import invariant from 'ts-invariant'

export interface SaleorAuthClientProps {
  onAuthRefresh?: (isAuthenticating: boolean) => void
  saleorApiUrl: string
  storage: Storage | undefined
}

export class SaleorAuthClient {
  private accessToken: string | null = null
  private tokenRefreshPromise: null | Promise<Response> = null
  private readonly onAuthRefresh?: (isAuthenticating: boolean) => void
  private readonly saleorApiUrl: string
  private readonly storageHandler: SaleorAuthStorageHandler | null
  /**
   * Use ths method to clear event listeners from storageHandler
   *  @example
   *  ```jsx
   *  useEffect(() => {
   *    return () => {
   *      SaleorAuthClient.cleanup();
   *    }
   *  }, [])
   *  ```
   */

  constructor({ saleorApiUrl, storage, onAuthRefresh }: SaleorAuthClientProps) {
    this.storageHandler = storage ? new SaleorAuthStorageHandler(storage) : null
    this.onAuthRefresh = onAuthRefresh
    this.saleorApiUrl = saleorApiUrl
  }

  cleanup = () => {
    this.storageHandler?.cleanup()
  }

  private readonly runAuthorizedRequest: Fetch = async (input, init) => {
    // technically we run this only when token is there
    // but just to make typescript happy
    if (!this.accessToken) {
      return await fetch(input, init)
    }

    const headers = init?.headers ?? {}

    return await fetch(input, {
      ...init,
      headers: { ...headers, Authorization: `Bearer ${this.accessToken}` },
    })
  }

  private readonly handleRequestWithTokenRefresh: Fetch = async (
    input,
    init
  ) => {
    const refreshToken = this.storageHandler?.getRefreshToken()

    invariant(refreshToken, 'Missing refresh token in token refresh handler')

    // the refresh already finished, proceed as normal
    if (this.accessToken) {
      return await this.fetchWithAuth(input, init)
    }

    this.onAuthRefresh?.(true)

    // if the promise is already there, use it
    if (this.tokenRefreshPromise) {
      const response = await this.tokenRefreshPromise

      const res: TokenRefreshResponse = await response.clone().json()

      const {
        data: {
          tokenRefresh: { errors, token },
        },
      } = res

      this.onAuthRefresh?.(false)

      if (errors.length || !token) {
        this.storageHandler?.setAuthState('signedOut')
        return await fetch(input, init)
      }

      this.storageHandler?.setAuthState('signedIn')
      this.accessToken = token
      this.tokenRefreshPromise = null
      return await this.runAuthorizedRequest(input, init)
    }

    // this is the first failed request, initialize refresh
    this.tokenRefreshPromise = fetch(
      this.saleorApiUrl,
      getRequestData(TOKEN_REFRESH, { refreshToken })
    )
    return await this.fetchWithAuth(input, init)
  }

  private readonly handleSignIn = async <
    TOperation extends TokenCreateResponse | PasswordResetResponse
  >(
    response: Response
  ): Promise<TOperation> => {
    const readResponse: TOperation = await response.json()

    const responseData =
      'tokenCreate' in readResponse.data
        ? readResponse.data.tokenCreate
        : readResponse.data.setPassword

    if (!responseData) {
      return readResponse
    }

    const { errors, token, refreshToken } = responseData

    if (!token || errors.length) {
      this.storageHandler?.setAuthState('signedOut')
      return readResponse
    }

    if (token) {
      this.accessToken = token
    }

    if (refreshToken) {
      this.storageHandler?.setRefreshToken(refreshToken)
    }

    this.storageHandler?.setAuthState('signedIn')
    return readResponse
  }

  fetchWithAuth: Fetch = async (input, init) => {
    const refreshToken = this.storageHandler?.getRefreshToken()

    // access token is fine, add it to the request and proceed
    if (this.accessToken && !isExpiredToken(this.accessToken)) {
      return await this.runAuthorizedRequest(input, init)
    }

    // refresh token exists, try to authenticate if possible
    if (refreshToken) {
      return await this.handleRequestWithTokenRefresh(input, init)
    }

    // any regular mutation, no previous sign in, proceed
    return await fetch(input, init)
  }

  resetPassword = async (variables: PasswordResetVariables) => {
    const response = await fetch(
      this.saleorApiUrl,
      getRequestData(PASSWORD_RESET, variables)
    )

    return await this.handleSignIn<PasswordResetResponse>(response)
  }

  signIn = async (variables: TokenCreateVariables) => {
    const response = await fetch(
      this.saleorApiUrl,
      getRequestData(TOKEN_CREATE, variables)
    )
    return await this.handleSignIn<TokenCreateResponse>(response)
  }

  signOut = () => {
    this.accessToken = null
    this.storageHandler?.clearAuthStorage()
  }

  checkoutSignOut = async (
    variables: CustomerDetachVariables
  ): Promise<void> => {
    try {
      if (variables.id) {
        // customer detach needs auth so run it and then remove all the tokens
        await this.runAuthorizedRequest(
          this.saleorApiUrl,
          getRequestData(CHECKOUT_CUSTOMER_DETACH, variables)
        )
      }
      await this.runAuthorizedRequest(
        this.saleorApiUrl,
        getRequestData(TOKEN_DESACTIVATE_ALL, {})
      )
      this.signOut()
    } catch (err) {
      console.log(err)
    }
  }
}
