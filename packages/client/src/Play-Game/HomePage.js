import React from 'react'

//router
import { Link } from 'react-router-dom'

import UsersAndStats from './UsersAndStats'
import MatchesPlayed from './MatchesPlayed'

//material-ui
import { makeStyles } from '@material-ui/styles'
import {
  Typography,
  List,
  ListSubheader,
  Button
} from '@material-ui/core/'

const useStyles = makeStyles({
  homePage: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '300px',
  },
  homeTitle: {
    marginTop: 25,
    marginBottom: 25,
    fontSize: 16, 
    color: '#00aa25', 
    fontWeight: 'bold' 
  },
  logoutBtn: {
    marginBottom: 25,
    textDecoration: 'none',
  },
  subHeader: {
    borderBottom: '1px solid #00aa25',
    overflow: 'hidden',
    fontWeight: 'bold' 
  },
  homePageList: {
    height: '175px',
    overflowY: 'scroll',
  },
  createBtn: {
    marginTop: 25,
    textDecoration: 'none',
  }
})

const HomePage = ({
  setCSRFToken,
  history
}) => {
  const classes = useStyles();
  return (
    <div className={classes.homePage}>

      <Typography 
        className= {classes.homeTitle}
        variant='overline'>
          Home
      </Typography>
      <Link className={classes.logoutBtn} to='/'>
        <Button
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

       {/* Users And Stats Query */}
      <ListSubheader
        className={classes.subHeader}
        component='div'
      >
        Players
      </ListSubheader>
      <List className={classes.homePageList}>
        <UsersAndStats/>
      </List>
      <ListSubheader
        className={classes.subHeader}
        component='div'
      >
        Games
      </ListSubheader>

      {/* Games Query */}
      <List className={classes.homePageList}>
        <MatchesPlayed/>
      </List>

      <Link className={classes.createBtn} to='/create-game'>
        <Button
          variant='contained'
          color='secondary'
        >
          Create Game
        </Button>
      </Link>

    </div>
  )
}

export default HomePage;