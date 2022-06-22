import React from "react";
import classes from "./Logo.module.css";

type AppProps = {
  color?: string;
};

const Logo = (props: AppProps) => {
  return (
    <div className={classes.logo}>
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10 0C4.47715 0 0 4.47715 0 10V34C0 39.5228 4.47715 44 10 44H34C39.5228 44 44 39.5228 44 34V10C44 4.47715 39.5228 0 34 0H10ZM33.9993 14.8197C32.6967 10.649 25.6373 7.42152 21.6 14.8197V35.0857C27.8769 30.7777 36.3473 22.3376 33.9993 14.8197ZM9.20071 14.8197C10.5033 10.649 17.5627 7.42152 21.6 14.8197V35.0857C15.3231 30.7777 6.85271 22.3376 9.20071 14.8197Z"
          fill={`${props.color === undefined ? 'FF56C1' : props.color}`}
        />
      </svg>
    </div>
  );
};

export default Logo;
