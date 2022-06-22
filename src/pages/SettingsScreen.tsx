import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/UI/Layout/Button";
import { auth } from "../firebase-config";
import { AuthContext } from "../store/auth-context";
import classes from "./SettingsScreen.module.css";

const SettingsScreen = () => {
  const authCtx = useContext(AuthContext);
  let navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    localStorage.clear();
    authCtx.setAuth(false);
    navigate("/");
  };

  return (
    <div className={"wrapper"}>
      <div className={"title-large"}>
        <h1>Account</h1>
        <section className={classes["logout"]}>
          <div className={classes['logout-title']}>
            <h2>Sign out</h2>
            <p>Sign out of your Lovebox account</p>
          </div>
          <div className={classes['logout-button']}>
            <Button
              label={"Logout"}
              color={"dark-pink"}
              onClick={handleLogout}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsScreen;
