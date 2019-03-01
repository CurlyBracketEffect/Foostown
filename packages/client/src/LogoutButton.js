import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { Button } from '@material-ui/core/'

const LogoutMutation = gql`
  mutation logoutmutation {
    logout
  }
`

const LogoutButton = () => {
  return (
    <Mutation mutation={LogoutMutation}>
      {(logout, { loading, error, data }) => {
        if (loading) return <p>Loading...</p>
        if (error) {
          console.log(error)
          return <p>There was an error</p>
        }
        return (
          <Button
            style={{
              width: '50%',
            }}
            color="primary"
            variant="contained"
            onClick={() => {
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
