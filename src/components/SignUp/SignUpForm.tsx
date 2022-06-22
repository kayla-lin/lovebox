import React, { useContext, useRef, useState } from "react";
import IconInput from "../UI/Forms/IconInput";
import { FaEnvelope } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaSmileBeam } from "react-icons/fa";
import classes from "./SignUpForm.module.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import ErrorAlert from "../UI/Forms/Alert";
import { AuthContext } from "../../store/auth-context";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../../firebase-config";
import { doc, setDoc } from "firebase/firestore";
import Button from "../UI/Layout/Button";
const SignUpForm = () => {
  const [error, setError] = useState<string>("");

  const nameTextInputRef = useRef<HTMLInputElement>(null);
  const emailTextInputRef = useRef<HTMLInputElement>(null);
  const passTextInputRef = useRef<HTMLInputElement>(null);
  const conPassTextInputRef = useRef<HTMLInputElement>(null);

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  /*
    Signup with email and password
  */
  const createUserEmail = async () => {
    await setDoc(doc(db, "users", auth.currentUser!.uid), {
      name: nameTextInputRef.current!.value,
      email: emailTextInputRef.current!.value,
      uid: auth.currentUser!.uid,
    });
  };

  const signUpEmail = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const handleSubmit = async () => {
    // Do not match
    if (
      passTextInputRef.current!.value !== conPassTextInputRef.current!.value
    ) {
      setError("Passwords do not match");
      return;
    }
    // Password not enough characters
    if (passTextInputRef.current!.value.length < 6) {
      setError("Password must be atleast 6 characters long");
      return;
    }
    // Name is empty
    if (nameTextInputRef.current!.value.trim().length < 1) {
      setError("Name is not long enough");
      return;
    }

    // Send Firebase Request
    try {
      setError("");
      await signUpEmail(
        emailTextInputRef.current!.value,
        passTextInputRef.current!.value
      );
      await createUserEmail();
      authCtx.setAuth(true);
      navigate("/");
    } catch {
      setError("Failed to create an account");
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      {error !== "" && <ErrorAlert type="error" msg={error} />}
      <div className={classes.input}>
        <IconInput
          placeholder="Name"
          icon={<FaSmileBeam />}
          id="name"
          type="text"
          ref={nameTextInputRef}
        />
      </div>
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
          placeholder="Passsword"
          icon={<FaLock />}
          id="password"
          type="password"
          ref={passTextInputRef}
        />
      </div>
      <div className={classes.input}>
        <IconInput
          placeholder="Confirm Password"
          icon={<FaLock />}
          id="confirmpassword"
          type="password"
          ref={conPassTextInputRef}
        />
      </div>
      <Button
        label={"Submit"}
        color={"pink"}
        onClick={() => {
          handleSubmit();
        }}
      />
    </form>
  );
};

export default SignUpForm;
