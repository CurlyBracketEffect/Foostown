import React from 'react'

//router
import { Link } from 'react-router-dom'

//components
import { LogoutButton, AvailableSpots, JoinTournament, TeamsInTournament } from 'components'

//material-ui
import { makeStyles } from '@material-ui/styles'
import { Typography, List, ListSubheader, Button } from '@material-ui/core/'

const useStyles = makeStyles({
  tournamentPage: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '300px',
  },
  tournamentTitle: {
    marginTop: 25,
    marginBottom: 25,
    fontSize: 16,
    color: '#00aa25',
    fontWeight: 'bold',
  },
  logoutBtn: {
    marginBottom: 25,
    textDecoration: 'none',
  },
  subHeader: {
    borderBottom: '1px solid #00aa25',
    overflow: 'hidden',
    fontWeight: 'bold',
  },
  tournamentPageList: {
    height: '175px',
    overflowY: 'scroll',
  },
  createBtn: {
    marginTop: 25,
    textDecoration: 'none',
  },
})

const TournamentPage = () => {
  const classes = useStyles()
  return (
    <div className={classes.tournamentPage}>
      <Typography className={classes.tournamentTitle} variant="overline">
        Tournaments
      </Typography>

      <LogoutButton />

      <Link style={{ marginBottom: 25, textDecoration: 'none', width: '50%' }} to="/">
        <Button
          style={{
            width: '100%',
          }}
          color="primary"
          variant="contained"
        >
          Back To Home
        </Button>
      </Link>

      {/* Available Spots Query */}
      <AvailableSpots />

      {/* Join Tournament Mutation */}
      <JoinTournament />

      <ListSubheader className={classes.subHeader} component="div">
        Already Joined
      </ListSubheader>

      {/* Teams Already Joined Query */}
      <List className={classes.tournamentPageList}>
        {/* Uncomment the code below when we have tournament data */}
        {/* <TeamsInTournament /> */}
      </List>
    </div>
  )
}

export default TournamentPage
