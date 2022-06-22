import React, { Fragment, useContext, useState } from "react";
import NoteList from "../NoteList";
import PackageSettings from "./PackageSettings";
import { NoteContext } from "../../../../../store/note-context";
import { auth } from "../../../../../firebase-config";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  createPackageSenderDB,
  createPackageReferenceReceiverDB,
  getRecipientUID,
} from "../../../../../models/sending-package-db";
import Alert from "../../../../UI/Forms/Alert";
import classes from "./NoteSender.module.css";
import { generatePushID } from "../../../../../models/helper";
import Button from "../../../../UI/Layout/Button";
import { AlertContext } from "../../../../../store/alert-context";
import PageTitle from "../../../../UI/Texts/PageTitle";

type AppProps = {
  ready: boolean;
  alert: string;
  setReady: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setAlert: React.Dispatch<React.SetStateAction<string>>;
};

type userInfoState = {
  name: string;
  email: string;
  freq: string;
};

const NoteSender = (props: AppProps) => {
  const noteCtx = useContext(NoteContext);
  const [userInfo, setUserInfo] = useState<userInfoState>({
    name: "",
    email: "",
    freq: "daily",
  });
  const navigate = useNavigate();
  const alertCtx = useContext(AlertContext);

  /* Create packages for reciever and sender */
  const handleSendPackage = async () => {
    props.setAlert("");
    if (userInfo.email.trim().length === 0) {
      props.setAlert("Missing name");
      return;
    }
    if (userInfo.email.trim().length === 0) {
      props.setAlert("Missing email");
      return;
    }
    try {
      // Check if recipient has an email
      await fetchSignInMethodsForEmail(auth, userInfo.email);
      props.setLoading(true);
      try {
        // Generate sender and reciever package
        const packageID = generatePushID();
        const recipientUID = await getRecipientUID(userInfo.email);
        await createPackageSenderDB(
          userInfo,
          noteCtx.notes,
          packageID,
          recipientUID
        );
        await createPackageReferenceReceiverDB(
          userInfo,
          noteCtx.notes,
          packageID,
          recipientUID
        );
        // Success!
        navigate("/dashboard");
        alertCtx.setType("noti");
        alertCtx.setAlert("Successfully sent your package");
        noteCtx.removeAllNotes();
        props.setLoading(false);
      } catch {
        // An error has occured when creating the packages
        props.setAlert("Something went wrong when delivering package");
        props.setLoading(false);
      }
    } catch {
      // Recipient does not have an email
      props.setAlert(
        "Recipient's email cannot be found. Do they have an account?"
      );
      props.setLoading(false);
      return;
    }
  };

  const handleBackToCreate = () => {
    props.setReady(false);
  };

  return (
    <Fragment>
      <div className="wrapper">
        {/* Top controls */}
        <PageTitle text={"Love Box Creator"} />
        <div className={classes["top-control"]}>
          <Button
            label={"Return to note editor"}
            onClick={handleBackToCreate}
            color={"dark-pink"}
          />
        </div>
        {/* Submit package form */}
        {props.alert !== "" && <Alert type={"error"} msg={props.alert} />}
        <PackageSettings
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          submitPackage={handleSendPackage}
        />
        {/* List created notes */}
        <section
          className={`${classes["note-review-top"]} title-small-3 mod-margin-tb-2`}
        >
          <h2>Review your notes</h2>
        </section>

        <NoteList delete={false} />
      </div>
    </Fragment>
  );
};
export default NoteSender;
