import React from 'react';
import './App.css';

//react router
import { BrowserRouter as Router, Route } from "react-router-dom"

//apollo
// import { ApolloProvider} from "react-apollo"
// import apolloClient from './apolloClient' --- create apolloClient component

//components

import Login from './login-sign-up/Login';
import SignUp from './login-sign-up/SignUp';
import HomePage from './play-game/HomePage';
import CreateGamePage from './play-game/CreateGamePage';


//material-ui
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core'

const App = () => {
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
  
  return (
    <Router>
      <ThemeProvider theme={theme}>
        {/* <ApolloProvider> << insert: client={apolloClient} */}
          <div className="App">
            <Route path="/" exact component={Login} />
            <Route path="/sign-up" exact component={SignUp} />
            <Route path="/home" exact component={HomePage} />
            <Route path="/create-game" exact component={CreateGamePage} />
          </div>
        {/* </ApolloProvider> */}
      </ThemeProvider>
    </Router>
  ); 
}

export default App;
