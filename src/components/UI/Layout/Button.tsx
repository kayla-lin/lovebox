import React from "react";
import classes from "./Button.module.css";
type AppProps = {
  label: string;
  onClick?: () => void;
  color: "blue" | "pink" | 'dark-blue' | 'gradient' | 'dark-pink';
  isDisabled?: boolean;
  hadShadow?: boolean;
};



const Button = (props: AppProps) => {
  const shadow = props.hadShadow && 'mod-shadow-1';

  return (
    <div className={classes.wrapper}>
      <button
        onClick={props.onClick}
        type="button"
        disabled={props.isDisabled}
        className={`${classes.button} ${classes[props.color]} ${shadow}`}
      >
        {props.label}
      </button>
    </div>
  );
};

export default Button;
