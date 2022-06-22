import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAsM_DgLzaRkZbpzHXKPBPAr91AKhyH7CI",
  authDomain: "aboutu-5435b.firebaseapp.com",
  projectId: "aboutu-5435b",
  storageBucket: "aboutu-5435b.appspot.com",
  messagingSenderId: "144538692762",
  appId: "1:144538692762:web:600ab1e2824fe6b59e4323",
  measurementId: "G-8M0RRR57E4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();