import React, { useState, useEffect } from "react";
import API from "../utils/API"
import "./SignUp.css"


function SignUp() {

  const [newUser, setNewUser] = useState({ input: ""});
  const [userArr, setUserArr] = useState({});


  function handleInputChange(event) {
    const { name, value } = event.target;
    setUserArr({...userArr, [name]: value})
  };

  function handleFormSubmit(event) {
    event.preventDefault();
    console.log(userArr);
    API.saveUser({
          first_name: userArr.first_name,
          last_name: userArr.last_name,
          email: userArr.email,
          password: userArr.password,
          password2: userArr.password2
    })

     
  }
    return (
      <div className="signup__container">
        <div className="signup__content">
          <form>
            <h2>Sign Up</h2>

            <div className="form-group">
              <label>First Name</label>
              <input
               onChange={handleInputChange}
                name="first_name"
                type="text"
                className="form-control"
                placeholder="Enter first name"
              />
            </div>



            <div className="form-group">
              <label>Last Name</label>
              <input
               onChange={handleInputChange}
                name="last_name"
                type="text"
                className="form-control"
                placeholder="Enter last name"
              />
            </div>

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
            <div className="form-group">
              <label>Password</label>
              <input
               onChange={handleInputChange}
                name="password2"
                type="password"
                className="form-control"
                placeholder="Re-Enter password"
              />
            </div>

            <button onClick={handleFormSubmit}type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
            <p className="forgot-password text-right">
              Forgot <a href="#">password?</a>
            </p>
          </form>
        </div>
      </div>
    );
}

export default SignUp

