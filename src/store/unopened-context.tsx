import React, { useState } from "react";
import Package from "../models/package";

export type UnopenedContextObj = {
  packages: Package[];
  setPackages: React.Dispatch<React.SetStateAction<Package[]>>;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

export const UnopenedContext = React.createContext<UnopenedContextObj>({
  packages: [],
  setPackages: () => {},
  count: 0,
  setCount: () => {},
});

type AppProp = {
  children: React.ReactNode;
};

const UnopenedContextProvider = (props: AppProp) => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [count, setCount] = useState(0);

  const cartContext = {
    packages: packages,
    setPackages: setPackages,
    count: count,
    setCount: setCount,
  };

  return (
    <UnopenedContext.Provider value={cartContext}>
      {props.children}
    </UnopenedContext.Provider>
  );
};

export default UnopenedContextProvider;
