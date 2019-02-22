const { gql } = require('apollo-server-express')

module.exports = gql`
  type Query {
    user(id: ID!): User!
  }
`

