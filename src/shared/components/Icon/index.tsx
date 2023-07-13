import { type SVGProps } from 'react'

export enum IconIds {
  phoneCall = 'phone-call',
  minus = 'minus',
  closeCircle = 'close-circle',
  logoColumn = 'logo-column',
  location = 'location',
  user = 'user',
  cart = 'cart',
  logoHeader = 'logo-header',
  arrowDown = 'arrow-down',
  arrowLeft = 'arrow-left',
  arrowRight = 'arrow-right',
  eyeClose = 'eye-close',
  check = 'check',
  search = 'search',
  warning = 'warning',
  plus = 'plus',
  dobleArrow = 'doble-arrow',
  filter = 'filter',
  trash = 'trash',
  iconCheck = 'icon-check',
  iconEdit = 'icon-edit',
  mapLocation = 'map-location',
  document = 'document',
}

interface IconProps extends SVGProps<SVGSVGElement> {
  id: IconIds
  size?: number
}

export const Icon: React.FC<IconProps> = ({
  id,
  size,
  width,
  height,
  fill = 'none',
  strokeWidth = 1.5,
  ...rest
}) => {
  return (
    <svg {...rest} width={width ?? size} fill={fill} height={height ?? size}>
      <use href={`/sprite.svg#${id}`} strokeWidth={strokeWidth} />
    </svg>
  )
}
