import {
  useCheckoutByTokenQuery,
  type CheckoutDetailsFragment,
} from '@/saleor/api'

import { type ApolloError } from '@apollo/client'
import { useEffect, type ReactNode } from 'react'
import createSafeContext from '@/shared/hooks/useSafeContext'
import { DEFAULT_LOCALE } from '@/shared/config/language-code'
import { useLocalStorage } from '@/shared/hooks/useLocalStorage'
import { CHECKOUT_TOKEN } from '@/shared/config/constants'

export interface CheckoutConsumerProps {
  checkoutToken: string
  setCheckoutToken: (token: string) => void
  resetCheckoutToken: () => void
  checkout: CheckoutDetailsFragment | undefined | null
  checkoutError: ApolloError | undefined
  loading: boolean
  refetch: () => Promise<any>
}

export const [useCheckout, Provider] =
  createSafeContext<CheckoutConsumerProps>()

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [checkoutToken, setCheckoutToken] = useLocalStorage(
    CHECKOUT_TOKEN,
    '',
    { sync: true }
  )

  const {
    data,
    loading,
    error: checkoutError,
    refetch,
  } = useCheckoutByTokenQuery({
    variables: { id: checkoutToken, locale: DEFAULT_LOCALE },
    skip: !checkoutToken || typeof window === 'undefined',
    ssr: true,
  })

  useEffect(() => {
    ///
  }, [data?.checkout])

  const resetCheckoutToken = () => {
    setCheckoutToken('')
  }

  const providerValues: CheckoutConsumerProps = {
    checkoutToken,
    setCheckoutToken,
    resetCheckoutToken,
    checkout: data?.checkout,
    loading,
    checkoutError,
    refetch,
  }

  return <Provider value={providerValues}>{children}</Provider>
}
