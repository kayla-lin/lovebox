import React from "react";
import classes from "./ToggleInput.module.css";

type AppProps = {
  values: { value: string; text: string }[];
  handleSelect: (event: React.FormEvent<HTMLSelectElement>) => void;
};

const DescToggleInput = (props: AppProps) => {
  const mappedDropDown = props.values.map((v) => (
    <option key={v.value} value={v.value}>
      {v.text}
    </option>
  ));

  return (
    <select
      onChange={props.handleSelect}
      className={classes.select}
      name="frequency"
      id="frequency"
    >
      {mappedDropDown}
    </select>
  );
};

export default DescToggleInput;
