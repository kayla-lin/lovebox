import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import classes from "./OpenedNoteList.module.css";
type openedNoteType = {
  id: string;
  seen: string;
  text: string;
};

type AppProps = {
  handleDeleteNoteOpen: (n: openedNoteType) => void;
  handleChangeNoteOpen: (n: openedNoteType) => void;
  openedPackage: openedNoteType[];
};

const OpenedNoteList = (props: AppProps) => {
  const noteOptions = (n: openedNoteType) => {
    return n.seen.length > 0 ? (
      ""
    ) : (
      <>
        <div className={classes["note-op"]}>
          <FaTrash
            onClick={() => {
              props.handleDeleteNoteOpen(n);
            }}
          />
        </div>
        <div className={classes["note-op"]}>
          <FaEdit
            onClick={() => {
              props.handleChangeNoteOpen(n);
            }}
          />
        </div>
      </>
    );
  };

  const noteList = props.openedPackage.map((n) => {
    return (
      <li key={n.id} className={"mod-shadow-1"}>
        <div>
          <p>{n.text}</p>
          <div className={classes["note-bottom"]}>
            {n.seen !== "" && <div className={classes["seen-msg"]}>VIEWED</div>}
            {noteOptions(n)}
          </div>
        </div>
      </li>
    );
  });
  return <ul className={classes["notes-list"]}>{noteList}</ul>;
};

export default OpenedNoteList;
