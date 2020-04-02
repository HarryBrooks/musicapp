import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import AppliedRoute from "./components/AppliedRoute";
import Signup from "./containers/Signup";
import MakeRehearsal from "./containers/MakeRehearsal";
import ShowRehearsals from "./containers/ShowRehearsals";
import MakeVideo from "./containers/MakeVideo";

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <AppliedRoute path="/login" exact component={Login} appProps={appProps} />
      <AppliedRoute path="/signup" exact component={Signup} appProps={appProps} />
      <AppliedRoute path="/rehearsal" exact component={MakeRehearsal} />
      <AppliedRoute path="/showRehearsals" exact component={ShowRehearsals} />
      <AppliedRoute path="/makeVideo" exact component={MakeVideo} appProps={appProps} />
      { /* Finally, catch all unmatched routes */ }
      <Route component={NotFound} />
    </Switch>
  );
}