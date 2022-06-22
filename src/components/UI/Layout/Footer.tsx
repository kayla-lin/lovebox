import React from "react";
import { FaGithub, FaHeart, FaLinkedin } from "react-icons/fa";
import classes from "./Footer.module.css";
const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={`${classes["footer-content"]}`}>
        <div className={classes.created}>
          Created with love by Kayla Lin <FaHeart />
        </div>
        <div className={classes.links}>
          <a
            target="_blank"
            rel="noreferrer"
            href={"https://www.linkedin.com/in/kayla-s-lin/"}
          >
            <FaLinkedin className={classes.link} />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href={"https://github.com/kayla-lin/"}
          >
            <FaGithub className={classes.link} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
