import gql from 'graphql-tag'
export interface CartProduct {
  id: string
  idVariant: string
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
  mutation addProductToCart($id: ID!, $idVariant: String, $quantity: Int!) {
    addProductToCart(id: $id, idVariant: $idVariant, quantity: $quantity)
      @client
  }
`

export const UpdateCartProductMutation = gql`
  mutation updateCartProduct($id: ID!, $idVariant: String, $quantity: Int!) {
    updateCartProduct(id: $id, idVariant: $idVariant, quantity: $quantity)
      @client
  }
`

export interface CartProductsVariables {
  id: string
  idVariant: string
  quantity: number
}
