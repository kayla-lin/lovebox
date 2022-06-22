import React, { useContext, useRef, useState } from "react";
import IconInput from "../UI/Forms/IconInput";
import MiddleSquare from "../UI/Forms/MiddleSquare";
import { FaEnvelope } from "react-icons/fa";
import classes from "./ForgotPasswordScreen.module.css";
import { Link } from "react-router-dom";
import { auth } from "../../firebase-config";
import { sendPasswordResetEmail } from "firebase/auth";
import ErrorAlert from "../UI/Forms/Alert";
import Button from "../UI/Layout/Button";
import { AlertContext } from "../../store/alert-context";

const ForgotPasswordScreen = () => {
  const [error, setError] = useState<string>("");
  const emailTextInputRef = useRef<HTMLInputElement>(null);
  const alertCtx = useContext(AlertContext);

  const resetPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };

  const handlePasswordReset = async () => {
    try {
      setError("");
      await resetPassword(emailTextInputRef.current!.value);
      alertCtx.setType("noti");
      alertCtx.setAlert("Successfully requested password change");
    } catch {
      setError("Failed to reset password");
    }
  };

  return (
    <MiddleSquare>
      <h1>Password Reset</h1>
      {error !== "" && <ErrorAlert type="error" msg={error} />}
      <div>
        <div className={classes.input}>
          <IconInput
            placeholder="Email"
            icon={<FaEnvelope />}
            id="loginemail"
            type="email"
            ref={emailTextInputRef}
          />
        </div>
        <Button
          onClick={() => {
            handlePasswordReset();
          }}
          label={"Submit"}
          color={"pink"}
        />
      </div>
      <Link className={classes.login} to="/signin">
        Return to sign in
      </Link>
    </MiddleSquare>
  );
};

export default ForgotPasswordScreen;
