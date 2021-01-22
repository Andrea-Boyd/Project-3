import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Group from "../../pages/Group";
import User from "../../pages/User";
import SignUp from "../../pages/Signup";
import Login from "../../pages/Login";
import UserStore from "../../utils/UserStore";
import GroupStore from "../../utils/GroupStore";
import CurrentGroupStore from "../../utils/CurrentGroupStore";
import CurrentSubGroupStore from "../../utils/CurrentSubGroupStore";

// Container Component is used to house Router functionality and give child components/pages access to Global Stores

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
                    <Route exact path="/">
                      <Login />
                    </Route>
                    <Route exact path="/signup">
                      <SignUp />
                    </Route>
                    <div className="app">
                      <Route exact path="/user/:username/:group">
                        <Group
                          logOutUser={props.logOutUser}
                          socket={props.socket}
                        />
                      </Route>
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
