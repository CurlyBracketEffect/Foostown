import React from 'react';
import './App.css';

//react router
import { BrowserRouter as Router, Route } from "react-router-dom"

//apollo
// import { ApolloProvider} from "react-apollo"
// import apolloClient from './apolloClient' --- create apolloClient component

//components
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import HomePage from './HomePage';
import CreateGamePage from './CreateGamePage';


const App = () => {
  return (
    <Router>
      {/* <ApolloProvider> << insert: client={apolloClient} */}
        <div className="App">
          <LoginPage />
          <SignUpPage />
          <HomePage />
          <CreateGamePage />
        </div>
      {/* </ApolloProvider> */}
    </Router>
  ); 
}

export default App;
