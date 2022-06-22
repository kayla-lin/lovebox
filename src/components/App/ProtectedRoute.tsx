import { Navigate } from "react-router-dom";
import { useAuth } from "../../store/auth-context"; 
export type ProtectedRouteProps = {
  isAuth: boolean;
  authenticationPath: string;
  outlet: JSX.Element;
};

export default function ProtectedRoute({isAuth,
  authenticationPath,
  outlet,
}: ProtectedRouteProps) {

  const { auth } = useAuth();
  
  if (auth) {
    return outlet;
  } else {
    return <Navigate to={{ pathname: authenticationPath }} />;
  }
}
