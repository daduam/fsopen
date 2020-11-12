import { gql } from "@apollo/react-hooks";
import {
  AUTH_USER_FRAGMENT,
  REGULAR_REPOSITORY_FRAGMENT,
  REVIEW_FRAGMENT,
} from "./fragments";

export const REPOSITORIES_QUERY = gql`
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
          ...RegularRepository
        }
      }
    }
  }

  ${REGULAR_REPOSITORY_FRAGMENT}
`;

export const AUTHORIZED_USER_QUERY = gql`
  {
    authorizedUser {
      ...AuthorizedUser
    }
  }

  ${AUTH_USER_FRAGMENT}
`;

export const REPOSITORY_QUERY = gql`
  query Repository($id: ID!) {
    repository(id: $id) {
      ...RegularRepository
      reviews {
        edges {
          node {
            ...RegularReview
          }
        }
      }
    }
  }

  ${REGULAR_REPOSITORY_FRAGMENT}

  ${REVIEW_FRAGMENT}
`;
