import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { Button } from '@material-ui/core/'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  logoutBtn: {
    width: 100,
  },
})

const LogoutMutation = gql`
  mutation logoutmutation {
    logout
  }
`

const LogoutButton = () => {
  const classes = useStyles()
  return (
    <Mutation mutation={LogoutMutation}>
      {(logout, { client, loading, error, data }) => {
        if (loading) return <p>Loading...</p>
        if (error) {
          console.log(error)
          return <p>There was an error</p>
        }
        return (
          <Button
            color="primary"
            variant="contained"
            className={classes.logoutBtn}
            onClick={() => {
              client.resetStore()
              logout()
            }}
          >
            Logout
          </Button>
        )
      }}
    </Mutation>
  )
}

export default LogoutButton
