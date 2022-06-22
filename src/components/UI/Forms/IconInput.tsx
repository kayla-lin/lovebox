import classes from "./IconInput.module.css";
import React from "react";

type AppProps = {
  type: string;
  id: string;
  icon: React.ReactNode;
  placeholder: string;
  ref: React.RefObject<HTMLInputElement>;
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void;
  value?: string;
  shadow?: boolean;
};

const IconInput = React.forwardRef<HTMLInputElement, AppProps>((props, ref) => {
  return (
    <div className={`${classes.input}`}>
      <i>{props.icon}</i>
      <input
        className={` ${props.shadow !== undefined && "mod-shadow-1"}`}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        type={props.type}
        ref={ref}
        id={props.id}
      />
    </div>
  );
});

export default IconInput;
