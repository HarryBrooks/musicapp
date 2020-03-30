import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import AppliedRoute from "./components/AppliedRoute";

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <Route path='/login' component={() => {
        window.location.href = 'https://music-app.auth.eu-west-1.amazoncognito.com/login?client_id=3bdor0t8sfcsc0eps2h0b4ud9i&response_type=code&scope=email+openid+profile&redirect_uri=http://localhost:3000/'
      }} />
      { /* Finally, catch all unmatched routes */ }
      <Route component={NotFound} />
    </Switch>
  );
}