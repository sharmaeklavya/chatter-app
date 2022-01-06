import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./comps/PrivateRoute";
import Header from "./comps/Header";
import Search from "./comps/Search";
import Chats from "./comps/Chats";
import Login from "./comps/Login";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact component={Login} />
        <PrivateRoute
          path="/*"
          exact
          render={() => (
            <>
              <Header />
              <Search />
              <Chats />
            </>
          )}
        />
      </Switch>
    </Router>
  );
}

export default App;
