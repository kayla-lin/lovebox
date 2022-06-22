import React from "react";
import { FaTimes } from "react-icons/fa";
import classes from "./ModalContent.module.css";

type AppProps = {
  children: React.ReactNode;
  handleClose: () => void;
  noColor?: boolean;
};

const ModalContent = ({
  noColor,
  children,
  handleClose,
}: AppProps): JSX.Element => {
  return (
    <>
      <div className={`${classes["modal-content"]} mod-padding-1`}>
        {/* Top controls */}
        <FaTimes className={classes.close} onClick={handleClose} />
        {children}
      </div>
      <div
        className={`${classes["modal-bg"]} ${
          !noColor && classes["modal-bg-color"]
        }`}
        onClick={handleClose}
      ></div>
    </>
  );
};

export default ModalContent;
