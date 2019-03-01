import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import {
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core/'

const TeamsInTournament = () => (
  <Query
    query={gql`
      query {
        organization(id:1) {
          tournaments {
            teams {
              id
              team_name
            }
          }
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <div>Loading...</div>
      if (error) {
        throw error
      }
      return data.organization.tournments.teams.map(team => {
        return (
          <ListItem key={team.id} button style={{ height: '75px' }}>
            {console.log(data)}
            <ListItemIcon>Avatar</ListItemIcon>
            <ListItemText
              primary={team.team_name}
            />
          </ListItem>
        )
      })
    }}
  </Query>
)

export default TeamsInTournament