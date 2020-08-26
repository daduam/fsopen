import { gql } from '@apollo/client'

export const FETCH_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`

export const FETCH_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
      id
    }
  }
`