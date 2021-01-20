import "./App.css";
import React, { useState, useRef, useEffect } from "react";
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

import Container from "./components/Container/Container";

function App() {
  // const socket = socketClient("/");

  // Line 19 - 23 is the most recent code
  // const socket = useRef();

  // useEffect(() => {
  //   socket.current = socketClient.connect();
  // }, []);

  // socket.on("connection", () => {
  //   console.log("Connected to backend");
  // });

  // socket.on("message check", (data) => {
  //   if
  // })
  // const [user, setUser] = useState(false);

  // useEffect(() => {
  //   console.log("Use Effect Called in App.js");
  //   socketRef.current = io.connect();
  // }, []);

  // function joinGroupRequest(id) {
  //   console.log("Sending Join Group Request");
  //   socketRef.current.emit("Join Group Request", id);
  // }

  // function newMessageAlert(groupID, currentGroupID) {
  //   socketRef.current.emit("New Message Alert", {
  //     group: groupID,
  //     currentGroup: currentGroupID,
  //   });
  // }

  function logOutUser() {
    API.logout().then(({ status }) => {
      if (status === 200) {
        window.location.href = "/";
      }
    });
  }
<<<<<<< HEAD
  return <Container logOutUser={logOutUser} />;
=======
  return (
    <div>
      <UserStore>
        <GroupStore>
          <CurrentGroupStore>
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
                      <Group logOutUser={logOutUser} socket={socket} />
                    </Route>

                    {/* <Route exact path="/group">
                  <Group />
                </Route> */}
                
                    <div>
                      <Route exact path="/user/:username">
                        <User
                          logOutUser={logOutUser}
                        />
                      </Route>
                    </div>
                  </div>
                </Switch>
              </Router>
            </div>
          </CurrentGroupStore>
        </GroupStore>
      </UserStore>
    </div>
  );
>>>>>>> 5bf7a6893540eae5314ad67365a11252aeab3579
}

export default App;
