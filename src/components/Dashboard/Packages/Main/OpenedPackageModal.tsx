import React, { useEffect, useState, useContext } from "react";
import classes from "./OpenedPackageModal.module.css";
import Package from "../../../../models/package";
import Button from "../../../UI/Layout/Button";
import { FaTimes, FaEdit } from "react-icons/fa";
import {
  dbGetNotes,
  dbUpdateNotes,
  dbDeletePackage,
  dbUpdatePackageName,
} from "../../../../models/editing-package-db";
import { PackageContext } from "../../../../store/package-context";
import ReactDOM from "react-dom";
import ConfirmModal from "../../../UI/Layout/ConfirmModal";
import OPInfoTags from "./OPInfoTags";
import OpenedNoteList from "./OpenedNoteList";
import { hideScroll } from "../../../../models/helper";
import { strReducer } from "../../../../models/helper";
import Loading from "../../../UI/Loading";
import { AlertContext } from "../../../../store/alert-context";

type AppProps = {
  package: Package;
  setOpenedPack: React.Dispatch<React.SetStateAction<Package>>;
};

type openedNoteType = {
  id: string;
  seen: string;
  text: string;
};

type confirmType = {
  deleteNote: boolean;
  deletePackage: boolean;
  changeNote: boolean;
  changePackageName: boolean;
};

let changedNoteInfo: openedNoteType = { id: "", seen: "", text: "" };

