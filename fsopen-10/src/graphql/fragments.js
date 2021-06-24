import { gql } from "@apollo/react-hooks";

export const REGULAR_REPOSITORY_FRAGMENT = gql`
  fragment RegularRepository on Repository {
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
  }
`;

export const AUTH_USER_FRAGMENT = gql`
  fragment AuthorizedUser on User {
    id
    username
  }
`;

export const REVIEW_FRAGMENT = gql`
  fragment RegularReview on Review {
    id
    text
    rating
    createdAt
    user {
      id
      username
    }
  }
`;
