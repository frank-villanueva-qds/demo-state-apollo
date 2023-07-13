import { type ImageLoader, type ImageLoaderProps } from 'next/image'

const NonOptimizedImageLoader: ImageLoader = ({ src }: ImageLoaderProps) => src

const SaleorLoader: ImageLoader = ({
  src,
  width,
  quality,
}: ImageLoaderProps) => {
  return `${src}?w=${width}&q=${quality ?? 75}`
}

export { NonOptimizedImageLoader, SaleorLoader }
