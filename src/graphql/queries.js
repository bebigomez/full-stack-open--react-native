import { gql } from '@apollo/client'

export const GET_REPOSITORIES = gql`
  query Repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      first: $first
      after: $after
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
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
`

export const GET_SINGLE_REPOSITORY = gql`
  query getSingleRepository($repositoryId: ID!, $first: Int, $after: String) {
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
      reviews(first: $first, after: $after) {
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
          cursor
        }
        pageInfo {
        endCursor
        startCursor
        hasNextPage
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
            repository {
              fullName
              id
            }
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
