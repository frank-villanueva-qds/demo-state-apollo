export type Fetch = typeof fetch

export interface TokenCreateVariables {
  email: string
  password: string
  recaptchaToken: string
}

export interface TokenCreateResponse {
  data: {
    tokenCreate: {
      user: {
        id: string
      }
      token: string | undefined
      refreshToken: string | undefined
      errors: any[]
    }
  }
}

export interface TokenRefreshVariables {
  refreshToken: string
}

export interface TokenRefreshResponse {
  data: {
    tokenRefresh: {
      token: string | undefined
      errors: any[]
    }
  }
}

export interface PasswordResetVariables {
  email: string
  password: string
  token: string
}

export interface PasswordResetResponse {
  data: {
    setPassword: {
      token: string | undefined
      refreshToken: string | undefined
      errors: any[]
    }
  }
}

export interface CustomerDetachVariables {
  id?: string
}

export interface CustomerDetachResponse {
  data: {
    errors: any[]
  }
}
