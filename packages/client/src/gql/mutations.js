import gql from 'graphql-tag'

export const LOG_IN = gql`
  mutation loginMutation($user: LoginInput!) {
    login(input: $user) {
      user {
        id
        fullname
        email
      }
      csrfToken
    }
  }
`
export const LOGOUT = gql`
  mutation logoutmutation {
    logout
  }
`

export const SIGN_UP = gql`
  mutation signupMutation($user: NewUserInput!) {
    signup(input: $user) {
      user {
        id
        fullname
        email
      }
      csrfToken
    }
  }
`
export const CREATE_MATCH = gql`
  mutation($createMatch: NewMatchInput!) {
    createMatch(input: $createMatch) {
      match_id
      team_id
      goals_for
      goals_against
    }
  }
`

export const CREATE_TOURNAMENT = gql`
  mutation($createTournament: NewTournamentInput!) {
    createTournament(input: $createTournament) {
      id
      tournament_name
    }
  }
`

export const JOIN_TOURNAMENT = gql`
  mutation($createMatch: NewMatchInput!) {
    createMatch(input: $createMatch) {
      match_id
      team_id
      goals_for
      goals_against
    }
  }
`
