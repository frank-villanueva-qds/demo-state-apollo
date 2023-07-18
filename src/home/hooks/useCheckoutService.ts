import {
  type CartProducts,
  AddProductToCartMutation,
  type CartProductsVariables,
  UpdateCartProductMutation,
} from '../models/CartProducts'

import { useMutation } from '@apollo/client'

type HandleAddAction = (params: { idProduct: string; quantity: number }) => void

type HandleUpdateAction = (params: {
  idProduct: string
  quantity: number
}) => void

const useCheckoutService = () => {
  const [addProductToCartMutation] = useMutation<
    CartProducts,
    CartProductsVariables
  >(AddProductToCartMutation)
  const [updateCartProductMutation] = useMutation<
    CartProducts,
    CartProductsVariables
  >(UpdateCartProductMutation)

  const handleAddAction: HandleAddAction = ({ idProduct, quantity }) => {
    void addProductToCartMutation({
      variables: {
        id: idProduct,
        quantity,
      },
    })
  }

  const handleUpdateAction: HandleUpdateAction = ({ idProduct, quantity }) => {
    void updateCartProductMutation({
      variables: {
        id: idProduct,
        quantity,
      },
    })
  }

  return {
    handleAddAction,
    handleUpdateAction,
  }
}

export default useCheckoutService
