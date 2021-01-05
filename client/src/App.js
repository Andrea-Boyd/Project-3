import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Group from "./pages/Group";

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/">
            <Group />
          </Route>
          <Route exact path="/signup"></Route>
          <Route exact path="/user/:id"></Route>
          <Route exact path="/group/:id">
            <Group />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
