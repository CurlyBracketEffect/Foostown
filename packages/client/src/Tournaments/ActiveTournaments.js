import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core/'

//router
import { Link } from 'react-router-dom'

const ActiveTournaments = () => (
  <Query
    query={gql`
      query {
        organization(id:1) {
          tournaments {
            id
            tournament_name
            status
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
      console.log(data)
      return data.organization.tournaments.map(tournament => {
        return (
          <Link to='/tournament' style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem key={tournament.id} button style={{ height: '75px', listStyle: 'none' }}>
              <ListItemText
              style={{listStyle:'none'}}
                primary={
                  tournament.tournament_name.length > 24 ? tournament.tournament_name.slice(0, 24) + '...' : tournament.tournament_name
                }
              />
              <ListItemSecondaryAction
              style={{listStyle:'none'}}>
                Status:	&nbsp;
                <span style={{ color: 'green', textTransform: 'uppercase' }}>
                  {tournament.status}
                </span> &nbsp;
              </ListItemSecondaryAction>
            </ListItem>
          </Link>
        )
      })
    }}
  </Query>
)

export default ActiveTournaments