import ControlProduct from '../ControlProduct'
import { type FC } from 'react'
import { type ProductFragment } from '@/saleor/api'
import { SaleorImage } from '@/shared/components/SaleorAsset'

interface ICardProductProps {
  product: ProductFragment
}

const CardProduct: FC<ICardProductProps> = ({ product }) => {
  return (
    <div className="flex flex-col gap-3 items-center border border-gray-200 rounded-md p-4 text-white">
      <SaleorImage
        src={product.thumbnail?.url ?? ''}
        alt={product.name}
        height={150}
        width={150}
        className="h-[150px] w-[150px] object-contain"
      />
      <h1 className="text-lg font-bold w-full text-left">{product.name}</h1>
      <p className="text-sm w-full text-left">{product.slug}</p>
      <ControlProduct
        idProduct={product.id}
        idProductVariant={product.defaultVariant?.id ?? ''}
        quantityAvailable={product.defaultVariant?.quantityAvailable ?? 0}
      />
    </div>
  )
}

export default CardProduct
