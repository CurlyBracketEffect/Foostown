import gql from 'graphql-tag'

export const GET_MATCHES = gql`
  query {
    matchesPlayed {
      home_team
      away_team
      match_id
      home_team_id
      away_team_id
      home_goals
      away_goals
    }
  }
`
export const GET_VIEWER_TEAMS = gql`
  query {
    viewer {
      id
      fullname
      teams {
        id
        team_name
      }
    }
  }
`
export const GET_STATS = gql`
  query {
    organization(id: 1) {
      users {
        id
        fullname
        email
        stats {
          matches_played
          goals_for
          goals_against
        }
      }
    }
  }
`

export const GET_TOURNAMENTS = gql`
  query {
    organization(id: 1) {
      tournaments {
        id
        tournament_name
        status
      }
    }
  }
`

export const GET_TEAMS = gql`
  query {
    teams {
      id
      organization_id
      team_name
    }
  }
`
