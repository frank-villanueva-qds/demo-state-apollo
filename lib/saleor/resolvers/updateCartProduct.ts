import {
  type CartProducts,
  CartProductsQuery,
  type CartProductsVariables,
} from '@/home/models/CartProducts'
import { type ApolloCache } from '@apollo/client'

type UpdateCartProductResolver = (
  _: any,
  { id, quantity }: CartProductsVariables,
  { cache }: { cache: ApolloCache<any> }
) => void

const updateCartProductResolver: UpdateCartProductResolver = (
  _,
  { id, idVariant, quantity },
  { cache }
) => {
  const data = cache.readQuery<CartProducts>({
    query: CartProductsQuery,
  }) ?? { cartProducts: [] }

  if (quantity === 0) {
    const newCartProducts = data.cartProducts.filter(
      (item) => item.idVariant !== idVariant
    )
    cache.writeQuery({
      query: CartProductsQuery,
      data: { cartProducts: newCartProducts },
    })
    return
  }

  const newCartProducts = data.cartProducts.map((item) => {
    if (item.idVariant === idVariant) {
      return {
        ...item,
        quantity,
      }
    }
    return item
  })

  cache.writeQuery({
    query: CartProductsQuery,
    data: { cartProducts: newCartProducts },
  })
}

export default updateCartProductResolver
