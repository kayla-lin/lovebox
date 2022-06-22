import {
  signInWithPopup,
  GoogleAuthProvider,
  getAdditionalUserInfo,
} from "firebase/auth";
import { NavigateFunction } from "react-router-dom";
import { db, auth } from "../../firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { AuthContextObj } from "../../store/auth-context";

const createUserGoogle = async () => {
  await setDoc(doc(db, "users", auth.currentUser!.uid), {
    name: auth.currentUser!.displayName,
    email: auth.currentUser!.email,
    uid: auth.currentUser!.uid,
  });
};

export const signUpInGoogle = async (
  navigate: NavigateFunction,
  authCtx: AuthContextObj
) => {
  const provider = new GoogleAuthProvider();
  try {
    const usercred = await signInWithPopup(auth, provider);
    authCtx.setAuth(true);
    navigate("/dashboard");
    if (getAdditionalUserInfo(usercred)?.isNewUser) {
      await createUserGoogle();
    }
  } catch {}
};
