import { gql } from '@apollo/client'

export const AUTHENTICATE = gql`
  mutation Authenticate($input: AuthenticateInput) {
    authenticate(credentials: $input) {
      accessToken
    }
  }
`

export const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput) {
    createReview(review: $review) {
      repositoryId
    }
  }
`

export const SIGN_UP = gql`
  mutation CreateUser($user: CreateUserInput) {
    createUser(user: $user) {
      username
    }
  }
`
