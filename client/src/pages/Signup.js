import createSpacing from "@material-ui/core/styles/createSpacing";
import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import API from "../utils/API";
import Toast from "../utils/Toast";
import "./SignUp.css";
import { UserContext } from "../utils/UserStore";

function SignUp() {
  const [newUser, setNewUser] = useState({ input: "" });
  const [userArr, setUserArr] = useState({});
  const [redirect, setRedirect] = useState({ redirect: null });
  const { userState, setUserState } = useContext(UserContext);

  useEffect(() => {
    //console.log("State Change");
    console.log(userState);
    //console.log(userState.password);
    //console.log(redirect);
    if (userState.password !== "") {
      setRedirect({ redirect: true });
    }
  }, [userState]);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setUserArr({ ...userArr, [name]: value.trim() });
  }

  function handleFormSubmit(event, res) {
    event.preventDefault();
    console.log(window.location.origin);
    if (
      !userArr.first_name ||
      !userArr.last_name ||
      !userArr.username ||
      !userArr.password
    ) {
      Toast.allFields();
    } else if (
      userArr.password === userArr.password2 &&
      userArr.password !== ""
    ) {
      API.saveUser({
        first_name: userArr.first_name,
        last_name: userArr.last_name,
        username: userArr.username,
        email: userArr.email,
        password: userArr.password,
      })
        .then(
          (res) => setUserState(res.data)
          // window.location.replace(
          //   window.location.origin + "/user/" + res.data.user
          // )
        )
        .catch((err) => console.log(err));
    } else {
      Toast.userPassword();
    }
  }

  // This commented code needs to go on the User page in order to query db for User info
  // let pathArray = window.location.pathname.split("/");
  // let username = pathArray[pathArray.length - 1];

  if (redirect.redirect) {
    return <Redirect to={"/user/" + userState.username} />;
  } else {
    return (
      <div className="signup__container">
        <div className="signup__content">
          <form>
            <h2>Sign Up</h2>
            

            <div className="form-group">
              {/* <label>First Name</label> */}
              <input
                onChange={handleInputChange}
                name="first_name"
                type="text"
                className="form-control"
                placeholder="Enter First Name"
              />
            </div>

            <div className="form-group">
              {/* <label>Last Name</label> */}
              <input
                onChange={handleInputChange}
                name="last_name"
                type="text"
                className="form-control"
                placeholder="Enter Last Name"
              />
            </div>

            <div className="form-group">
              {/* <label>Username</label> */}
              <input
                onChange={handleInputChange}
                name="username"
                type="text"
                className="form-control"
                placeholder="Enter a Username"
              />
            </div>

            <div className="form-group">
              {/* <label>Email Address</label> */}
              <input
                onChange={handleInputChange}
                name="email"
                type="email"
                className="form-control"
                placeholder="Enter Email"
              />
            </div>

            <div className="form-group">
              {/* <label>Password</label> */}
              <input
                onChange={handleInputChange}
                name="password"
                type="password"
                className="form-control"
                placeholder="Enter Password"
              />
            </div>
            <div className="form-group">
              {/* <label>Password</label> */}
              <input
                onChange={handleInputChange}
                name="password2"
                type="password"
                className="form-control"
                placeholder="Re-Enter Password"
              />
            </div>

            <button
              onClick={handleFormSubmit}
              type="submit"
              className="btn btn-primary btn-block"
            >
              Submit
            </button>
            
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
