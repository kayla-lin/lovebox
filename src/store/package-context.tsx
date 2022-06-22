import * as React from "react";
import Package from "../models/package";

export type PackageContextObj = {
  packages: Package[];
  setPackages: React.Dispatch<React.SetStateAction<Package[]>>;
}

export const PackageContext = React.createContext<PackageContextObj>({
  packages: [],
  setPackages: () => {},
});

type AppProp = {
  children: React.ReactNode;
};

const PackageContextProvider = (props: AppProp) => {
  const [packages, setPackages] = React.useState<Package[]>([]);

  const cartContext = {
    packages: packages,
    setPackages: setPackages,
  };

  return (
    <PackageContext.Provider value={cartContext}>
      {props.children}
    </PackageContext.Provider>
  );
};

export default PackageContextProvider;
