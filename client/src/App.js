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
  function logOutUser() {
    API.logout().then(({ status }) => {
      if (status === 200) {
        window.location.href = "/";
      }
    });
  }
  return <Container logOutUser={logOutUser} />;
}

export default App;
