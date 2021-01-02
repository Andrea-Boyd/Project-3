import React from 'react'

function SignUp() {
    return (
      <div className="signup__container">
        <div className="signup__content">
          <form>
            <h3>Sign Up</h3>

            <div className="form-group">
              <label>Email address</label>
              <input
                name="input"
                type="email"
                className="form-control"
                placeholder="Enter email"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                name="input"
                type="password"
                className="form-control"
                placeholder="Enter password"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                name="input"
                type="password"
                className="form-control"
                placeholder="Re-Enter password"
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block">
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

