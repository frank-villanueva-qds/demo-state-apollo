import {
  type CheckoutDetailsFragment,
  useCheckoutByTokenQuery,
} from '@/saleor/api'

import { type ApolloError } from '@apollo/client'
import { type ReactNode } from 'react'
import createSafeContext from '@/src/shared/hooks/useSafeContext'
import { DEFAULT_LOCALE } from '@/src/shared/config/language-code'
import { useLocalStorage } from '@/src/shared/hooks/useLocalStorage'
import { CHECKOUT_TOKEN } from '@/src/shared/config/constants'

export interface CheckoutConsumerProps {
  checkoutToken: string
  setCheckoutToken: (token: string) => void
  resetCheckoutToken: () => void
  checkout: CheckoutDetailsFragment | undefined | null
  checkoutError: ApolloError | undefined
  loading: boolean
  // Mejorar después los tipos de refetchs
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
  })

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
