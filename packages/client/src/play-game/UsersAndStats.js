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

const UsersAndStats = () => (
  <Query
    query={gql`
    query{
      organization(id: 1){
        users{
          fullname
          stats{
            matches_played
            goals_for
            goals_against
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
      return data.organization.users.map(user => {
        return (
          <ListItem button style={{ height: '75px' }}>
            {/* {console.log(data)} */}
            <ListItemIcon>Avatar</ListItemIcon>
            <ListItemText primary={user.fullname.length>13 ? user.fullname.slice(0,13) + '...' : user.fullname} />
            <ListItemSecondaryAction>
              G.P.: {user.stats.matches_played} <br/>
              G.F.: {user.stats.goals_for} <br/>
              G.A.: {user.stats.goals_against} <br/>
            </ListItemSecondaryAction>
          </ListItem>
        )
      })
    }}
  </Query>
)

export default UsersAndStats


