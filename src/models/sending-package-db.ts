import { auth, db } from "../firebase-config";
import {
  setDoc,
  doc,
  query,
  where,
  getDocs,
  collection,
  limit,
  orderBy,
} from "firebase/firestore";
import Note from "./note";

type userInfoState = {
  name: string;
  email: string;
  freq: string;
};

// Get packages
export const getPackagesDB = async () => {
  const sentPackagesCollectionRef = collection(
    db,
    "users",
    auth.currentUser!.uid,
    "sentPackages"
  );
  const q = query(sentPackagesCollectionRef, orderBy("name"));
  const data = await getDocs(q);
  return data;
};

// Get recipient UID
export const getRecipientUID = async (name: string) => {
  const q = query(
    collection(db, "users"),
    where("email", "==", name),
    limit(1)
  );
  const querySnapshot = await getDocs(q);
  let recieverUID: string = "";
  querySnapshot.forEach((doc) => {
    recieverUID = doc.id;
  });
  return recieverUID;
};

// Create package for reciever
export const createPackageReferenceReceiverDB = async (
  userInfo: userInfoState,
  notes: Note[],
  packageID: string,
  recieverUID: string
) => {
  const createdPackageDocRef = doc(
    db,
    "users",
    recieverUID,
    "recievedPackages",
    packageID
  );

  // Creating package document
  await setDoc(createdPackageDocRef, {
    name: userInfo.name,
    lastOpened: "never",
    sender: auth.currentUser!.email,
    senderUID: auth.currentUser!.uid,
    id: packageID,
    freq: userInfo.freq,
    openCount: 0,
    size: notes.length,
    seen: [],
  });

  // Creating separate note docs for sender
  notes.map(async (note) => {
    const createdNotesDocRef = doc(
      db,
      "users",
      recieverUID,
      "recievedPackages",
      packageID,
      "notes",
      note.id
    );
    await setDoc(createdNotesDocRef, {
      text: note.text,
      id: note.id,
      seen: "",
    });
  });
};

// Create package for sender
export const createPackageSenderDB = async (
  userInfo: userInfoState,
  notes: Note[],
  packageID: string,
  recieverUID: string
) => {
  const createdPackageDocRef = doc(
    db,
    "users",
    auth.currentUser!.uid,
    "sentPackages",
    packageID
  );

  // Create package document
  await setDoc(createdPackageDocRef, {
    name: userInfo.name,
    recipient: userInfo.email,
    recipientUID: recieverUID,
    freq: userInfo.freq,
    lastOpened: "never",
    id: packageID,
    size: notes.length,
    openCount: 0,
  });

  const createdNotesDocRef = doc(
    db,
    "users",
    auth.currentUser!.uid,
    "sentPackages",
    packageID,
    "notes",
    "packageNotes"
  );

  const noteObj: { text: string; id: string; seen: string }[] = notes.map(
    (note) => {
      return { text: note.text, id: note.id, seen: "" };
    }
  );

  // Creating one note array for sender
  await setDoc(createdNotesDocRef, {
    note: noteObj,
  });

};
