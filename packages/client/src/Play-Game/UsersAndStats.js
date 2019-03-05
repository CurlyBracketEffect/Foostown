import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import {
  Typography,
  List,
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Button,
} from '@material-ui/core/'

import gravatar from 'gravatar'

const UsersAndStats = () => (
  <Query
    query={gql`
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
    `}
    pollInterval={500}
  >
    {({ loading, error, data }) => {
      if (loading) return <div>Loading...</div>
      if (error) {
        throw error
      }
      return data.organization.users.map(user => {
        return (
          <ListItem key={user.id} button style={{ height: '75px' }}>
            {/* {console.log(data)} */}
            <ListItemIcon>
              <img src={gravatar.url(user.email, { s: '75', r: 'x', d: 'retro' }, false)} />{' '}
            </ListItemIcon>
            <ListItemText
              primary={
                user.fullname.length > 13 ? user.fullname.slice(0, 13) + '...' : user.fullname
              }
            />
            <ListItemSecondaryAction>
              G.P.: {user.stats.matches_played} <br />
              G.F.: {user.stats.goals_for} <br />
              G.A.: {user.stats.goals_against} <br />
            </ListItemSecondaryAction>
          </ListItem>
        )
      })
    }}
  </Query>
)

export default UsersAndStats
