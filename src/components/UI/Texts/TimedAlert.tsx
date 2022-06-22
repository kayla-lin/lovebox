import React, { useContext, useEffect, useState } from "react";
import { AlertContext } from "../../../store/alert-context";
import Alert from "../Forms/Alert";
import classes from "./TimedAlert.module.css";

interface AppProps {
  float?: boolean;
}

const TimedAlert = (props: AppProps) => {
  const [show, setShow] = useState(false);
  const alertCtx = useContext(AlertContext);

  useEffect(() => {
    if (alertCtx.alert === "") {
      return;
    }
    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
      alertCtx.setAlert("");
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [alertCtx]);

  return (
    <>
      {show && (
        <div className={`${props.float && classes["float-wrapper"]}`}>
          <div
            className={`${classes.alert} ${
              props.float && classes.float
            } mod-margin-tb-1`}
          >
            <Alert
              type={`${alertCtx.type === "noti" ? "noti" : "error"}`}
              msg={alertCtx.alert}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default TimedAlert;
