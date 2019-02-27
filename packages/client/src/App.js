import React, { useState } from 'react'
import './App.css'

//react router
import { BrowserRouter as Router, Route } from 'react-router-dom'

//apollo
import { ApolloProvider } from "react-apollo"
import apolloClient from './apolloClient'

//components
import Login from './Login-SignUp/Login'
import SignUp from './Login-SignUp/SignUp'
import HomePage from './Play-Game/HomePage'
import CreateGamePage from './Play-Game/CreateGamePage'


//material-ui
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import { unstable_Box as Box } from '@material-ui/core/Box'

const intialCSRFToken = localStorage.getItem('token')

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
  const [csrfToken, setCSRFToken] = useState(intialCSRFToken);
  return (
    <Router>
      <ApolloProvider client={apolloClient}>
        <MuiThemeProvider theme={theme}>
            <Box className="App" style={{backgroundColor: '#f5f5f5'}}>
              {csrfToken == null && (
                <React.Fragment>
                  <Route path='/' exact render={() => (
                    <Login setCSRFToken={setCSRFToken} />
                  )} />
                  <Route path='/sign-up' exact render={() => (
                    <SignUp setCSRFToken={setCSRFToken} />
                  )} />
                </React.Fragment>
              )}

              {csrfToken != null && (
                <React.Fragment>
                  <Route path='/' exact component={HomePage} />
                  <Route path='/create-game' exact component={CreateGamePage} />
                </React.Fragment>
              )}
            </Box>
        </MuiThemeProvider>
      </ApolloProvider>

    </Router>
  );
}

export default App;
