import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Chat from "./components/Chat/Chat";

function App() {
  return (
    <Router>
      <div className="app">
        <div className="app__body">
          <Switch>
            <Route exact path="/">
              <Sidebar />
              <Chat />
            </Route>
            <Route exact path="/signup"></Route>
            <Route exact path="/user/"></Route>
            <Route exact path="/group"></Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
