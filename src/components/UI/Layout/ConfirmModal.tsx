import React, { useState } from "react";
import ReactDOM from "react-dom";
import Alert from "../Forms/Alert";
import Input from "../Forms/Input";
import TextArea from "../Forms/TextArea";
import Button from "./Button";
import classes from "./ConfirmModal.module.css";

type AppProps = {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  inputType?: "input" | "textArea";
  text?: string;
  textState?: string;
  textSetState?: React.Dispatch<React.SetStateAction<string>>;
  charLimit?: number;
};

const ConfirmModal = (props: AppProps) => {
  const [alert, setAlert] = useState("");

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.textSetState!(e.currentTarget.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.textSetState!(e.currentTarget.value);
  };

  const charLimit = props.charLimit !== undefined && (
    <div className={classes["char-limit"]}>
      {props.textState!.length} / {props.charLimit} characters
    </div>
  );

  const input = props.inputType !== undefined &&
    props.inputType === "input" && (
      <div>
        <Input
          type={"text"}
          value={props.textState}
          onChange={handleInputChange}
          id={"modal-input"}
          placeholder={"Enter name"}
        />
        {charLimit}
      </div>
    );

  const textArea = props.inputType !== undefined &&
    props.inputType === "textArea" && (
      <div className={classes["text-area"]}>
        <TextArea
          name={""}
          placeholder={""}
          onChange={handleTextAreaChange}
          value={props.textState!}
        />
        {charLimit}
      </div>
    );

  const textConfirm = props.text !== undefined && (
    <div className={classes["text-confirm"]}>
      <p>{props.text}</p>
    </div>
  );

  const handleConfirm = () => {
    if (props.charLimit !== undefined) {
      if (props.textState!.length > props.charLimit) {
        setAlert(`The character limit is ${props.charLimit}`);
        return;
      }
    }
    props.onConfirm();
  };

  return ReactDOM.createPortal(
    <>
      <div className={classes["modal-content"]}>
        {alert !== "" && <Alert type={"error"} msg={alert} />}
        <div className={`${classes.title} title-small-2`}>
          <h2>{props.title}</h2>
        </div>
        {textArea}
        {input}
        {textConfirm}
        <section className={classes.buttons}>
          <div className={classes.button}>
            <Button
              onClick={handleConfirm}
              label={"Confirm"}
              color={"dark-pink"}
            />
          </div>
          <div className={classes.button}>
            <Button
              onClick={props.onCancel}
              label={"Cancel"}
              color={"dark-pink"}
            />
          </div>
        </section>
      </div>

      <div className={classes["modal-bg"]} onClick={props.onCancel}></div>
    </>,
    document.getElementById("confirm-modal") as Element
  );
};

export default ConfirmModal;
