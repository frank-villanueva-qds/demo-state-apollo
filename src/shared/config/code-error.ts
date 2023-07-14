import { type AccountErrorCode } from '@/saleor/api'

export const DEFAULT_MESSAGE_ERROR = 'Ocurrio un error inesperado'

export const CODE_ERROR_MAP: { [key in AccountErrorCode]?: string } = {
  GRAPHQL_ERROR: 'Ocurrió un error inesperado',
  INACTIVE: 'Cuenta de usuario inactiva',
  INVALID: 'Datos inválidos',
  INVALID_PASSWORD: 'Contraseña Inválida',
  INVALID_CREDENTIALS: 'Correo o Contraseña inválidas',
  NOT_FOUND: '*El correo ingresado no coincide con datos del registro.',
  PASSWORD_ENTIRELY_NUMERIC: 'Contraseña Invalida',
  PASSWORD_TOO_COMMON: 'Contraseña demasiado común',
  PASSWORD_TOO_SHORT: 'Contraseña demasiado corta',
  PASSWORD_TOO_SIMILAR: 'Contraseña demasiado similar',
  PASSWORD_TOO_WEAK: 'Contraseña demasiado débil',
  REQUIRED: 'Completar datos',
  UNIQUE: '*Ya existe un usuario con este correo',
  ACCOUNT_NOT_CONFIRMED: 'Cuenta pendiente de Activación',
  INVALID_DOCUMENT_NUMBER: 'Número de documento Inválido',
}

export type ErrorCode = keyof typeof CODE_ERROR_MAP
