import React, { useEffect } from "react";
import Package from "../../../../models/package";
import ModalContent from "../../../UI/Layout/ModalContent";
import classes from "./ViewNoteModal.module.css";

type AppProps = {
  selectedBox: Package;
  refreshRecievedPackages: () => Promise<Package[]>;
  toggleNoteModal: () => void;
};

const ViewNoteModal = ({
  selectedBox,
  refreshRecievedPackages,
  toggleNoteModal,
}: AppProps) => {
  const handleClose = () => {
    toggleNoteModal();
  };

  useEffect(() => {
    const getSeenNotes = async () => {
      await refreshRecievedPackages();
    };
    getSeenNotes();
  }, []);

  const seenNotesList = selectedBox.seen.map((n, i) => (
    <li className={`${classes["note-block"]} mod-shadow-1`} key={i}>
      {n}
    </li>
  ));

  return (
    <ModalContent handleClose={handleClose}>
      <div>
        <div className={`${classes.title} title-small-3 mod-margin-tb-1`}>
          <h2>{selectedBox.name}</h2>
          <p className={classes.notes}>
            {selectedBox.streak} / {selectedBox.size} notes
          </p>
        </div>
        <ul className={classes.list}>{seenNotesList}</ul>
      </div>
    </ModalContent>
  );
};

export default ViewNoteModal;
