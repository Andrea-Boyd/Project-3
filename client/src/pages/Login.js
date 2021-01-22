import React, { useState, useContext, useEffect } from "react";
import "./Login.css";
import Toast from "../utils/Toast";
import { Link, Redirect } from "react-router-dom";
import API from "../utils/API";
import { UserContext } from "../utils/UserStore";
import Logo from "../images/logo.png";
import { Container, Col, Row } from "reactstrap";
import GitHubIcon from "@material-ui/icons/GitHub";

function Login() {
  const [newLogin, setLogin] = useState({});
  const [redirect, setRedirect] = useState({ redirect: null });
  const { userState, setUserState } = useContext(UserContext);

  // This will trigger redirect when the user logs in and the Global userState is set
  useEffect(() => {
    if (userState) {
      setRedirect({ redirect: true });
    }
  }, [userState]);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setLogin({ ...newLogin, [name]: value.trim() });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    //console.log(newLogin);
    if (!newLogin.email || !newLogin.password) {
      Toast.allFields();
    } else
      API.loginUser({
        email: newLogin.email,
        password: newLogin.password,
      })
        .then((res) => {
          console.log(res);
          console.log("Before");
          if (res.data !== "No User exists") {
            setUserState(res.data);
          } else Toast.validPassword();

          console.log(res.data);
          //setUserState(res.data);
          console.log("After");
          //setUserState(res.data);
          //redirect();
        })
        .then((res) => {
          console.log(res);
          console.log("Before");
          console.log(res.data);

          setUserState(res.data);
          console.log("After");
          //setUserState(res.data);
          //redirect();
        })
        .catch((err) => console.log(err));
  }

  // Conditional render that will redirect to User page if userState has been set
  if (redirect.redirect) {
    return <Redirect to={"/user/" + userState.username} />;
  } else {
    return (
      <div className="login">
        <Container>
          <Row>
            <Col className="col-md-6">
              <div className="logo float-child-left">
                <img src={Logo} alt="KIT Logo" />
              </div>
            </Col>
            <Col className="col-md-6 col-12">
              <div className="login__content float-child-right">
                <form>
                  {/* <h2>Login</h2> */}

                  <div className="form-group">
                    {/* <label>Email address</label> */}
                    <input
                      onChange={handleInputChange}
                      name="email"
                      type="email"
                      className="form-control"
                      placeholder="Email"
                    />
                  </div>

                  <div className="form-group">
                    {/* <label>Password</label> */}
                    <input
                      onChange={handleInputChange}
                      name="password"
                      type="password"
                      className="form-control"
                      placeholder="Password"
                    />
                  </div>

                  <button
                    onClick={handleFormSubmit}
                    type="submit"
                    className="text signup__btn"
                  >
                    Login
                  </button>
                  {/* <p className="register"></p> */}
                  <Link to="/signup" style={{ textDecoration: "none" }}>
                    <button className="signup__btn">Sign Up</button>
                  </Link>
                </form>
              </div>
            </Col>
          </Row>
          <Row className="login__footer">
            <div className="login__links">
              <p class="github-text" id="footer-links">
                <a href="https://github.com/outoftune266">
                  <GitHubIcon />
                  Zak
                </a>
              </p>
            </div>

            <div className="login__links">
              <p class="github-text" id="footer-links">
                <a href="https://github.com/chadtarpey615">
                  <GitHubIcon />
                  Chad
                </a>
              </p>
            </div>
            <div className="login__links">
              <p class="github-text" id="footer-links">
                <a href="https://github.com/Andrea-Boyd">
                  <GitHubIcon />
                  Andrea
                </a>
              </p>
            </div>
            <div className="login__links">
              <p class="github-text" id="footer-links">
                <a href="https://github.com/Kevin-Pulley">
                  <GitHubIcon />
                  Kevin
                </a>
              </p>
            </div>
          </Row>
          <Row className="footer__copyright">
            <div className="footer__bottom">
              <p className="footer__copyright">
                Designed and built by: Zak Monnet, Chad Tarpey, Andrea Boyd,
                Kevin Pulley
              </p>
              <p className="footer__copyright">&copy;, 2021</p>
            </div>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
