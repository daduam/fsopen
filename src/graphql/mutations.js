import { gql } from "@apollo/react-hooks";

import { AUTH_USER_FRAGMENT } from "./fragments";

export const AUTHORIZE_MUTATION = gql`
  mutation Authorize($username: String!, $password: String!) {
    authorize(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW_MUTATION = gql`
  mutation CreateReview($input: CreateReviewInput!) {
    createReview(review: $input) {
      repositoryId
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(user: $input) {
      ...AuthorizedUser
    }
  }

  ${AUTH_USER_FRAGMENT}
`;

export const DELETE_REVIEW_MUTATION = gql`
  mutation DeleteReview($id: ID!) {
    deleteReview(id: $id)
  }
`;
