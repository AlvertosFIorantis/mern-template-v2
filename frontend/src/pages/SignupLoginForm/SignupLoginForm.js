import React, { useState, useEffect } from "react";
import "./signupLoginForm.css";
import WidthSizeCustHook from "./WidthSizeCustHook";
import { connect } from "react-redux";

import { logInUserAction } from "../../_actions/actions/Users/loginAction";
import { signUpUserAction } from "../../_actions/actions/Users/signUpUserAction";
import { signUpUserImageAction } from "../../_actions/actions/Users/signUpUserImageAction";
import { loginToken } from "../../_actions/actions/Users/loginToken";

import ImageUpload from "../../shared/image_upload/imageUpload";
import { withRouter } from "react-router-dom";

//Components that i need for this page
import HumanIcon from "../../icons/HumanIcon";
import PassportValidation from "../../components/PassportValidation";

export function SignupLoginForm(props) {
  const [email, setEmail] = useState("email");
  const [password, setPassword] = useState("password");
  const [ConPassword, setConPassword] = useState("confirm password");
  const [showPassword, setShowPassword] = useState(false);
  const [uploadedImage, setUploadedImage] = useState();
  const [showCssClasses, setShowCssClasses] = useState(false);
  const [showCssClassesTimeout, setShowCssClassesTimeout] = useState(false);
  const [matchingPasswords, setMatchingPasswords] = useState(false);
  // state for window width so i can render component conditinally:
  const [width, setWidth] = WidthSizeCustHook();
  // console.log(width)

  const [validations, setValidations] = useState([]);

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    if (email === "") {
      setEmail("email");
    }
  }, [email]);

  const ConfirmPasswordHandler = (e) => {
    setConPassword(e.target.value);
  };

  useEffect(() => {
    if (ConPassword === "") {
      setConPassword("confirm password");
    }
    if (ConPassword === password) {
      setMatchingPasswords(true);
    }
    if (ConPassword !== password) {
      setMatchingPasswords(false);
    }
  }, [ConPassword]);

  // thelo na trexei to use effect kathe fora pou alazei to to password state epidi to password den ginete re-render den thelo na trexei mesa sto idio function pou kano set to password
  useEffect(() => {
    if (password === "") {
      setPassword("password");
    }
    console.log("Checking if the password match the minimum requirements");
    setValidations([
      password.length > 5,
      password.search(/[A-Z]/) > -1,
      password.search(/[0-9]/) > -1,
      password.search(/[$&+,:;=?@!#]/) > -1,
    ]);
  }, [password]);

  const validatePassword = (e) => {
    setPassword(e.target.value);
  };

  const showPasswordHandler = (argument) => {
    if (argument) {
      setShowPassword(true);
    }
    if (!argument) {
      setShowPassword(false);
    }
  };

  const addCssClassesHandler = () => {
    if (showCssClasses) {
      setShowCssClasses(false);
      setShowCssClassesTimeout(false);
      setEmail("email");
      setPassword("password");
    }
    if (!showCssClasses) {
      setShowCssClasses(true);
      setTimeout(function () {
        setShowCssClassesTimeout(true);
      }, 600);
      setEmail("email");
      setPassword("password");
    }
  };

  const uploadImageHandler = (item) => {
    setUploadedImage(item);
  };
  const sendDataToServer = async (event) => {
    event.preventDefault();
    //an den exo uploaded file stelno aplo action mono me json
    if (!uploadedImage) {
      //pernao 2 argument sto fucntion to ena einai ta data kai to alo to history oste otan einai eptixies to action na boro na kano to user redirect
      props.signUpUserAction(
        JSON.stringify({
          email: email,
          password: password,
        }),
        props.history
      );
    }
    if (uploadedImage) {
      //pernao 4 argument sto fucntion to ena einai ta data kai to alo to history oste otan einai eptixies to action na boro na kano to user redirect
      props.signUpUserImageAction(
        email,
        password,
        uploadedImage,
        props.history
      );
    }
  };

  const LoginUser = async (event) => {
    event.preventDefault();
    //an den exo uploaded file stelno aplo action mono me json

    props.logInUserAction(
      JSON.stringify({
        email: email,
        password: password,
      }),
      props.history
    );
  };

  if (width > 550) {
    return (
      // to data test eiani apla ena selector pou to xrisimopio sto test.js den eiprazei katholou to kanoniko app
      <div className="sign-up-body" data-test="SignupLoginForm">
        <div
          className={
            showCssClasses ? "container right-panel-active" : "container"
          }
          id="container"
        >
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button
                  className="ghost"
                  id="signIn"
                  onClick={addCssClassesHandler}
                >
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button
                  className="ghost"
                  id="signUp"
                  onClick={addCssClassesHandler}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            showCssClasses ? "login-div login-div-active" : "login-div"
          }
        >
          <div className="logo"></div>
          <div className="title">Log in</div>
          <form style={{ width: "100%" }} onSubmit={LoginUser}>
            <div className="fields">
              <div className="username">
                <HumanIcon fill="#999" className="svg-icon" />

                <input
                  type="username"
                  className="user-input"
                  onChange={emailHandler}
                  placeholder={email}
                />
              </div>

              <div className="password">
                <HumanIcon fill="#999" className="svg-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="pass-input"
                  placeholder={password}
                  onChange={validatePassword}
                />
                <span
                  className="toggle-password"
                  onMouseEnter={() => showPasswordHandler(true)}
                  onMouseLeave={() => showPasswordHandler(false)}
                >
                  {showPassword ? "👁️" : "👁️"}
                </span>
              </div>
            </div>
            <button type="submit" onClick={LoginUser} className="signin-button">
              Login
            </button>
          </form>
        </div>

        <div
          className={
            showCssClassesTimeout
              ? "login-div-login login-div-login-active"
              : "login-div-login "
          }
        >
          <div className="logo"></div>
          <div className="title">Sign Up</div>
          <form style={{ width: "100%" }} onSubmit={sendDataToServer}>
            <div className="fields">
              <div className="username">
                <HumanIcon fill="#999" className="svg-icon" />

                <input
                  type="username"
                  className="user-input"
                  onChange={emailHandler}
                  placeholder={email}
                />
              </div>

              <div className="password">
                <HumanIcon fill="#999" className="svg-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="pass-input"
                  placeholder={password}
                  onChange={validatePassword}
                />
                <span
                  className="toggle-password"
                  onMouseEnter={() => showPasswordHandler(true)}
                  onMouseLeave={() => showPasswordHandler(false)}
                >
                  {showPassword ? "👁️" : "👁️"}
                </span>
              </div>
              <PassportValidation validations={validations} />

              <div className="password">
                <HumanIcon fill="#999" className="svg-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="pass-input"
                  placeholder={ConPassword}
                  onChange={ConfirmPasswordHandler}
                />
                <span
                  className="toggle-password"
                  onMouseEnter={() => showPasswordHandler(true)}
                  onMouseLeave={() => showPasswordHandler(false)}
                >
                  {showPassword ? "👁️" : "👁️"}
                </span>
              </div>

              <ImageUpload center uploadImageHandler={uploadImageHandler} />
            </div>

            <button
              type="submit"
              disabled={!matchingPasswords}
              className="signin-button"
              onClick={sendDataToServer}
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <div className="sign-up-body" data-test="SignupLoginForm">
        <label className="switch" style={{ marginTop: "10px" }}>
          <input type="checkbox" id="togBtn" onClick={addCssClassesHandler} />
          <div className="slider round"></div>
        </label>
        <div
          className={
            showCssClassesTimeout
              ? "login-div-small  display-help "
              : "login-div-small "
          }
        >
          <div className="logo"></div>
          <div className="title">Log in</div>
          <form style={{ width: "100%" }} onSubmit={LoginUser}>
            <div className="fields">
              <div className="username">
                <HumanIcon fill="#999" className="svg-icon" />

                <input
                  type="username"
                  className="user-input"
                  onChange={emailHandler}
                  placeholder={email}
                />
              </div>

              <div className="password">
                <HumanIcon fill="#999" className="svg-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="pass-input"
                  placeholder={password}
                  onChange={validatePassword}
                />
                <span
                  className="toggle-password"
                  onMouseEnter={() => showPasswordHandler(true)}
                  onMouseLeave={() => showPasswordHandler(false)}
                >
                  {showPassword ? "👁️" : "👁️"}
                </span>
              </div>
            </div>
            <button type="submit" onClick={LoginUser} className="signin-button">
              Login
            </button>
          </form>
        </div>

        <div
          className={
            showCssClassesTimeout
              ? "login-div-small "
              : "login-div-small display-help"
          }
        >
          <div className="logo"></div>
          <div className="title">Sign Up</div>
          <form style={{ width: "100%" }} onSubmit={sendDataToServer}>
            <div className="fields">
              <div className="username">
                <HumanIcon fill="#999" className="svg-icon" />

                <input
                  type="username"
                  className="user-input"
                  onChange={emailHandler}
                  placeholder={email}
                />
              </div>

              <div className="password">
                <HumanIcon fill="#999" className="svg-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="pass-input"
                  placeholder={password}
                  onChange={validatePassword}
                />
                <span
                  className="toggle-password"
                  onMouseEnter={() => showPasswordHandler(true)}
                  onMouseLeave={() => showPasswordHandler(false)}
                >
                  {showPassword ? "👁️" : "👁️"}
                </span>
              </div>

              <PassportValidation validations={validations} />

              <div className="password">
                <HumanIcon fill="#999" className="svg-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="pass-input"
                  placeholder={ConPassword}
                  onChange={ConfirmPasswordHandler}
                />
                <span
                  className="toggle-password"
                  onMouseEnter={() => showPasswordHandler(true)}
                  onMouseLeave={() => showPasswordHandler(false)}
                >
                  {showPassword ? "👁️" : "👁️"}
                </span>
              </div>
              <ImageUpload center uploadImageHandler={uploadImageHandler} />
            </div>

            <button
              type="submit"
              disabled={!matchingPasswords}
              className="signin-button"
              onClick={sendDataToServer}
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
  };
};

const mapDispatchToProps = {
  // prepei na kano import sto conmponent to action pou thelo apo to actions.js file
  signUpUserAction: signUpUserAction,
  signUpUserImageAction: signUpUserImageAction,
  logInUserAction: logInUserAction,
  loginToken: loginToken,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SignupLoginForm));
