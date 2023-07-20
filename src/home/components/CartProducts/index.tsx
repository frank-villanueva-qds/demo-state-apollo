import Drawer from 'react-modern-drawer'
import { type FC } from 'react'
import { gql, useApolloClient, useQuery } from '@apollo/client'
import {
  type CartProducts as CartProductsType,
  CartProductsQuery,
} from '@/home/models/CartProducts'

interface CartProductsProps {
  isOpen: boolean
  toggleDrawer: () => void
}

const GetProductByIdQuery = gql`
  query GetProductById($productId: ID!) {
    product(id: $productId) {
      id
      name
      slug
      thumbnail {
        url
      }
    }
  }
`

const CartProducts: FC<CartProductsProps> = ({ isOpen, toggleDrawer }) => {
  const client = useApolloClient()
  const { data: cartProductsData } =
    useQuery<CartProductsType>(CartProductsQuery)

  return (
    <Drawer
      open={isOpen}
      onClose={toggleDrawer}
      direction="right"
      size={400}
      className="!bg-gray-500"
      overlayOpacity={0.5}
    >
      <div className="p-4 flex flex-col gap-4">
        {cartProductsData?.cartProducts.map((item) => {
          const product = client.readQuery({
            query: GetProductByIdQuery,
            variables: { productId: item.id },
          })
          console.log(
            '🚀 ~ file: index.tsx:47 ~ {cartProductsData?.cartProducts.map ~ product:',
            product
          )
          return (
            <div
              key={item.id}
              className="flex gap-6 border border-green-500 rounded-xl p-4"
            >
              <h1>{item.id}</h1>
              <h1>{item.quantity}</h1>
            </div>
          )
        })}
      </div>
    </Drawer>
  )
}

export default CartProducts
