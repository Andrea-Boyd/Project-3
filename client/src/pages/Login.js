import React, { useState, useContext, useEffect } from "react";
import "./Login.css";
import Toast from "../utils/Toast";
import { Link, Redirect } from "react-router-dom";
import API from "../utils/API";
import { UserContext } from "../utils/UserStore";
import { ContactsOutlined } from "@material-ui/icons";
// import { response } from "express";

function Login() {
  const [newLogin, setLogin] = useState({});
  const [redirect, setRedirect] = useState({ redirect: null });
  const { userState, setUserState } = useContext(UserContext);

  useEffect(() => {
    //console.log("State Change");
    //console.log(userState);
    //console.log(userState.password);
    //console.log(redirect);
    if (userState.password !== "spaceoddity") {
      setRedirect({ redirect: true });
    }
  }, [userState]);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setLogin({ ...newLogin, [name]: value });
  }

 
  

  function handleFormSubmit(e) {
    e.preventDefault();
    console.log(newLogin);
   if (!newLogin.email || !newLogin.password) {
     Toast.allFields()
   } else 
    API.loginUser({
      email: newLogin.email,
      password: newLogin.password,
    })
      .then((res) => {
        //console.log(res);
        console.log("Before");
        console.log(res.data);
        setUserState(res.data);
        console.log("After");
        //setUserState(res.data);
        //redirect();
      })
      .catch((err) => Toast.validPassword());
  }

  if (redirect.redirect) {
    return <Redirect to={"/user/" + userState.username} />;
  } else {
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
}

export default Login;
