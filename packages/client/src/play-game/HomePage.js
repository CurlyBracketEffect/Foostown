import React from 'react'

//router
import { Link } from 'react-router-dom'

//apollo
// import { Query } from 'react-apollo'
// import gql from 'graphql-tag'

//material-ui
import { 
  Typography, List, ListSubheader, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, Divider, Button
} from '@material-ui/core/'


const HomePage = () => (
  <div
    style={{
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center',
      width: '300px',
    }}
  >
    <Typography style={{ marginTop: 25 }} variant='overline'>Home</Typography>
    <Link style={{ marginTop: 25, marginBottom: 25 }} to='/'><button>Logout</button></Link>

    <List
      subheader={<ListSubheader component='div'>Players</ListSubheader>}
    >
      <ListItem button>
        <ListItemIcon>
          Avatar
        </ListItemIcon>
        <ListItemText primary='Player 1' />
        <ListItemSecondaryAction>
          Stats
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
      <ListItem button>
        <ListItemIcon>
          Avatar
        </ListItemIcon>
        <ListItemText primary='Player 2' />
        <ListItemSecondaryAction>
          Stats
        </ListItemSecondaryAction>
      </ListItem>
    </List>

    <List
      subheader={<ListSubheader component='div'>Games</ListSubheader>}
    >
      <ListItem button>
        <ListItemIcon>
          Icon
        </ListItemIcon>
        <ListItemText primary='Game 1' />
        <ListItemSecondaryAction>
          Scores
        </ListItemSecondaryAction>
      </ListItem>
      <Divider color="secondary"/>
      <ListItem button>
        <ListItemIcon>
          Icon
        </ListItemIcon>
        <ListItemText primary='Game 2' />
        <ListItemSecondaryAction>
          Scores
        </ListItemSecondaryAction>
      </ListItem>
    </List>

    <Link style={{ marginTop: 25, textDecoration: 'none' }} to='/create-game'>
      <Button
        variant='contained'
        style={{
          width: '75%',
        }}
        color='primary'
      >
        Create Game</Button>
    </Link>

    {/* users/players query
    <Query
      query={gql`
        {
          items(idToOmit:1) {
            id
            title
            description
            tags {
              id
              title
            }
            borrower {
              username
            }
          }              
        }   
      `}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>
        if (error) return <p>Error :(</p>

        // const players = data.items.map(({ title, description, borrower }) => (  

        // ))
      }}
    </Query>


    games query
    <Query
      query={gql`
        {
          items(idToOmit:1) {
            id
            title
            description
            tags {
              id
              title
            }
            borrower {
              username
            }
          }              
        }   
      `}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>
        if (error) return <p>Error :(</p>

        // const games = data.items.map(({ title, description, borrower }) => (  

        // ))
      }}
    </Query>
    */}

  </div>
);

export default HomePage;