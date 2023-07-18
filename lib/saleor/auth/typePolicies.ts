// import { type TypedTypePolicies } from '@/saleor/api'
import { type CartProducts } from '@/home/models/CartProducts'
import { relayStylePagination } from '@apollo/client/utilities'

export const typePolicies = {
  User: {
    fields: {
      orders: relayStylePagination(),
    },
  },
  Query: {
    fields: {
      products: relayStylePagination(['filter', 'sortBy']),
      isDarkMode: {
        read(valueCache: boolean) {
          return valueCache
        },
      },
      cartProducts: {
        read(valueCache: CartProducts) {
          return valueCache || []
        },
      },
    },
  },
}

export default typePolicies
