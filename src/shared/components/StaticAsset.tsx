import ImageWithLoaderFactory from '@/shared/components/ImageWithLoaderFactory'
import { NonOptimizedImageLoader } from '@/shared/components/ImageLoaders'

const StaticImage = ImageWithLoaderFactory({
  loader: NonOptimizedImageLoader,
  unoptimized: true,
})

export { StaticImage }
