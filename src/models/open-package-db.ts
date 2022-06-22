import { auth, db } from "../firebase-config";
import {
  setDoc,
  doc,
  query,
  where,
  getDocs,
  collection,
  limit,
  QueryDocumentSnapshot,
  DocumentData,
  updateDoc,
  serverTimestamp,
  increment,
  getDoc,
  arrayUnion,
} from "firebase/firestore";
import Note from "./note";
import Package from "./package";

// Get unopened packages
export const getUnopenedPackageDB = async () => {
  const sentPackagesCollectionRef = collection(
    db,
    "users",
    auth.currentUser!.uid,
    "recievedPackages"
  );
  const q = query(sentPackagesCollectionRef);
  const data = await getDocs(q);
  return data;
};

// Get unopened package count
export const getUnopenedPackageCount = async () => {
  const data = await getUnopenedPackageDB();
  let count = calculateUnopened(data.docs);
  return count;
};

// Calculate unopened packages total
export const calculateUnopened = (
  data: QueryDocumentSnapshot<DocumentData>[]
) => {
  let count = 0;
  data.forEach((p) => {
    count += returnNoteCount(p.data());
  });
  return count;
};

const returnNoteCount = (p: DocumentData) => {
  // Check for packages 'all at once'
  if (p.freq === "all") {
    return p.size - p.openCount;
  }
  // Check for packages 'daily'
  if (p.freq === "daily") {
    // If size 0, no notes available
    if (p.size === 0) {
      return 0;
    }
    if (p.openCount - p.size === 0) {
      return 0;
    }

    // If last seen greater than 24 hours ago
    if (p.lastOpened === "never" || dayGreater(p.lastOpened.seconds)) {
      return 1;
    }
  }
  return 0;
};

// Helper method for calculating if package opened more than a day ago
export const dayGreater = (createdAt: number) => {
  const now = new Date().getTime() / 1000;
  if (now - createdAt > 84000) {
    return true;
  }
  return false;
};

// Return array of packages
export const getUnopenedPackageArray = (
  data: QueryDocumentSnapshot<DocumentData>[]
) => {
  const newArr = data.map((doc) => {
    return new Package(
      doc.data().name,
      doc.data().sender,
      doc.data().senderUID,
      doc.data().openCount,
      doc.data().lastOpened.seconds,
      doc.id,
      doc.data().freq,
      doc.data().size,
      returnNoteCount(doc.data()),
      doc.data().seen
    );
  });
  // Order by most number of unopened notes
  newArr.sort((a, b) => b.unopenedCount - a.unopenedCount);
  return newArr;
};

// Get unopened note
export const getUnopenedNoteDB = async (p: Package) => {
  /*
  Reciever
  */

  const recievedNoteCollectionRef = collection(
    db,
    "users",
    auth.currentUser!.uid,
    "recievedPackages",
    p.id,
    "notes"
  );

  // Get server timestamp
  const seenTime = serverTimestamp();

  // Get an unseen note
  const qNoteR = query(
    recievedNoteCollectionRef,
    where("seen", "==", ""),
    limit(1)
  );
  const dataR = await getDocs(qNoteR);
  const noteDocR = dataR.docs[0];

  // Update seen for note doc for reciever
  await updateDoc(noteDocR.ref, { seen: seenTime });

  const recievedPackageCollectionRef = doc(
    db,
    "users",
    auth.currentUser!.uid,
    "recievedPackages",
    p.id
  );

  // Update last opened package for reciever
  await updateDoc(recievedPackageCollectionRef, {
    lastOpened: seenTime,
    openCount: increment(1),
    seen: arrayUnion(noteDocR.data().text),
  });

  /*
  SENDER
  */

  const sentPackageCollectionRef = doc(
    db,
    "users",
    p.partnerUID,
    "sentPackages",
    p.id
  );

  // Update last opened for sender
  await updateDoc(sentPackageCollectionRef, {
    lastOpened: seenTime,
    openCount: increment(1),
  });

  const sentPackageNoteCollectionRef = doc(
    db,
    "users",
    p.partnerUID,
    "sentPackages",
    p.id,
    "notes",
    "packageNotes"
  );

  // Update seen for note doc for sender
  const dataS = await getDoc(sentPackageNoteCollectionRef);
  const newArr = dataS.data()!.note.map((n: Note) => {
    if (noteDocR.data().id === n.id) {
      return { text: n.text, seen: "yes", id: n.id };
    }
    return { text: n.text, seen: n.seen, id: n.id };
  });
  await updateDoc(sentPackageNoteCollectionRef, { note: newArr });

  // Update activity for sender
  const sentPackageActivityCollectionRef = doc(
    db,
    "users",
    p.partnerUID,
    "activity",
    "packageActivity"
  );

  // See if activity exists
  try {
    const dataA = await getDoc(sentPackageActivityCollectionRef);
    const actArr = [...dataA.data()!.activity];
    if (dataA.data()!.activity.length >= 5) {
      actArr.shift();
    }
    actArr.push({
      user: auth.currentUser!.email,
      event: "Opened note",
      package: p.name,
    });
    await setDoc(sentPackageActivityCollectionRef, { activity: actArr });
  } catch {
    // If not create activity collection for user
    await setDoc(sentPackageActivityCollectionRef, {
      activity: [
        {
          user: auth.currentUser!.email,
          event: "opened note",
          package: p.name,
        },
      ],
    });
  }

  // Return's recipient's opened note
  return noteDocR.data();
};


interface ActivityType {
  user: string;
  event: string;
  package: string;
}

// Get activity
export const getActivityArr = async () => {
  const sentPackageActivityCollectionRef = doc(
    db,
    "users",
    auth.currentUser!.uid,
    "activity",
    "packageActivity"
  );
  const dataA = await getDoc(sentPackageActivityCollectionRef);
  const actArr = dataA.data()!.activity.map((a : ActivityType) => {
    return { user: a.user, event: a.event, package: a.package };
  });
  return actArr;
};
