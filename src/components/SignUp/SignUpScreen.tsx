import React, { useContext } from "react";
import MiddleSquare from "../UI/Forms/MiddleSquare";
import { Link } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import classes from "./SignUpScreen.module.css";
import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../store/auth-context";
import { signUpInGoogle } from "./SignUpGoogle";
const SignUpScreen = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <MiddleSquare>
      <div className={classes.signup}>
        <h1>Sign Up</h1>
        <p>Start by creating your account</p>
        <SignUpForm />
        <div className={classes.signin}>
          <p>Already have an account?</p>
          <Link to="/signin">Sign in</Link>
        </div>
        <GoogleButton
          onClick={() => {
            signUpInGoogle(navigate, authCtx);
          }}
          label="Sign up with Google"
        />
      </div>
    </MiddleSquare>
  );
};

export default SignUpScreen;
