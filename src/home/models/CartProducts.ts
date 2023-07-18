import gql from 'graphql-tag'
export interface CartProduct {
  id: string
  quantity: number
}

export interface CartProducts {
  cartProducts: CartProduct[]
}

// eslint-disable-next-line
export const CartProductsQuery = gql`
  query getCartProducts {
    cartProducts @client
  }
`

export const AddProductToCartMutation = gql`
  mutation addProductToCart($id: ID!, $quantity: Int!) {
    addProductToCart(id: $id, quantity: $quantity) @client
  }
`

export const UpdateCartProductMutation = gql`
  mutation updateCartProduct($id: ID!, $quantity: Int!) {
    updateCartProduct(id: $id, quantity: $quantity) @client
  }
`

export interface CartProductsVariables {
  id: string
  quantity: number
}
