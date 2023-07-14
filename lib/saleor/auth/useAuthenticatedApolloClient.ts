import {
  ApolloClient,
  InMemoryCache,
  type NormalizedCacheObject,
  createHttpLink,
} from '@apollo/client'
import { type Fetch } from '@/lib/saleor/auth/types'
import { typePolicies } from './typePolicies'
import { useEffect, useState } from 'react'
import { persistCache } from 'apollo3-cache-persist'

export const useAuthenticatedApolloClient = (
  fetchWithAuth: Fetch,
  storage: Storage | undefined
) => {
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>()

  useEffect(() => {
    if (!storage) return
    const cache = new InMemoryCache({ typePolicies })

    const createApolloClient = (fetchWithAuth: Fetch) => {
      const httpLink = createHttpLink({
        uri: process.env.NEXT_PUBLIC_SALEOR_API_URL,
        fetch: fetchWithAuth,
      })

      const client = new ApolloClient({
        link: httpLink,
        cache,
        ssrMode: false,
      })

      return client
    }

    const init = async () => {
      console.log('Initializing cache persistence...')
      await persistCache({
        cache,
        storage,
      })
      console.log('Cache persistence initialized.')
    }

    const initializeClient = async () => {
      await init()
      console.log('Initializing client...')
      const client = createApolloClient(fetchWithAuth)
      setClient(client)
      console.log('client initialized.')
    }

    void initializeClient()
  }, [fetchWithAuth, storage])

  return {
    apolloClient: client,
    resetClient: async () => await client?.resetStore(),
  }
}
