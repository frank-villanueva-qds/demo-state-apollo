import {
  type CartProducts,
  CartProductsQuery,
  type CartProductsVariables,
} from '@/home/models/CartProducts'
import { type ApolloCache } from '@apollo/client'

type AddProductToCartResolver = (
  _: any,
  { id, quantity }: CartProductsVariables,
  { cache }: { cache: ApolloCache<any> }
) => void

const addProductToCartResolver: AddProductToCartResolver = (
  _,
  { id, idVariant, quantity },
  { cache }
) => {
  console.log('🚀 ~ file: addProductToCart.ts:19 ~ idVariant:', idVariant)
  const data = cache.readQuery<CartProducts>({
    query: CartProductsQuery,
  }) ?? { cartProducts: [] }

  const newCartProducts = [
    ...data.cartProducts,
    {
      __typename: 'CartProduct',
      id,
      idVariant,
      quantity,
    },
  ]

  cache.writeQuery({
    query: CartProductsQuery,
    data: { cartProducts: newCartProducts },
  })
}

export default addProductToCartResolver
