import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "../firebase-config";

export type AuthContextObj = {
  auth: boolean;
  setAuth: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

const authCtxDefaultValue: AuthContextObj = {
  auth: false,
  setAuth: (state) => {},
  loading: true,
  setLoading: (state) => {},
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContext =
  React.createContext<AuthContextObj>(authCtxDefaultValue);

type AppProps = {
  children?: React.ReactNode;
};

const AuthContextProvider = (props: AppProps) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const contextValue: AuthContextObj = {
    auth: isAuth,
    setAuth: setIsAuth,
    loading: isLoading,
    setLoading: setIsLoading,
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setIsLoading(false);
      setIsAuth(!!user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={contextValue}>
      {!isLoading && props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
