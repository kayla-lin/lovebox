import React from "react";
import classes from "./MiddleSquare.module.css";
type AppProps = {
  children: React.ReactNode;
};

const MiddleSquare = (props: AppProps) => {
  return (
    <div className={classes.wrapper}>
      <section>{props.children}</section>
    </div>
  );
};

export default MiddleSquare;
