import { gql } from "@apollo/react-hooks";

import { REGULAR_REPOSITORY_FRAGMENT, REVIEW_FRAGMENT } from "./fragments";

export const REPOSITORIES_QUERY = gql`
  query Repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $after: String
    $first: Int
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      after: $after
      first: $first
    ) {
      edges {
        node {
          ...RegularRepository
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

  ${REGULAR_REPOSITORY_FRAGMENT}
`;

export const AUTHORIZED_USER_QUERY = gql`
  query AuthorizedUser(
    $first: Int
    $after: String
    $includeReviews: Boolean = false
  ) {
    authorizedUser {
      id
      username
      reviews(first: $first, after: $after) @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            repository {
              id
              fullName
            }
          }
          cursor
        }
        pageInfo {
          hasNextPage
          totalCount
          startCursor
          endCursor
        }
      }
    }
  }
`;

export const REPOSITORY_QUERY = gql`
  query Repository($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      ...RegularRepository
      reviews(first: $first, after: $after) {
        edges {
          node {
            ...RegularReview
          }
          cursor
        }
        pageInfo {
          hasNextPage
          totalCount
          startCursor
          endCursor
        }
      }
    }
  }

  ${REGULAR_REPOSITORY_FRAGMENT}

  ${REVIEW_FRAGMENT}
`;
