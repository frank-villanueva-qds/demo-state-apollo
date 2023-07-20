import {
  type CartProducts,
  AddProductToCartMutation,
  type CartProductsVariables,
  UpdateCartProductMutation,
} from '../models/CartProducts'

import { useMutation } from '@apollo/client'

type HandleAddAction = (params: {
  idProduct: string
  idProductVariant: string
  quantity: number
}) => void

type HandleUpdateAction = (params: {
  idProduct: string
  idProductVariant: string
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

  const handleAddAction: HandleAddAction = ({
    idProduct,
    idProductVariant,
    quantity,
  }) => {
    console.log(
      '🚀 ~ file: useCheckoutService.ts:41 ~ useCheckoutService ~ idProductVariant:',
      idProductVariant
    )
    void addProductToCartMutation({
      variables: {
        id: idProduct,
        idVariant: idProductVariant,
        quantity,
      },
    })
  }

  const handleUpdateAction: HandleUpdateAction = ({
    idProduct,
    idProductVariant,
    quantity,
  }) => {
    void updateCartProductMutation({
      variables: {
        id: idProduct,
        idVariant: idProductVariant,
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
