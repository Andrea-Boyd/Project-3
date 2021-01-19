import "./App.css";
import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Group from "./pages/Group";
import User from "./pages/User";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import API from "../src/utils/API";
import socketClient from "socket.io-client";
import UserStore from "./utils/UserStore";
import GroupStore from "./utils/GroupStore";
import CurrentGroupStore from "./utils/CurrentGroupStore";
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

  const [user, setUser] = useState(false);
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
