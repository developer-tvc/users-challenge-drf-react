import React from "react";
import List from "../component/List"
import { Switch, Redirect, Route } from "react-router-dom";

const Routes = () => {
  const RedirectLogin = () => {
    return <Redirect to="/list" />;
  };
  return (
    <Switch>
      <Route path="/" exact component={RedirectLogin} />
      <Route path="/list" exact component={List} />
    </Switch>
  );
};
export default Routes;