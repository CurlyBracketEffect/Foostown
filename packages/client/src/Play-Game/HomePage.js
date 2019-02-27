import React from 'react'

//router
import { Link } from 'react-router-dom'

import UsersAndStats from './UsersAndStats'

//apollo
// import { Query } from 'react-apollo'
// import gql from 'graphql-tag'

//material-ui
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

const HomePage = ({ setCSRFToken, history }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: '300px',
    }}
  >
    <Typography style={{ marginTop: 25, marginBottom: 25 }} variant="overline">
      Home
    </Typography>
    <Link style={{ marginBottom: 25, textDecoration: 'none' }} to="/">
      <Button
        style={{
          width: '50%',
        }}
        color="primary"
        variant="contained"
        onClick={() => {
          localStorage.clear()
          setCSRFToken(null)
          history.push('/')
        }}
      >
        Logout
      </Button>
    </Link>
    <ListSubheader
      style={{
        borderBottom: '1px solid #00aa25',
        overflow: 'hidden',
      }}
      component="div"
    >
      Players
    </ListSubheader>
    <List style={{ height: '175px', overflowY: 'scroll' }}>
      {/* <Divider style={{ background: '#00aa25', height: "0.5px" }}/> */}

      <UsersAndStats />
    </List>

    <ListSubheader
      style={{
        borderBottom: '1px solid #00aa25',
        overflow: 'hidden',
      }}
      component="div"
    >
      Games
    </ListSubheader>
    <List style={{ height: '175px', overflowY: 'scroll' }}>
      <ListItem button>
        <ListItemIcon>Icon</ListItemIcon>
        <ListItemText primary="Game 1" />
        <ListItemSecondaryAction>Scores</ListItemSecondaryAction>
      </ListItem>
      <ListItem button>
        <ListItemIcon>Icon</ListItemIcon>
        <ListItemText primary="Game 2" />
        <ListItemSecondaryAction>Scores</ListItemSecondaryAction>
      </ListItem>
      <ListItem button>
        <ListItemIcon>Icon</ListItemIcon>
        <ListItemText primary="Game 3" />
        <ListItemSecondaryAction>Scores</ListItemSecondaryAction>
      </ListItem>
      <ListItem button>
        <ListItemIcon>Icon</ListItemIcon>
        <ListItemText primary="Game 4" />
        <ListItemSecondaryAction>Scores</ListItemSecondaryAction>
      </ListItem>
      <ListItem button>
        <ListItemIcon>Icon</ListItemIcon>
        <ListItemText primary="Game 5" />
        <ListItemSecondaryAction>Scores</ListItemSecondaryAction>
      </ListItem>
      <ListItem button>
        <ListItemIcon>Icon</ListItemIcon>
        <ListItemText primary="Game 6" />
        <ListItemSecondaryAction>Scores</ListItemSecondaryAction>
      </ListItem>
      <ListItem button>
        <ListItemIcon>Icon</ListItemIcon>
        <ListItemText primary="Game 7" />
        <ListItemSecondaryAction>Scores</ListItemSecondaryAction>
      </ListItem>
    </List>

    <Link style={{ marginTop: 25, textDecoration: 'none' }} to="/create-game">
      <Button
        variant="contained"
        color="secondary"
        style={{
          width: '75%',
        }}
      >
        Create Game
      </Button>
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
)

export default HomePage
