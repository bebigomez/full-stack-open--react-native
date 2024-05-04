import { gql } from '@apollo/client'

export const GET_REPOSITORIES = gql`
  query Repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          id
          ownerAvatarUrl
          fullName
          description
          language
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
        }
      }
    }
  }
`

export const GET_SINGLE_REPOSITORY = gql`
  query getSingleRepository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      ownerAvatarUrl
      fullName
      description
      language
      stargazersCount
      forksCount
      reviewCount
      ratingAverage
      url
      reviews {
        edges {
          node {
            id
            rating
            createdAt
            text
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`

export const ME = gql`
  query getCurrentUser($includeReviews: Boolean = true) {
    me {
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            rating
            createdAt
            text
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`
