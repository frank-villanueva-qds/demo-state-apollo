import '@/styles/globals.css'
import {
  SaleorAuthProvider,
  useAuthChange,
  useAuthenticatedApolloClient,
  useSaleorAuthClient,
} from '@/lib/saleor/auth'
import { type AppPropsWithLayout } from '@/shared/models/Next'
import { ApolloProvider } from '@apollo/client'
import { type ReactElement } from 'react'
import Head from 'next/head'

export default function MyApp({
  Component,
  pageProps,
}: AppPropsWithLayout<any>): JSX.Element {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page)
  const useSaleorAuthClientProps = useSaleorAuthClient({
    saleorApiUrl: process.env.NEXT_PUBLIC_SALEOR_API_URL ?? '',
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  })

  const { saleorAuthClient } = useSaleorAuthClientProps

  const { apolloClient, resetClient } = useAuthenticatedApolloClient(
    saleorAuthClient.fetchWithAuth,
  )

  useAuthChange({
    onSignedOut: () => {
      void resetClient()
    },
    onSignedIn: () => {
      void apolloClient.refetchQueries({
        include: ['User'],
      })
    },
  })

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1, user-scalable=no, shrink-to-fit=no"
        />
        <meta name="description" content="Wellipharma Farmacia online" />
      </Head>
      <SaleorAuthProvider
        key="SaleorAuthProvider"
        {...useSaleorAuthClientProps}
      >
        <ApolloProvider key="ApolloProvider" client={apolloClient}>
          {getLayout(<Component key="Component" {...pageProps} />)}
        </ApolloProvider>
      </SaleorAuthProvider>
    </>
  )
}
