import CardProduct from '../CardProduct'
import { useGetProductsQuery } from '@/saleor/api'
import { useMemo } from 'react'

const ListProducts = () => {
  const { data, loading } = useGetProductsQuery({
    variables: {
      first: 4,
      channel: process.env.NEXT_PUBLIC_DEFAULT_CHANNEL,
    },
    fetchPolicy: 'cache-and-network',
  })

  const listProducts = useMemo(() => {
    return data?.products?.edges?.map((edge) => edge.node)
  }, [data])

  if (loading || !listProducts) return <div>Loading...</div>

  return (
    <div className="grid grid-cols-4 gap-2 p-4">
      {listProducts.map((product) => (
        <CardProduct key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ListProducts
