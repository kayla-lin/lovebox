import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../store/auth-context";
import Button from "../UI/Layout/Button";
import LogoWithText from "../UI/Layout/LogoWithText";
import classes from "./HomeNav.module.css";

const HomeNav = () => {
  const authCtx = useContext(AuthContext);

  return (
    <nav className={classes.nav}>
      <div>
        <LogoWithText />
      </div>

      <div className={classes["nav-options"]}>
        {!authCtx.auth ? (
          <Link to="/signin">
            <Button label={"Sign in"} color={"pink"} />
          </Link>
        ) : (
          <Link to="/dashboard">
            <Button label={"Dashboard"} color={"pink"} />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default HomeNav;
