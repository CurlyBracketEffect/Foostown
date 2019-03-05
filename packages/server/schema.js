const { gql } = require('apollo-server-express')

const { DateTimeScalar } = require ('@okgrow/graphql-scalars')


module.exports = gql`
  scalar DateTime

  type User {
    id: ID!
    fullname: String
    email: String!
    password: String!
    teams: [Team]!
    stats: Stat!
  }

  type Stat {
    matches_played: Int!
    goals_for: Int!
    goals_against: Int!
  }

  type Organization {
    id: ID!
    name: String!
    owner_id: ID!
    is_active: Boolean!
    users: [User!]!
    tournaments: [Tournament]!
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

  type Tournament {
    id: ID!
    tournament_name: String!
    organization_id: ID!
    start_date: DateTime!
    end_date: DateTime
    status: String!
    teams: [Team]!
  }

  type MatchStat {
    home_team: String
    away_team: String
    match_id: ID
    home_team_id: ID
    away_team_id: ID
    home_goals: Int
    away_goals: Int
  }

  input NewUserInput {
    fullname: String
    email: String!
    password: String!
  }

  input NewMatchInput {
    team_id: ID!
    goals_for: Int!
    goals_against: Int!
    organization_id: ID!
  }

  input NewTeamInput {
    organization_id: ID!
    team_name: String!
  }

  input NewTournamentInput {
    tournament_name: String!
    number_of_players: Int!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input TournamentSignUpInput{
    team_id: ID!
  }

  type Query {
    teams: [Team]!
    user(id: ID!): User!
    viewer: User
    organization(id: ID!): Organization!
    matchesPlayed: [MatchStat]!
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
    logout: Boolean
    createTournament(input: NewTournamentInput): Tournament!
    closeTournament(id: ID!): Tournament!
    addTeamToTourney(input: TournamentSignUpInput): Boolean
  }
`