const OpenedPackageModal = (props: AppProps) => {
  const [openedPackage, setOpenedPackage] = useState<openedNoteType[]>([]);
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState<confirmType>({
    deleteNote: false,
    deletePackage: false,
    changeNote: false,
    changePackageName: false,
  });
  const [editedText, setEditedText] = useState("");
  const packageCtx = useContext(PackageContext);
  const alertCtx = useContext(AlertContext);

  /* Refresh packages + unopened packages */
  useEffect(() => {
    setLoading(true);
    const getOpenedNotes = async () => {
      // Load packages
      const data = await dbGetNotes(props.package);
      setOpenedPackage(
        data.data()!.note.map((n: openedNoteType) => {
          return { text: n.text, seen: n.seen, id: n.id };
        })
      );
      setLoading(false);
    };
    getOpenedNotes();
  }, []);

  // Sending confirm msg
  const sendConfirmAlert = (s: string) => {
    alertCtx.setType("noti");
    alertCtx.setAlert(s);
  };

  const handleCloseModal = () => {
    props.setOpenedPack(new Package("", "", "", 0, "", "", ""));
    document.querySelector("body")!.style.overflow = "auto";
  };

  /* Delete notes */
  const deleteNote = async (noteId: string) => {
    setConfirm((prevState) => {
      return { ...prevState, deleteNote: false };
    });
    const newArr = openedPackage.filter((n) => n.id !== noteId);
    setOpenedPackage(newArr);
    await dbUpdateNotes(props.package, newArr, changedNoteInfo, "delete");
  };

  const handleDeleteNoteOpen = async (n: openedNoteType) => {
    setConfirm((prevState) => {
      return { ...prevState, deleteNote: true };
    });
    changedNoteInfo.id = n.id;
    changedNoteInfo.text = n.text;
  };

  const handleDeleteNoteConfirm = async () => {
    await deleteNote(changedNoteInfo.id);
    handleDeleteNoteCancel();
    hideScroll();
    sendConfirmAlert("Successfully deleted note!");
  };

  const handleDeleteNoteCancel = async () => {
    setConfirm((prevState) => {
      return { ...prevState, deleteNote: false };
    });
  };

  /* Delete packages */
  const deletePackage = async () => {
    packageCtx.setPackages(
      packageCtx.packages.filter((p) => p.id !== props.package.id)
    );
    await dbDeletePackage(props.package);
  };

  const handleDeletePackageOpen = () => {
    setConfirm((prevState) => {
      return { ...prevState, deletePackage: true };
    });
    hideScroll();
  };

  const handleDeletePackageConfirm = async () => {
    await deletePackage();
    handleDeletePackageCancel();
    handleCloseModal();
    sendConfirmAlert("Successfully deleted box!");
  };

  const handleDeletePackageCancel = () => {
    setConfirm((prevState) => {
      return { ...prevState, deletePackage: false };
    });
  };

  /* Change notes */
  const changeNote = async (changedNote: openedNoteType) => {
    const newArr: openedNoteType[] = openedPackage.map((n) => {
      if (changedNote.id === n.id) {
        n.text = editedText;
      }
      return n;
    });
    setOpenedPackage(newArr);
    await dbUpdateNotes(
      props.package,
      newArr,
      changedNoteInfo,
      "update",
      editedText
    );
    handleChangeNoteCancel();
  };

  const handleChangeNoteOpen = (n: openedNoteType) => {
    setConfirm((prevState) => {
      return { ...prevState, changeNote: true };
    });
    changedNoteInfo.id = n.id;
    changedNoteInfo.text = n.text;
    changedNoteInfo.seen = n.seen;
  };

  const handleChangeNoteConfirm = async () => {
    await changeNote(changedNoteInfo);
    handleChangeNoteCancel();
    sendConfirmAlert("Successfully edited note!");
  };

  const handleChangeNoteCancel = () => {
    setEditedText("");
    setConfirm((prevState) => {
      return { ...prevState, changeNote: false };
    });
  };

  /* Change package name */
  const changePackageName = async () => {
    await dbUpdatePackageName(props.package, editedText);
    handleChangeNoteCancel();
  };

  const handleChangePackageNameOpen = () => {
    setConfirm((prevState) => {
      return { ...prevState, changePackageName: true };
    });
  };

  const handleChangePackageNameConfirm = async () => {
    packageCtx.setPackages(
      packageCtx.packages.map((p) => {
        if (p.id === props.package.id) {
          p.name = editedText;
        }
        return p;
      })
    );
    await changePackageName();
    handleChangePackageNameCancel();
    sendConfirmAlert(`Successfully changed name to ${editedText}!`);
  };

  const handleChangePackageNameCancel = () => {
    setEditedText("");
    setConfirm((prevState) => {
      return { ...prevState, changePackageName: false };
    });
  };

  return ReactDOM.createPortal(
    <>
      <div className={classes.modal}>
        {/* Modals */}
        {confirm.changePackageName && (
          <ConfirmModal
            title={"Edit package name?"}
            onConfirm={handleChangePackageNameConfirm}
            onCancel={handleChangePackageNameCancel}
            textState={editedText}
            textSetState={setEditedText}
            inputType={"input"}
            charLimit={24}
          />
        )}
        {confirm.changeNote && (
          <ConfirmModal
            title={"Edit note?"}
            onConfirm={handleChangeNoteConfirm}
            onCancel={handleChangeNoteCancel}
            textState={editedText}
            textSetState={setEditedText}
            inputType={"textArea"}
            charLimit={280}
          />
        )}
        {confirm.deleteNote && (
          <ConfirmModal
            title={"Delete note?"}
            onConfirm={handleDeleteNoteConfirm}
            onCancel={handleDeleteNoteCancel}
            text={changedNoteInfo.text}
          />
        )}
        {confirm.deletePackage && (
          <ConfirmModal
            title={"Delete package?"}
            onConfirm={handleDeletePackageConfirm}
            onCancel={handleDeletePackageCancel}
            text={props.package.name}
          />
        )}

        {/* Content */}
        <div className={`${classes["modal-content"]}`}>
          {/* Top controls */}
          <FaTimes className={classes.close} onClick={handleCloseModal} />
          <section className={classes["package-control"]}>
            <Button
              label={"Delete package"}
              color={"pink"}
              onClick={handleDeletePackageOpen}
              hadShadow={true}
            />
          </section>

          {/* Top info */}
          <section className={"title-small-3 mod-margin-tb-1"}>
            <h2>{strReducer(props.package.name, 24)}</h2>
            <FaEdit
              className={classes["edit-title"]}
              onClick={handleChangePackageNameOpen}
            />
          </section>

          {/* More info */}
          <OPInfoTags package={props.package} length={openedPackage.length} />

          {/* Edit note list */}
          <section className={classes["edit-notes"]}>
            <section className={"title-small-2 mod-margin-tb-1"}>
              <h2>Edit notes</h2>
            </section>
            {loading ? (
              <Loading />
            ) : (
              <OpenedNoteList
                handleDeleteNoteOpen={handleDeleteNoteOpen}
                handleChangeNoteOpen={handleChangeNoteOpen}
                openedPackage={openedPackage}
              />
            )}
          </section>
        </div>
      </div>
      <div className={classes["modal-bg"]} onClick={handleCloseModal}></div>
    </>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default OpenedPackageModal;
