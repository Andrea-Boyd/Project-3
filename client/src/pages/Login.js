import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import API from "../utils/API"
//import { response } from "express";





=======
import API from "../utils/API";
// import { response } from "express";
>>>>>>> main

function Login() {
  const [newLogin, setLogin] = useState({});

  function handleInputChange(event) {
    const { name, value } = event.target;
    setLogin({ ...newLogin, [name]: value });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    console.log(newLogin);
    API.loginUser({
      email: newLogin.email,
      password: newLogin.password,
    }).then((res) => {
      console.log(res);
      window.location.replace(
        window.location.origin + "/user/" + res.data.username
      );
    });
  }

  return (
    <div className="login__container">
      <div className="login__content">
        <form>
          <h2>Login</h2>

          <div className="form-group">
            <label>Email address</label>
            <input
              onChange={handleInputChange}
              name="email"
              type="email"
              className="form-control"
              placeholder="Enter email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              onChange={handleInputChange}
              name="password"
              type="password"
              className="form-control"
              placeholder="Enter password"
            />
          </div>

          <button
            onClick={handleFormSubmit}
            type="submit"
            className="btn btn-primary btn-block"
          >
            Login
          </button>
          <p className="register">Not Registered??</p>
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <button className="signup__btn">Sign Up!</button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
