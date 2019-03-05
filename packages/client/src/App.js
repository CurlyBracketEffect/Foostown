import React, { useState } from 'react'
import './App.css'

//react router
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

//apollo
import { ApolloProvider } from 'react-apollo'
import apolloClient from './apolloClient'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

//components
import Login from './Login-SignUp/Login'
import SignUp from './Login-SignUp/SignUp'
import HomePage from './Play-Game/HomePage'
import CreateGamePage from './Play-Game/CreateGamePage'
import CreateTournament from './Tournaments/CreateTournament'
import Tournament from './Tournaments/Tournament'

//material-ui
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import { unstable_Box as Box } from '@material-ui/core/Box'

const history = createBrowserHistory()

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffffff',
      main: '#f9f9f9',
      dark: '#c6c6c6',
      contrastText: '#000000',
    },
    secondary: {
      light: '#57dd57',
      main: '#00aa25',
      dark: '#007900',
      contrastText: '#ffffff',
    },
  },
})

const App = () => {
  return (
    <Router history={history}>
      <ApolloProvider client={apolloClient}>
        <MuiThemeProvider theme={theme}>
          <Query
            query={gql`
              query {
                authStatus @client {
                  id
                  isLoggedIn
                }
              }
            `}
          >
            {({ loading, error, data }) => {
              if (loading) return <div>Loading...</div>
              if (error) {
                throw error
              }
              const { isLoggedIn } = data.authStatus
              return (
                <Box className="App" style={{ backgroundColor: '#f5f5f5' }}>
                  {!isLoggedIn && (
                    <Switch>
                      <Route path="/" exact component={Login} />
                      <Route path="/sign-up" exact component={SignUp} />
                      <Redirect to="/" />
                    </Switch>
                  )}

                  {isLoggedIn && (
                    <React.Fragment>
                      <Route path="/" exact component={HomePage} />} />
                      <Redirect path="/sign-up" to="/" />
                      <Route path="/create-game" exact component={CreateGamePage} />
                      <Route path="/create-tournament" exact component={CreateTournament} />
                      <Route path="/tournament" exact component={Tournament} />
                    </React.Fragment>
                  )}
                </Box>
              )
            }}
          </Query>
        </MuiThemeProvider>
      </ApolloProvider>
    </Router>
  )
}

export default App
