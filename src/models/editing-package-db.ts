import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import Package from "./package";

export const dbGetNotes = async (p: Package) => {
  const sentPackagesCollectionRef = doc(
    db,
    "users",
    auth.currentUser!.uid,
    "sentPackages",
    p.id,
    "notes",
    "packageNotes"
  );
  const data = await getDoc(sentPackagesCollectionRef);
  return data;
};

type openedPackageType = {
  text: string;
  seen: string;
  id: string;
};

type openedNoteType = {
  id: string;
  seen: string;
  text: string;
};

type actionType = "delete" | "update";

export const dbUpdateNotes = async (
  p: Package,
  openPackage: openedPackageType[],
  changedNote: openedNoteType,
  action: actionType,
  editedText?: string
) => {
  /*
  SENDER
  */

  const sentPackagesNoteCollectionRef = doc(
    db,
    "users",
    auth.currentUser!.uid,
    "sentPackages",
    p.id,
    "notes",
    "packageNotes"
  );

  // Update note for sender
  await updateDoc(sentPackagesNoteCollectionRef, { note: openPackage });

  const sentPackagesCollectionRef = doc(
    db,
    "users",
    auth.currentUser!.uid,
    "sentPackages",
    p.id
  );

  // Update size for sender
  await updateDoc(sentPackagesCollectionRef, {
    size: openPackage.length,
  });

  const recievedPackagesNoteRef = doc(
    db,
    "users",
    p.partnerUID,
    "recievedPackages",
    p.id,
    "notes",
    changedNote.id
  );

  /*
  RECIEVER
  */

  // Update note for reciever
  if (action === "update") {
    await updateDoc(recievedPackagesNoteRef, { text: editedText });
  } else if (action === "delete") {
    // Update size and delete doc
    const recievedPackagesCollectionRef = doc(
      db,
      "users",
      p.partnerUID,
      "recievedPackages",
      p.id
    );
    await updateDoc(recievedPackagesCollectionRef, {
      size: openPackage.length,
    });
    await deleteDoc(recievedPackagesNoteRef);
  }
};

export const dbDeletePackage = async (p: Package) => {
  const sentPackagesCollectionRef = doc(
    db,
    "users",
    auth.currentUser!.uid,
    "sentPackages",
    p.id
  );

  // Delete package for sender
  await deleteDoc(sentPackagesCollectionRef);

  const recievedPackagesCollectionRef = doc(
    db,
    "users",
    p.partnerUID,
    "recievedPackages",
    p.id
  );

  // Delete package for reciever
  await deleteDoc(recievedPackagesCollectionRef);
};

export const dbUpdatePackageName = async (p: Package, newName: string) => {
  const sentPackagesCollectionRef = doc(
    db,
    "users",
    auth.currentUser!.uid,
    "sentPackages",
    p.id
  );

  // Update note for sender
  await updateDoc(sentPackagesCollectionRef, { name: newName });

  const recievedPackagesCollectionRef = doc(
    db,
    "users",
    p.partnerUID,
    "recievedPackages",
    p.id
  );

  // Update note for reciever
  await updateDoc(recievedPackagesCollectionRef, { name: newName });
};
