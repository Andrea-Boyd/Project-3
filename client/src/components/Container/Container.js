import React, { useSate } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import socketClient from "socket.io-client";
import Group from "../../pages/Group";
import User from "../../pages/User";
import SignUp from "../../pages/Signup";
import Login from "../../pages/Login";
import API from "../../utils/API";
import UserStore from "../../utils/UserStore";
import GroupStore from "../../utils/GroupStore";
import CurrentGroupStore from "../../utils/CurrentGroupStore";
import CurrentSubGroupStore from "../../utils/CurrentSubGroupStore";

function Container(props) {
  return (
    <div>
      <UserStore>
        <GroupStore>
          <CurrentGroupStore>
            <CurrentSubGroupStore>
              <div>
                <Router>
                  <Switch>
                    {/* {user ? <User /> : <Login />} */}
                    <Route exact path="/">
                      <Login />
                    </Route>
                    <Route exact path="/signup">
                      <SignUp />
                    </Route>

                    {/* Route below will only work once proper group name is retrun from db in Users.js */}
                    <div className="app">
                      <Route exact path="/user/:username/:group">
                        <Group
                          logOutUser={props.logOutUser}
                          socket={props.socket}
                        />
                      </Route>

                      {/* <Route exact path="/group">
                    <Group />
                  </Route> */}
                      <Route exact path="/user/:username">
                        <User logOutUser={props.logOutUser} />
                      </Route>
                    </div>
                  </Switch>
                </Router>
              </div>
            </CurrentSubGroupStore>
          </CurrentGroupStore>
        </GroupStore>
      </UserStore>
    </div>
  );
}

export default Container;
