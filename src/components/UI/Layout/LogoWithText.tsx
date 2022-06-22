import React from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import classes from "./LogoWithText.module.css";

const LogoWithText = () => {
  return (
    <Link to="/" className={classes.logo}>
      <h2>Lovebox</h2>
    </Link>
  );
};

export default LogoWithText;
