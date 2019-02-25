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

  input NewTeamInput {
    organization_id: ID!
    team_name: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    user: String!
  }

  type LoginResponse {
    csrfToken: String!
    user: User!
  }

  type Mutation {
    signup(input: NewUserInput!): LoginResponse!
    login(input: LoginInput!): LoginResponse!
    createTeam(input: NewTeamInput!): Team!
    createMatch(input: NewMatchInput): Match!
  }
`
