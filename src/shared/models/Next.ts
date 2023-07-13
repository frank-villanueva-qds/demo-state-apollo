import { type NextPage } from 'next'
import { type AppProps } from 'next/app'
import { type ReactElement, type ReactNode } from 'react'

export type NextPageWithLayout<T = void> = NextPage<T> & {
  getLayout?: (page: ReactElement) => ReactNode
}

export type AppPropsWithLayout<T> = AppProps & {
  Component: NextPageWithLayout<T>
}

export type NextPageWithCheckoutLayout<T = void> = NextPage<T> & {
  getLayout?: (
    page: ReactElement,
    handleSubmit: () => void,
    isValid: boolean,
  ) => ReactNode
}
