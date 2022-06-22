import React from "react";
import classes from "./TextArea.module.css";

type AppProps = {
  name: string;
  placeholder: string;
  ref: React.RefObject<HTMLTextAreaElement>;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void; 
  value: string;
};

const TextArea = React.forwardRef<HTMLTextAreaElement, AppProps>((props, ref) => {
  return (
    <div className={classes.wrapper}>
      <textarea value={props.value} onChange={props.onChange} ref={ref} name={props.name} placeholder={props.placeholder}/>
    </div>
  );
});

export default TextArea;
