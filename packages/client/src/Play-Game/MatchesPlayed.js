import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core/'

const MatchesPlayed = () => (
  <Query
    query={gql`
      query {
        matchesPlayed{
          home_team
          away_team
          match_id
          home_team_id
          away_team_id
          home_goals
          away_goals
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <div>Loading...</div>
      if (error) {
        throw error
      }
      return data.matchesPlayed.map(match => {
        return (
          <ListItem key={match.match_id} button style={{ height: '75px' }}>
            {console.log(data)}
            <ListItemIcon>Avatar</ListItemIcon>
            <ListItemText
              primary={
                match.home_team.length > 13 ? match.home_team.slice(0, 13) + '...' : match.home_team
              }
              secondary={
                match.away_team.length > 13 ? match.away_team.slice(0, 13) + '...' : match.away_team
              }
            />
            <ListItemSecondaryAction>
              G.F.: {match.home_goals} <br />
              G.A.: {match.away_goals} <br />
            </ListItemSecondaryAction>
          </ListItem>
        )
      })
    }}
  </Query>
)

export default MatchesPlayed
