import React, { useState } from 'react'

//router
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from 'react-router-dom'

//components
import UsersAndStats from './UsersAndStats'
import NavBar from './NavBar'
import MatchesPlayed from './MatchesPlayed'

//material-ui
import { makeStyles } from '@material-ui/styles'
import { unstable_Box as Box } from '@material-ui/core/Box'
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
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
    width: '100%',
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
    // overflow: 'hidden',
    fontWeight: 'bold'
  },
  homePageList: {
    height: '100%',
    overflowY: 'scroll'
  },
  createBtn: {
    marginTop: 25,
    textDecoration: 'none',
  },
  tabsContainer: {
    // width: 300,
    backgroundColor: '#e1e2e1'
  },
  iconTab: {

    // width: '33%'
  }
})

const HomePage = (props) => {
  const [value, setValue] = useState(0)
  const handleChange = (event, value) => {
    setValue(value)
  }
  const classes = useStyles();
  return (
    <div className={classes.homePage}>
      <NavBar user={''} />
      <Box className={classes.iconsContainer}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
          className={classes.tabsContainer}
        >
          
          <Tab className={classes.iconTab} label='PLAYERS' icon={<i class="fas fa-users" style={{ color: '#00aa25' }}></i>}/>
          <Tab className={classes.iconTab} label='GAMES' icon={<i class="fas fa-play-circle" style={{ color: '#00aa25' }}></i>}/>
          <Tab className={classes.iconTab} label='TOURNAMENTS' icon={<i class="fas fa-trophy" style={{ color: '#00aa25' }}></i>}/>
        </Tabs>
      </Box>
      

        {value === 0 && <List className={classes.homePageList}>
        <UsersAndStats />
      </List>}
        {value === 1 &&  <List className={classes.homePageList}>
        <MatchesPlayed/>
      </List>}
        {value === 2 && <List className={classes.homePageList}>
        <UsersAndStats />
        <br/>
        <Link className={classes.createBtn} to='/tournament'>
          <Button
            variant='contained'
            color='secondary'
          >
            Temp. Join Tourney Button
          </Button>
        </Link>
      </List>}

    </div>
  )
}

export default HomePage;