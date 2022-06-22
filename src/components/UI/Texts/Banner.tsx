import React from "react";
import { FaHeart } from "react-icons/fa";
import classes from "./Banner.module.css";

type AppProps = {
  title: string;
  desc: string;
};

const Banner = (props: AppProps) => {
  return (
    <div className={`${classes.banner} mod-shadow-1`}>
      <div className={classes.wrapper}>
        <h1 className={classes.title}>
          {props.title}
          <FaHeart className={classes.heart}/>
        </h1>
        <p>{props.desc}</p>
      </div>
    </div>
  );
};

export default Banner;
