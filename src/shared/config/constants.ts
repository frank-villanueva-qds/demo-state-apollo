import { type UserDocumentTypeEnum } from '@/saleor/api'

export enum ProductOrderField {
  NAME = 'NAME',
  RANK = 'RANK',
  PRICE = 'PRICE',
  MINIMAL_PRICE = 'MINIMAL_PRICE',
  LAST_MODIFIED = 'LAST_MODIFIED',
  DATE = 'DATE',
  TYPE = 'TYPE',
  PUBLISHED = 'PUBLISHED',
  PUBLICATION_DATE = 'PUBLICATION_DATE',
  PUBLISHED_AT = 'PUBLISHED_AT',
  LAST_MODIFIED_AT = 'LAST_MODIFIED_AT',
  COLLECTION = 'COLLECTION',
  RATING = 'RATING',
  CREATED_AT = 'CREATED_AT',
  STOCK_AVAILABLE = 'STOCK_AVAILABLE',
}

export enum OrderDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum ADDRESS_TYPES {
  BILLING = 'BILLING',
  SHIPPING = 'SHIPPING',
}

export const CHECKOUT_TOKEN = 'checkoutToken'

export const CHECKOUT_PENDING_TO_MERGE = 'pendingToMerge'

export const ORDER_ID = 'orderID'

export const USER_DATA = 'userData'

export const PAGE_SIZE_PAGINATION = 16
export const PAGE_SIZE_PAGINATION_PROFILE_ORDERS = 100

export const DEFAULT_METADATA_CHECKOUT_ADDRESS_KEY = 'userAddressId'

export const DOCUMENT_TYPES: Array<{
  value: UserDocumentTypeEnum
  text: string
}> = [
  {
    text: 'DNI',
    value: 'DNI',
  },
  {
    text: 'Carnet de extranjería',
    value: 'CE',
  },
]

export const EMPTY_PRODUCTS_IMAGE =
  (process.env.NEXT_PUBLIC_CDE_HOST ?? '') + '/products/productosinfoto.jpg'

export enum MergeCheckoutResponse {
  SUCCESS = 'SUCCESS',
  NOT_CHECKOUT = 'NOT_CHECKOUT',
  NOT_INPUT_PENDING = 'NOT_INPUT_PENDING',
  NOT_SHIPPING_ADDRESS = 'NOT_SHIPPING_ADDRESS',
  NOT_SHIPPING_ADDRESS_USER = 'NOT_SHIPPING_ADDRESS_USER',
  ERROR = 'ERROR',
}

export enum ResponseService {
  SUCCESS = 'success',
  ERROR = 'error',
}

export enum EnvironmentUrl {
  PRODUCTION = 'https://www.welli.com.pe',
  DEVELOPMENT = 'https://www.wellipharma.com',
  LOCAL = 'http://localhost:3000',
}

export const CONTACT_US_NUMBER_LABEL = '(01) 626 - 8888 (Opc. 4)'
export const CONTACT_US_NUMBER_TO_CALL = '016268888'
export const CONTACT_EMAIL = 'atencioalcliente@welli.com.pe'
