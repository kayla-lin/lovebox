import React, { useContext } from "react";
import LoginForm from "./LoginForm";
import classes from "./LoginScreen.module.css";
import GoogleButton from "react-google-button";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../store/auth-context";
import MiddleSquare from "../UI/Forms/MiddleSquare";
import { signUpInGoogle } from "../SignUp/SignUpGoogle";

const LoginScreen = () => {
  let navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  return (
    <MiddleSquare>
      <div className={classes.login}>
        <h1>Sign In</h1>
        <p>Start by signing into your account</p>
        <LoginForm />
        <div className={classes.signup}>
          <p>Don't have an account?</p>
          <Link to="/signup" className={classes["signup-link"]}>
            Sign up
          </Link>
        </div>
        <div className={classes.google}>
          <GoogleButton
            onClick={() => {
              signUpInGoogle(navigate, authCtx);
            }}
          />
        </div>
      </div>
    </MiddleSquare>
  );
};

export default LoginScreen;
