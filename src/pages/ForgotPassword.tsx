import React, { Fragment, useEffect } from "react";
import ForgotPasswordScreen from "../components/ForgotPassword/ForgotPasswordScreen";

const ForgotPassword = () => {
  
  useEffect(() => {
    document.body.classList.add("gradient-back");
    return () => {
      document.body.classList.remove("gradient-back");
    };
  }, []);

  return (
    <Fragment>
      <ForgotPasswordScreen />
    </Fragment>
  );
};

export default ForgotPassword;
