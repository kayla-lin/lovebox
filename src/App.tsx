import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AuthContextProvider from "./store/auth-context";
import ProtectedRoute from "./components/App/ProtectedRoute";
import { ProtectedRouteProps } from "./components/App/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import { AuthContext } from "./store/auth-context";
import Footer from "./components/UI/Layout/Footer";

function App() {
  const authCtx = useContext(AuthContext);

  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, "outlet"> = {
    isAuth: !!authCtx.auth,
    authenticationPath: "/signin",
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content-wrapper">
          <AuthContextProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route
                  path="/dashboard/*"
                  element={
                    <ProtectedRoute
                      {...defaultProtectedRouteProps}
                      outlet={<Dashboard />}
                    />
                  }
                />
              </Routes>
            </Router>
          </AuthContextProvider>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
