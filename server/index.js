require('dotenv').config()
const { ApolloServer, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')

mongoose.set('useFindAndModify', true)

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true  })
  .then(() => console.log('🗄️  connected to MongoDB'))
  .catch(error => console.error('error connecting to MongoDB', error.message))

const typeDefs = gql`
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(
      author: String
      genre: String
    ): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.estimatedDocumentCount(),
    authorCount: () => Author.estimatedDocumentCount(),
    allBooks: (parent, args) => {
      if (!args.author && !args.genre) {
        return books
      }
      else if (args.author && !args.genre) {
        return books.filter(b => b.author === args.author)
      }
      else if (args.genre && !args.author) {
        return books.filter(b => b.genres.includes(args.genre))
      }
      return books.filter(b => (
        b.author === args.author && b.genres.includes(args.genre)
      ))
    },
    allAuthors: () => Author.find({})
  },
  Author: {
    bookCount: (parent) => {
      let count = 0
      books.forEach(b => {
        if (b.author === parent.name) {
          count++
        }
      })
      return count
    }
  },
  Mutation: {
    addBook: (parent, args) => {
      const book = { ...args, id: uuidv1() }
      books = books.concat(book)
      if (!authors.find(a => a.name === args.author)) {
        authors = authors.concat({ name: args.author, id: uuidv1() })
      }
      return book
    },
    editAuthor: (parent, args) => {
      const author = authors.find(a => a.name === args.name)
      if (!author) {
        return null
      }
      const updatedAuthor = { ...author, born: args.setBornTo }
      authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
      return updatedAuthor
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
