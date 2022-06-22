import classes from "./Input.module.css";
import React from "react";

type AppProps = {
  type: string;
  id?: string;
  placeholder: string;
  ref?: React.RefObject<HTMLInputElement>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  shadow?: boolean;
};

const Input = React.forwardRef<HTMLInputElement, AppProps>((props, ref) => {
  return (
    <div className={`${classes.input}`}>
      <input
        className={` ${props.shadow !== undefined && "mod-shadow-1"}`}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        type={props.type}
        ref={ref}
        id={props.id}
      />
    </div>
  );
});

export default Input;
