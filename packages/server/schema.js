const { gql } = require('apollo-server-express')

module.exports = gql`
  type Query {
    user(id: ID!): User!
  }

  type User {
    id: ID!
    fullname: String!
    email: String
    password: String!
  }
`

