export enum LanguageCodeEnum {
  ES_PE = 'ES_PE',
}

export const DEFAULT_LOCALE =
  LanguageCodeEnum[
    process.env.NEXT_PUBLIC_DEFAULT_LOCALE as keyof typeof LanguageCodeEnum
  ]
