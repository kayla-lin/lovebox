import React, { createContext, useState } from "react";

type AlertContextType = {
  alert: string;
  setAlert: (s: string) => void;
  type: string;
  setType: (s: string) => void;
};

export const AlertContext = createContext<AlertContextType>({
  alert: "",
  setAlert: () => {},
  type: "error",
  setType: () => {},
});

type AppProp = {
  children: React.ReactNode;
};

const AlertContextProvider = (props: AppProp) => {
  const [alert, setAlert] = useState({ text: "", type: "" });

  const setAlertText = (s: string) => {
    setAlert((prevState) => {
      return { ...prevState, text: s };
    });
  };

  const setAlertType = (s: string) => {
    setAlert((prevState) => {
      return { ...prevState, type: s };
    });
  };

  const alertContext = {
    alert: alert.text,
    setAlert: setAlertText,
    setType: setAlertType,
    type: alert.type,
  };

  return (
    <AlertContext.Provider value={alertContext}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertContextProvider;
