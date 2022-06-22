import React, { useContext } from "react";
import { dbDeletePackage } from "../../../../models/editing-package-db";
import Package from "../../../../models/package";
import { AlertContext } from "../../../../store/alert-context";
import classes from "./RecievedPackageOps.module.css";

type AppProps = {
  setOptions: React.Dispatch<React.SetStateAction<boolean>>;
  p: Package;
  closeEntireModal: () => void;
};

const RecievedPackageOps = ({ closeEntireModal, p, setOptions }: AppProps) => {
  // TODO: react portal
  const alertCtx = useContext(AlertContext);

  const handleDeletePackage = async () => {
    await dbDeletePackage(p);
    closeEntireModal();
    alertCtx.setType("noti");
    alertCtx.setAlert("Successfully deleted package " + p.name);
  };

  return (
    <>
      <div className={`${classes.modal} mod-shadow-2`}>
        <div onClick={handleDeletePackage}>Delete this package</div>
      </div>
      <div
        className={classes["modal-bg"]}
        onClick={() => {
          setOptions(false);
        }}
      ></div>
    </>
  );
};

export default RecievedPackageOps;
