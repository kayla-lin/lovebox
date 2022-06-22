import React, { useEffect, Fragment } from "react";
import SignUpScreen from "../components/SignUp/SignUpScreen";
import LogoWithText from "../components/UI/Layout/LogoWithText";

const SignUp = () => {
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
      <SignUpScreen />
    </Fragment>
  );
};

export default SignUp;
