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
      user(id:1){
        fullname
      }
    }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <div>Loading...</div>
      if (error) {
        return <div>Error </div>
      }
      return (
        <ListItem button>
{        console.log(data)
}          <ListItemIcon>Avatar</ListItemIcon>
          <ListItemText primary="Player 1" />
          <ListItemSecondaryAction>Stats</ListItemSecondaryAction>
        </ListItem>
      )
    }}
  </Query>
)

export default UsersAndStats


// query{
//   user(id:1){
//     id
//     fullname
//     stats{
//       matches_played
//       goals_for
//       goals_against
//     }
//   }
// }