import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Chat from "./components/Chat/Chat";
import SignUp from "./pages/Signup";
import Group from "./pages/Group"
function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/">
          
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/user/"></Route>
          <Route exact path="/group">            
              <Group />       
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
