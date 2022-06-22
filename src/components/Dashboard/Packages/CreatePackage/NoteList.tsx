import React, { useContext } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Note from "../../../../models/note";
import { NoteContext } from "../../../../store/note-context";
import classes from "./NoteList.module.css";

type AppProps = {
  delete: boolean;
  setConfirm?: React.Dispatch<
    React.SetStateAction<{
      delete: boolean;
      edit: boolean;
    }>
  >;
  deleteOpen?: (note: Note) => void;
  editOpen?: (note: Note) => void;
};

const NoteList = (props: AppProps) => {
  const noteCtx = useContext(NoteContext);

  /* No notes addded */
  const emptyPackage = <div className={classes.empty}>No notes created</div>;

  /* Mapping note arr to list items */
  const mappedNotes = noteCtx.notes.map((note) => (
    <div className={classes.item} key={note.id}>
      <li className={"mod-shadow-1 mod-padding-1"}>
        <p className={`${props.delete && "mod-margin-bottom-1"}`}>
          {note.text}
        </p>
        {props.delete && (
          <section className={classes.edit}>
            <FaTrash
              className={classes["edit-item"]}
              onClick={() => {
                props.deleteOpen!(note);
              }}
            />{" "}
            <FaEdit
              className={classes["edit-item"]}
              onClick={() => {
                props.editOpen!(note);
              }}
            />
          </section>
        )}
      </li>
    </div>
  ));

  return (
    <ul
      className={
        props.delete ? `${classes["delete-list"]}` : `${classes["view-list"]}`
      }
    >
      {noteCtx.notes.length > 0 ? mappedNotes : emptyPackage}
    </ul>
  );
};

export default NoteList;
