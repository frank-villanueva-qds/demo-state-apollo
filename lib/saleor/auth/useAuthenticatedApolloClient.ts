import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import fetch from 'cross-fetch';
import { Fetch } from '@/lib/saleor/auth/types'
import { typePolicies } from './typePolicies'
import { useMemo } from 'react'

// for static geenration of pages, we don't need auth there
export const serverApolloClient = new ApolloClient({
  link: createHttpLink({ uri: process.env.NEXT_PUBLIC_SALEOR_API_URL, fetch }),
  cache: new InMemoryCache({ typePolicies }),
  ssrMode: true,
})

export const useAuthenticatedApolloClient = (fetchWithAuth: Fetch) => {
  const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_SALEOR_API_URL,
    fetch: fetchWithAuth,
  })

  const apolloClient = useMemo(
    () =>
      new ApolloClient({
        link: httpLink,
        cache: new InMemoryCache({ typePolicies }),
        ssrMode:true
      }),
    []
  )

  return { apolloClient, resetClient: () => apolloClient.resetStore() }
}
