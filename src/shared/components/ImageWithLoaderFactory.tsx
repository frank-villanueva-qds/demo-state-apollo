import NextImage, { type ImageLoader, type ImageProps } from 'next/image'

export interface IImageWithLoaderFactory {
  loader: ImageLoader
  unoptimized?: boolean
}

export default function ImageWithLoaderFactory({
  loader,
  unoptimized,
}: IImageWithLoaderFactory) {
  return function ImageWithLoader(props: ImageProps) {
    return <NextImage {...{ ...props, loader, unoptimized }} />
  }
}
