const { gql } = require('apollo-server-express')

module.exports = gql`
  
  type User {
    id: ID!
    fullname: String
    email: String!
    password: String!
    teams: [Team]!
  }

  type Team {
    id: ID!
    organization_id: ID!
    team_name: String!
    matches: [Match]!
  }

  type Match {
    match_id: ID!
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

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    user(id: ID!): User!
  }

  type LoginResponse {
    csrfToken: String!
    user: User!
  }

  type Mutation {
    signup(input: NewUserInput!): LoginResponse!
    login(input: LoginInput!): LoginResponse!
    createTeam(input: ID!): Team!
    createMatch(input: NewMatchInput): Match!
  }
`
