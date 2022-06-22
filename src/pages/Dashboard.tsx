import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "../components/Dashboard/Layout/Sidebar";
import classes from "./Dashboard.module.css";
import PackagesAdd from "./packages/PackagesAdd";
import NoteContextProvider from "../store/note-context";
import PackageContextProvider from "../store/package-context";
import UnopenedContextProvider from "../store/unopened-context";
import PackagesOpen from "./packages/PackagesOpen";
import SettingsScreen from "./SettingsScreen";
import DashboardScreen from "./packages/DashboardScreen";
import AlertContextProvider from "../store/alert-context";
import TimedAlert from "../components/UI/Texts/TimedAlert";

const Dashboard = () => {
  const location = useLocation();
  const home = location.pathname === "/dashboard";
  return (
    <AlertContextProvider>
      <UnopenedContextProvider>
        <PackageContextProvider>
          <NoteContextProvider>
            <Sidebar />
            <div className={classes["left-move"]}>
              <TimedAlert float={true} />
              <Routes>
                <Route path="add/*" element={<PackagesAdd />} />
                <Route path="open/*" element={<PackagesOpen />} />
                <Route path="settings/*" element={<SettingsScreen />} />
              </Routes>
              {home && <DashboardScreen />}
            </div>
          </NoteContextProvider>
        </PackageContextProvider>
      </UnopenedContextProvider>
    </AlertContextProvider>
  );
};

export default Dashboard;
