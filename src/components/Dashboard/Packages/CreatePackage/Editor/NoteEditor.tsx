import React, { Fragment, useContext, useState } from "react";
import NoteList from "../NoteList";
import AddAPackageForm from "./AddAPackageForm";
import { NoteContext } from "../../../../../store/note-context";
import Button from "../../../../UI/Layout/Button";
import Alert from "../../../../UI/Forms/Alert";
import classes from "./NoteEditor.module.css";
import ConfirmModal from "../../../../UI/Layout/ConfirmModal";
import Note from "../../../../../models/note";
import { hideScroll, showScroll } from "../../../../../models/helper";
import PageTitle from "../../../../UI/Texts/PageTitle";

type AppProps = {
  alert: string;
  setAlert: React.Dispatch<React.SetStateAction<string>>;
  setReady: React.Dispatch<React.SetStateAction<boolean>>;
};

type confirmType = {
  delete: boolean;
  edit: boolean;
};

const NoteEditor = (props: AppProps) => {
  const noteCtx = useContext(NoteContext);
  const [confirm, setConfirm] = useState<confirmType>({
    delete: false,
    edit: false,
  });
  const [editedNote, setEditedNote] = useState<Note | undefined>(undefined);
  const [editedText, setEditedText] = useState("");

  /* Send package button */
  const handleCreatePackage = () => {
    if (noteCtx.notes.length === 0) {
      props.setAlert("Add atleast 1 note to be able to create a package");
      return;
    }
    props.setReady(true);
  };

  /* Delete modal */
  const handleDeleteOpen = (note: Note) => {
    setConfirm((prevState) => {
      return { ...prevState, delete: true };
    });
    setEditedNote(note);
    hideScroll();
  };

  const handleDeleteConfirm = () => {
    noteCtx.removeNote(editedNote!);
    handleDeleteCancel();
  };

  const handleDeleteCancel = () => {
    setConfirm((prevState) => {
      return { ...prevState, delete: false };
    });
    showScroll();
  };

  /* Edit modal */
  const handleEditOpen = (note: Note) => {
    setConfirm((prevState) => {
      return { ...prevState, edit: true };
    });
    setEditedText("");
    setEditedNote(note);
    hideScroll();
  };

  const handleEditConfirm = () => {
    const newNote = new Note(editedText, editedNote!.id);
    noteCtx.editNote(newNote);
    console.log(noteCtx.notes);
    handleEditCancel();
  };

  const handleEditCancel = () => {
    setConfirm((prevState) => {
      return { ...prevState, edit: false };
    });
    showScroll();
  };

  return (
    <Fragment>
      {/* Modals */}
      {confirm.delete && (
        <ConfirmModal
          title={"Delete note?"}
          text={editedNote!.text}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
      {confirm.edit && (
        <ConfirmModal
          title={"Edit note?"}
          textState={editedText}
          textSetState={setEditedText}
          onConfirm={handleEditConfirm}
          onCancel={handleEditCancel}
          inputType={"textArea"}
          charLimit={280}
        />
      )}
      <div className={"wrapper"}>
        {props.alert !== "" && <Alert type={"error"} msg={props.alert} />}
        {/* Title */}
        <PageTitle text={"Love Box Creator"} />
        {/* Modals */}
        <section className={classes["top-control"]}>
          <div className={"mod-margin-bottom-1"}>
            <Button
              onClick={handleCreatePackage}
              label={"Finished editing"}
              color={"pink"}
              hadShadow={true}
            />
          </div>
        </section>

        {/* Package editor */}
        <section className={"mod-white-1 mod-padding-2"}>
          <section className={`title-small-2 mod-margin-bottom-1`}>
            <h2>Note editor</h2>
          </section>

          <AddAPackageForm setAlert={props.setAlert} />
        </section>

        {/* Created notes list */}
        <div className={`mod-margin-tb-1`}>
          <section className={`title-small-3`}>
            <h2>Created notes</h2>
            <div className={classes["note-length"]}>
              {noteCtx.notes.length} / 50 notes
            </div>
          </section>
        </div>
        <NoteList
          editOpen={handleEditOpen}
          deleteOpen={handleDeleteOpen}
          setConfirm={setConfirm}
          delete={true}
        />
      </div>
    </Fragment>
  );
};

export default NoteEditor;
