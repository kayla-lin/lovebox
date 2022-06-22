import React from "react";
import classes from "./PageTitle.module.css";

type AppProps = {
  text: string;
};

const PageTitle = ({ text }: AppProps) => {
  return (
    <div className={`${classes.title} mod-margin-bottom-1`}>
      <h1>{text}</h1>
    </div>
  );
};

export default PageTitle;
