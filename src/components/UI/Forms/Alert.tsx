import React from "react";
import classes from "./Alert.module.css";
import { FaExclamationCircle } from "react-icons/fa";

type AppProps = {
  type: "error" | "noti";
  msg: string;
};
const Alert = (props: AppProps) => {
  return (
    <div className={props.type === "error" ? classes.error : classes.noti}>
      <FaExclamationCircle className={classes.excla}/>
      <p>{props.msg}</p>
    </div>
  );
};

export default Alert;
