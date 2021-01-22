import "./App.css";
import React from "react";
import API from "../src/utils/API";
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
