import "./App.css";
import React, { useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Group from "./pages/Group";
import User from "./pages/User";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import API from "../src/utils/API";
import io from "socket.io-client";
import UserStore from "./utils/UserStore";
import GroupStore from "./utils/GroupStore";
import CurrentGroupStore from "./utils/CurrentGroupStore";
import CurrentSubGroupStore from "./utils/CurrentSubGroupStore";

function App() {
  const socketRef = useRef();

  // socket.on("connection", () => {
  //   console.log("Connected to backend");
  // });

  // socket.on("message check", (data) => {
  //   if
  // })
  // const [user, setUser] = useState(false);

  useEffect(() => {
    socketRef.current = io.connect();
  }, []);

  function joinGroupRequest(id) {
    console.log("Sending Join Group Request");
    socketRef.current.emit("Join Group Request", id);
  }

  function newMessageAlert(groupID, currentGroupID) {
    socketRef.current.emit("New Message Alert", {
      group: groupID,
      currentGroup: currentGroupID,
    });
  }

  function logOutUser() {
    API.logout().then(({ status }) => {
      if (status === 200) {
        window.location.href = "/";
      }
    });
  }
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
                          logOutUser={logOutUser}
                          socketRef={socketRef}
                          joinGroupRequest={joinGroupRequest}
                          newMessageAlert={newMessageAlert}
                        />
                      </Route>

                      {/* <Route exact path="/group">
                  <Group />
                </Route> */}
                      <Route exact path="/user/:username">
                        <User logOutUser={logOutUser} />
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

export default App;
