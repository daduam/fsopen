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
  }
`;

export const AUTH_USER_FRAGMENT = gql`
  fragment AuthorizedUser on User {
    id
    username
  }
`;
