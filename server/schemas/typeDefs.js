const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: BookInfo): User
    removeBook(bookId: String): User
  }

  input BookInfo {
    authors: Array
    Description: String
    Title: String
    BookId: String
    Image: String
    Link: Url
  }

  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    input: BookInfo
  }

  type Auth {
    token: String
    user: User
`;
