import React, { useEffect, Fragment } from "react";
import LoginScreen from "../components/SignIn/LoginScreen";
import LogoWithText from "../components/UI/Layout/LogoWithText";

const SignIn = () => {
  useEffect(() => {
    document.body.classList.add("gradient-back");
    return () => {
      document.body.classList.remove("gradient-back");
    };
  }, []);

  return (
    <Fragment>
      <div style={{ position: "absolute", top: "10px", left: "20px" }}>
        <LogoWithText />
      </div>
      <LoginScreen />
    </Fragment>
  );
};

export default SignIn;
