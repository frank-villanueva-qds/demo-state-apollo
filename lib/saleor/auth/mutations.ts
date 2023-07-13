import gql from 'graphql-tag'

export const accountErrorFragment = gql`
  fragment AccountErrorFragment on AccountError {
    code
    field
    message
  }
`

export const TOKEN_REFRESH = gql`
  ${accountErrorFragment}
  mutation refreshToken($refreshToken: String!) {
    tokenRefresh(refreshToken: $refreshToken) {
      token
      user {
        id
      }
      errors {
        ...AccountErrorFragment
      }
    }
  }
`

export const CHECKOUT_CUSTOMER_DETACH = gql`
  mutation checkoutCustomerDetach($id: ID!) {
    checkoutCustomerDetach(id: $id) {
      errors {
        message
        field
        code
      }
    }
  }
`

export const TOKEN_CREATE = gql`
  mutation tokenCreate(
    $email: String!
    $password: String!
    $recaptchaToken: String!
  ) {
    tokenCreate(
      email: $email
      password: $password
      recaptchaToken: $recaptchaToken
    ) {
      user {
        id
      }
      token
      refreshToken
      errors {
        message
        field
        code
      }
    }
  }
`

export const PASSWORD_RESET = gql`
  mutation passwordReset($email: String!, $password: String!, $token: String!) {
    setPassword(email: $email, password: $password, token: $token) {
      token
      refreshToken
      errors {
        message
        field
        code
      }
    }
  }
`

export const TOKEN_DESACTIVATE_ALL = gql`
  mutation TokensDeactivateAll {
    tokensDeactivateAll {
      errors {
        field
        message
        code
      }
    }
  }
`
