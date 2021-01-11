import "./App.css";
import React, { memo } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Group from "./pages/Group";
import User from "./pages/User";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import socketClient from "socket.io-client";
import UserStore from "./utils/Store";

const StaticComponent = memo(({ children }) => {
  return <div className="Test">{children}</div>;
});

function App() {
  // let socket = socketClient();

  // socket.on("connection", () => {
  //   console.log("Connected to backend");
  // });

  return (
    <div>
      <UserStore>
        <StaticComponent>
          <div className="app">
            <Router>
              <Switch>
                <Route exact path="/">
                  <Login />
                </Route>
                <Route exact path="/signup">
                  <SignUp />
                </Route>

                {/* Route below will only work once proper group name is retrun from db in Users.js */}
                <Route exact path="/user/:username/:group">
                  <Group />
                </Route>

                <Route exact path="/group">
                  <Group />
                </Route>
                <Route exact path="/user/:username">
                  <User />
                </Route>
              </Switch>
            </Router>
          </div>
        </StaticComponent>
      </UserStore>
    </div>
  );
}

export default App;
