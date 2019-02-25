const { gql } = require('apollo-server-express')

module.exports = gql`
  
  type User {
    id: ID!
    fullname: String
    email: String!
    password: String!
  }

  type Team {
    id: ID!
    organization_id: ID!
    team_name: String!
  }

  type Match {
    id: ID!
    team_id: ID!
    goals_for: Int!
    goals_against: Int!
  }

  input NewUserInput {
    fullname: String
    email: String!
    password: String!
  }

  input NewMatchInput {
    id: ID!
    team_id: ID!
    goals_for: Int!
    goals_against: Int!
  }

  type Query {
    user: String!
  }

  type Mutation {
    signup(input: NewUserInput!): User!
    createTeam(input: ID!): Team!
    createMatch(input: NewMatchInput): Match!
  } 
`