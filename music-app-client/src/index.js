import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Amplify from 'aws-amplify';
import config from './config';

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  API: {
    endpoints: [
      {
        name: "create",
        endpoint: "https://pu28j42qa3.execute-api.eu-west-1.amazonaws.com/prod/create",
        region: "eu-west-1"
      },
      {
        name: "hello",
        endpoint: "https://pu28j42qa3.execute-api.eu-west-1.amazonaws.com/prod/hello",
        region: "eu-west-1"
      },
      {
        name: "userRehearsals",
        endpoint: "https://pu28j42qa3.execute-api.eu-west-1.amazonaws.com/prod/userRehearsals",
        region: "eu-west-1"
      },
      {
        name: "deleteRehearsal",
        endpoint: "https://pu28j42qa3.execute-api.eu-west-1.amazonaws.com/prod/deleteRehearsal",
        region: "eu-west-1"
      },
      {
        name: "combine",
        endpoint: "https://pu28j42qa3.execute-api.eu-west-1.amazonaws.com/prod/combine",
        region: "eu-west-1"
      },
      {
        name: "musicianRehearsal",
        endpoint: "https://pu28j42qa3.execute-api.eu-west-1.amazonaws.com/prod/musicianRehearsal",
        region: "eu-west-1"
      }
    ]
  }
});

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

/*
        custom_header: async () => { 
          return { Authorization: `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}` }
        }
*/