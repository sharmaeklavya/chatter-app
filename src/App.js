import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./comps/PrivateRoute";
import Chats from "./comps/Chats";
import Login from "./comps/Login";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact component={Login} />
        <PrivateRoute path="/*" exact render={() => <Chats />} />
      </Switch>
    </Router>
  );
}

export default App;
