import { gql } from "@apollo/react-hooks";

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
