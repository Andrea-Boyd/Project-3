import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Group from "./pages/Group";
import Sidebar from "./components/Sidebar/Sidebar";
import Chat from "./components/Chat/Chat";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/">
           <Login/>
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/user/"></Route>
          <Route exact path="/group">
            <div className="app__body">
              <Sidebar />
              <Chat />
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
