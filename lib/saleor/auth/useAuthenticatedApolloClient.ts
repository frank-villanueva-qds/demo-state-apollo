import {
  ApolloClient,
  InMemoryCache,
  type NormalizedCacheObject,
  createHttpLink,
} from '@apollo/client'
import { type Fetch } from '@/lib/saleor/auth/types'
import { typePolicies } from './typePolicies'
import { useEffect, useState } from 'react'
import { CachePersistor, LocalStorageWrapper } from 'apollo3-cache-persist'
import addProductToCartResolver from '../resolvers/addProductToCart'
import updateCartProductResolver from '../resolvers/updateCartProduct'

export const useAuthenticatedApolloClient = (
  fetchWithAuth: Fetch,
  storage: Storage | undefined
) => {
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>()
  const [persistor, setPersistor] =
    useState<CachePersistor<NormalizedCacheObject>>()

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
        ssrMode: true,
      })

      return client
    }

    const init = async () => {
      const newPersistor = new CachePersistor({
        cache,
        storage: new LocalStorageWrapper(window.localStorage),
        key: 'apollo-cache-persist',
        debug: true,
      })
      await newPersistor.restore()
      setPersistor(newPersistor)
    }

    const initializeClient = async () => {
      await init()
      const client = createApolloClient(fetchWithAuth)
      setClient(client)
    }

    void initializeClient()
  }, [fetchWithAuth, storage])

  useEffect(() => {
    client?.addResolvers({
      Mutation: {
        addProductToCart: addProductToCartResolver,
        updateCartProduct: updateCartProductResolver,
      },
    })
  }, [client])

  return {
    apolloClient: client,
    resetClient: async () => await client?.resetStore(),
    persistor,
  }
}
