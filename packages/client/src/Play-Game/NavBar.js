import React from 'react'

import LogoutButton from '../LogoutButton'
import gravatar from 'gravatar'

import { makeStyles } from '@material-ui/styles'
import { unstable_Box as Box } from '@material-ui/core/Box'
import { Typography, Button } from '@material-ui/core'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const useStyles = makeStyles({
  navBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 10,
    // height: '10vh'
    // height: 50
  },
  navBarTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  imgAvatar: {
    borderRadius: '50%',
    height: 50,
    width: 50,
  },
  backBtn: {
    width: 100,
  },
})

const NavBar = () => {
  const classes = useStyles()
  return (
    <Query
      query={gql`
        query {
          viewer {
            email
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
        return (
          <Box className={classes.navBar}>
            <Button className={classes.backBtn} color="primary" variant="contained">
              <i className="fas fa-chevron-circle-left" />
              Back
            </Button>
            <img
              className={classes.imgAvatar}
              src={gravatar.url(data.viewer.email, { s: '75', r: 'x', d: 'retro' }, false)}
            />{' '}
            <LogoutButton />
          </Box>
        )
      }}
    </Query>
  )
}

export default NavBar
