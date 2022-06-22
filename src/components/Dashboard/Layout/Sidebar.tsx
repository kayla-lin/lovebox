import React, { useState } from "react";
import classes from "./Sidebar.module.css";
import { Link, useLocation } from "react-router-dom";
import {
  FaBars,
  FaBoxOpen,
  FaHome,
  FaPaperPlane,
  FaUserEdit,
} from "react-icons/fa";
import Logo from "../../UI/Layout/Logo";
import LogoWithText from "../../UI/Layout/LogoWithText";
const Sidebar = () => {
  const location = useLocation();
  const [showMobile, setShowMobile] = useState(false);

  const linkArr = [
    {
      icon: <FaHome />,
      path: "/dashboard",
      text: "Dashboard",
      includes: false,
    },
    {
      icon: <FaPaperPlane />,
      path: "/dashboard/add",
      text: "Add",
      includes: true,
    },
    {
      icon: <FaBoxOpen />,
      path: "/dashboard/open",
      text: "Open",
      includes: true,
    },
    {
      icon: <FaUserEdit />,
      path: "/dashboard/settings",
      text: "Settings",
      includes: true,
    },
  ];

  const navLinks = linkArr.map((link) => {
    const cond = link.includes
      ? location.pathname.includes(link.path)
      : location.pathname === link.path;

    return (
      <div
        key={link.text}
        className={`${classes.link} ${cond ? classes.active : ""}`}
      >
        <Link to={link.path}>
          <div className={classes["link-icon"]}>{link.icon}</div>
        </Link>
      </div>
    );
  });

  const mobileNavLinks = linkArr.map((link) => {
    const cond = link.includes
      ? location.pathname.includes(link.path)
      : location.pathname === link.path;

    return (
      <Link
        to={link.path}
        className={`${classes["mobile-link"]} ${
          cond ? classes["mobile-active"] : ""
        }`}
      >
        <div className={classes["mobile-link-icon"]}>{link.icon}</div>
        <div className={classes["mobile-text"]}>{link.text}</div>
      </Link>
    );
  });

  // Disables sidebar for open page
  return (
    <>
      {/* Sidebar */}
      <nav className={classes.sidebar}>
        {/* Logo */}
        <div className={classes.title}>
          <Link to="/">
            <Logo color={"white"} />
          </Link>
        </div>
        {/* Links */}
        <div className={classes.nav}>
          <div className={classes.links}>{navLinks}</div>
        </div>
      </nav>
      {/* Mobile */}
      <nav className={classes["mobile-nav"]}>
        <div className={classes["mobile-top"]}>
          <LogoWithText />{" "}
          <FaBars
            className={classes.burger}
            onClick={() => {
              setShowMobile(!showMobile);
            }}
          />
        </div>
        {showMobile && (
          <div className={classes["mobile-links"]}>{mobileNavLinks}</div>
        )}
      </nav>
    </>
  );
};

export default Sidebar;
