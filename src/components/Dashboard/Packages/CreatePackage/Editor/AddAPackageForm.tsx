import React, { useContext, useState } from "react";
import TextArea from "../../../../UI/Forms/TextArea";
import classes from "./AddAPackageForm.module.css";
import { NoteContext } from "../../../../../store/note-context";
import Note from "../../../../../models/note";
import Button from "../../../../UI/Layout/Button";

type AppProps = {
  setAlert: React.Dispatch<React.SetStateAction<string>>;
}

const AddAPackageForm = (props: AppProps) => {
  const noteCtx = useContext(NoteContext);
  const [noteText, setNoteText] = useState("");

  const handleTextEdit = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteText(event.currentTarget.value);
  };

  const handleSubmit = () => {
    if (noteCtx.notes.length >= 50) {
      props.setAlert('You are past the 50 note limit per package!');
      return;
    }
    if (noteText.length === 0) {
      props.setAlert("Note is empty! Please add some text.");
      return;
    }
    if (noteText.length > 280) {
      props.setAlert("Note is too long.");
      return;
    }
    const newNote = new Note(noteText, Date.now().toString());
    noteCtx.addNote(newNote);
    setNoteText("");
  };

  return (
    <form>
      <TextArea
        value={noteText}
        onChange={handleTextEdit}
        name="packageform"
        placeholder="Start typing your notes"
      />
      <div className={`${classes["note-helper"]}`}>
        <span
          className={`${classes["char-count"]} ${
            noteText.length > 280 ? classes.error : ""
          }`}
        >
          {noteText.length} / 280 characters
        </span>
        <Button
          onClick={() => {
            handleSubmit();
          }}
          label={"Add note"}
          color={"dark-pink"}
        />
      </div>
    </form>
  );
};

export default AddAPackageForm;
