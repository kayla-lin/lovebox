import React, { useState, useRef, useContext } from "react";
import IconInput from "../UI/Forms/IconInput";
import classes from "./LoginForm.module.css";
import { FaEnvelope } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { auth } from "../../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../UI/Forms/Alert";
import { AuthContext } from "../../store/auth-context";
import { Link } from "react-router-dom";
import Button from "../UI/Layout/Button";

const LoginForm = () => {
  const [error, setError] = useState<string>("");

  const emailTextInputRef = useRef<HTMLInputElement>(null);
  const passTextInputRef = useRef<HTMLInputElement>(null);

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const logInEmail = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const handleSubmit = async () => {
    try {
      setError("");
      await logInEmail(
        emailTextInputRef.current!.value,
        passTextInputRef.current!.value
      );
      navigate("/dashboard");
      authCtx.setAuth(true);
    } catch {
      setError("Failed to sign in");
    }
  };

  return (
    <form className={classes.form}>
      {error !== "" && <ErrorAlert type="error" msg={error} />}
      <div className={classes.input}>
        <IconInput
          placeholder="Email"
          icon={<FaEnvelope />}
          id="loginemail"
          type="email"
          ref={emailTextInputRef}
        />
      </div>
      <div className={classes.input}>
        <IconInput
          placeholder="Password"
          icon={<FaLock />}
          id="loginpassword"
          type="password"
          ref={passTextInputRef}
        />
        <Link to="/forgotpassword" className={classes["forgot-password"]}>
          Forgot password?
        </Link>
      </div>
      <div className={classes.button}>
        <Button
          label={"Submit"}
          onClick={() => {
            handleSubmit();
          }}
          color={"pink"}
        />
      </div>
    </form>
  );
};

export default LoginForm;
