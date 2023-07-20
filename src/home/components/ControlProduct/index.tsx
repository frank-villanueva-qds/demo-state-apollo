import {
  type CartProducts,
  CartProductsQuery,
} from '@/home/models/CartProducts'
import { Icon, IconIds } from '@/shared/components/Icon'
import { useEffect, useState } from 'react'

import styles from './ControlProduct.module.css'
// import { useCheckout } from '@/lib/providers/CheckoutProvider'
import useCheckoutService from '@/home/hooks/useCheckoutService'
import { useQuery } from '@apollo/client'

// import useAddProductService from '@/checkout/services/useAddProductService'

// import useDecreaseProductService from '@/checkout/services/useDecreaseProductService'
// import useDeleteProductService from '@/checkout/services/useDeleteProductService'

interface IControlProductProps {
  idProduct: string
  idProductVariant: string
  quantityAvailable: number
  type?: 'default' | 'cart' | 'productDetail'
}

const ControlProduct: React.FC<IControlProductProps> = ({
  idProduct,
  idProductVariant,
  quantityAvailable,
  type = 'default',
}) => {
  const { data: cartProductsData } = useQuery<CartProducts>(CartProductsQuery)
  const cartProducts = cartProductsData?.cartProducts ?? []
  // const { checkout } = useCheckout()
  const { handleAddAction, handleUpdateAction } = useCheckoutService()
  // const { addProductService, isLoadingAdd } = useAddProductService()
  // const { decreaseProductService, isLoadingDecrease } =
  // useDecreaseProductService()
  // const { deleteProductService } = useDeleteProductService()
  const [showControls, setShowControls] = useState<boolean>(false)
  // const products = checkout?.lines ?? []
  const product = cartProducts.find((p) => p.idVariant === idProductVariant)
  const productQuantity = product?.quantity ?? 0

  useEffect(() => {
    if (productQuantity > 0) {
      setShowControls(true)
    } else {
      setShowControls(false)
    }
  }, [productQuantity])

  // const disabledButtonAdd = quantityAvailable === productQuantity
  // const disabledButtonMinus = quantityAvailable === 0
  // const disabledButtonPlus = quantityAvailable === productQuantity

  // const disabledButtonAdd =
  // quantityAvailable === productQuantity || isLoadingAdd
  // const disabledButtonMinus = quantityAvailable === 0 || isLoadingDecrease
  // const disabledButtonPlus =
  // quantityAvailable === productQuantity || isLoadingAdd

  if (idProduct === undefined) {
    return null
  }

  const handleClickAdd = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    handleAddAction({ idProduct, idProductVariant, quantity: 1 })
    // await addProductService(idProduct, 1)
  }

  const handleClickIncrease = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
    handleUpdateAction({
      idProduct,
      idProductVariant,
      quantity: productQuantity + 1,
    })
    // await increaseProductService(idProduct, productQuantity)
  }

  const handleClickDecrease = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
    handleUpdateAction({
      idProduct,
      idProductVariant,
      quantity: productQuantity - 1,
    })
    // await decreaseProductService(idProduct, productQuantity)
  }

  const handleClickDelete = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
    // await deleteProductService(product?.id)
  }

  return (
    <div className={`${styles.controlsWrapper} ${styles[type]}`}>
      {!showControls ? (
        <button
          className={styles.button}
          onClick={(event) => {
            void handleClickAdd(event)
          }}
        >
          Agregar
          <Icon id={IconIds.cart} size={12} />
        </button>
      ) : (
        <>
          <div className={`${styles.button} ${styles.controlButton}`}>
            <button
              className={styles.circleButton}
              onClick={(event) => {
                void handleClickDecrease(event)
              }}
            >
              <Icon
                id={IconIds.minus}
                size={20}
                className="text-green-500 bg-black"
              />
            </button>
            <span className={styles.label}>{productQuantity}</span>
            <button
              className={`${styles.circleButton}`}
              onClick={(event) => {
                void handleClickIncrease(event)
              }}
            >
              <Icon
                id={IconIds.plus}
                size={20}
                className="text-green-500 bg-black"
              />
            </button>
          </div>
          {type === 'cart' && (
            <button
              className={styles.tranparentButton}
              onClick={(event) => {
                void handleClickDelete(event)
              }}
            >
              <Icon id={IconIds.trash} size={26} />
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default ControlProduct
