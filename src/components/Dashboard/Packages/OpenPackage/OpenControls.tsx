import React, { useContext } from "react";
import { FaEllipsisH } from "react-icons/fa";
import { getUnopenedNoteDB } from "../../../../models/open-package-db";
import Package from "../../../../models/package";
import { AlertContext } from "../../../../store/alert-context";
import Button from "../../../UI/Layout/Button";
import classes from "./OpenControls.module.css";

type AppProps = {
  selectedBox: Package;
  setSelectedBox: React.Dispatch<React.SetStateAction<Package>>;
  toggleNoteModal: () => void;
  toggleBoxModal: () => void;
  animateOpen: (t: string) => void;
  noPackage: boolean;
};

const OpenControls = (props: AppProps) => {
  const alertCtx = useContext(AlertContext);

  const checkNoPackage = () => {
    if (props.noPackage) {
      alertCtx.setType("error");
      alertCtx.setAlert("You have not recieved any boxes to open");
      return true;
    }
    return false;
  };

  const handleOpenNote = async () => {
    if (checkNoPackage()) {
      return;
    }
    if (props.selectedBox.unopenedCount === 0) {
      alertCtx.setType("error");
      alertCtx.setAlert("You do not have any notes to open");
      return;
    }
    try {
      const data = await getUnopenedNoteDB(props.selectedBox);

      // If successful subtract from count
      props.setSelectedBox((prevState) => {
        const newCount = prevState.unopenedCount - 1;
        return { ...prevState, unopenedCount: newCount };
      });

      props.animateOpen(data.text);
    } catch {
      alertCtx.setType("error");
      alertCtx.setAlert("Something went wrong with opening your box");
    }
  };

  const handleOpenViewNotes = () => {
    if (checkNoPackage()) {
      return;
    }
    props.toggleNoteModal();
  };

  const handleOpenEllipse = () => {
    if (checkNoPackage()) {
      return;
    }
    props.toggleBoxModal();
  };

  return (
    <>
      <div className={classes.title}>
        {!props.noPackage && <div className={classes["box-tag"]}>Box:</div>}
        {props.noPackage
          ? "You have recieved no packages"
          : `"${props.selectedBox.name}"`}
        {!props.noPackage && (
          <div className={classes["box-change"]}>
            <FaEllipsisH onClick={handleOpenEllipse} />
          </div>
        )}
      </div>
      <div className={classes.buttons}>
        <div className={classes["open-box-button"]}>
          <Button
            label={`Open box`}
            color={"dark-pink"}
            onClick={handleOpenNote}
          />
          <div className={classes["selected-count"]}>
            {props.noPackage ? 0 : props.selectedBox.unopenedCount}
          </div>
        </div>
        <Button
          label={"View notes"}
          color={"dark-pink"}
          onClick={handleOpenViewNotes}
        />
      </div>
    </>
  );
};

export default OpenControls;
