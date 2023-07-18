import { gql } from '@apollo/client'

export const DarkModeQuery = gql`
  query getDarkMode {
    isDarkMode @client
  }
`

export interface DarkModeQueryType {
  isDarkMode: boolean
}

export const DarkModeMutation = gql`
  mutation toggleDarkMode {
    toggleDarkMode @client
  }
`
