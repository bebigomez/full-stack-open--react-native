import { gql } from '@apollo/client'

export const AUTHENTICATE = gql`
  mutation Authenticate($input: AuthenticateInput) {
    authenticate(credentials: $input) {
      accessToken
    }
  }
`
