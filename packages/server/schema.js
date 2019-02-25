const { gql } = require('apollo-server-express')

module.exports = gql`
  type Query {
    user: String!
  }

  type User {
    id: ID!
    fullname: String!
    email: String!
    password: String!
  }

  input NewUserInput {
    fullname: String!
    email: String!
    password: String!
  }

  type LoginResponse {
    csrfToken: String!
    user: User!
  }

  type Mutation {
    signup(input: NewUserInput!): LoginResponse!
    login(input: LoginInput!): LoginResponse!
  }
`