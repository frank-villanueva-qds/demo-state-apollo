import { Icon, IconIds } from '@/shared/components/Icon'
import { useEffect, useState } from 'react'

import styles from './ControlProduct.module.css'

// import useAddProductService from '@/checkout/services/useAddProductService'
// import { useCheckout } from '@/lib/providers/CheckoutProvider'

// import useDecreaseProductService from '@/checkout/services/useDecreaseProductService'
// import useDeleteProductService from '@/checkout/services/useDeleteProductService'

interface IControlProductProps {
  idProduct?: string
  quantityAvailable: number
  type?: 'default' | 'cart' | 'productDetail'
}

const ControlProduct: React.FC<IControlProductProps> = ({
  idProduct,
  quantityAvailable,
  type = 'default',
}) => {
  // const { checkout } = useCheckout()
  // const { addProductService, isLoadingAdd } = useAddProductService()
  // const { decreaseProductService, isLoadingDecrease } =
  // useDecreaseProductService()
  // const { deleteProductService } = useDeleteProductService()
  const [showControls, setShowControls] = useState<boolean>(false)
  // const products = checkout?.lines ?? []
  const products: any[] = []
  const product = products.find((p) => p.variant.id === idProduct)
  const productQuantity = product?.quantity ?? 0

  useEffect(() => {
    if (productQuantity > 0) {
      setShowControls(true)
    } else {
      setShowControls(false)
    }
  }, [productQuantity])

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
    // await addProductService(idProduct, 1)
  }

  const handleClickDecrease = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
    // await decreaseProductService(idProduct, productQuantity)
  }

  const handleClickDelete = async (
    event: React.MouseEvent<HTMLButtonElement>,
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
              <Icon id={IconIds.minus} size={16} />
            </button>
            <span className={styles.label}>{productQuantity}</span>
            <button
              className={`${styles.circleButton}`}
              onClick={(event) => {
                void handleClickAdd(event)
              }}
            >
              <Icon id={IconIds.plus} size={14} />
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
