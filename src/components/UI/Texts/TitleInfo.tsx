import React from "react";
import classes from "./TitleInfo.module.css";
import Button from "../Layout/Button";

type PackageTitleInfoProps = {
  title: string;
  desc: string;
  buttonText?: string;
  buttonValid?: boolean;
  size: 'large' | 'medium';
  buttonAction?: () => void;
};
const TitleInfo = (props: PackageTitleInfoProps) => {
  return (
    <div className={classes["top-info"]}>
      <div className={props.size === 'large' ? classes.large : classes.med}>
        <h1>{props.title}</h1>
        <p>{props.desc}</p>
      </div>
      {props.buttonText !== undefined && (
        <div className={classes.button}>
          <Button
            color="pink"
            label={props.buttonText}
            onClick={props.buttonAction}
            isDisabled={!props.buttonValid}
          />
        </div>
      )}
    </div>
  );
};

export default TitleInfo;
