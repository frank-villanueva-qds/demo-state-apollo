import { isDarkModeVar } from './localStorage'
// import { type TypedTypePolicies } from '@/saleor/api'
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
        read() {
          return isDarkModeVar()
        },
      },
    },
  },
}

export default typePolicies
