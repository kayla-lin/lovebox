import React from "react";
import PackageManager from "../../components/Dashboard/Packages/Main/PackageManager";
import PackageButtons from "../../components/Dashboard/Packages/Main/PackageButtons";
import classes from "./DashboardScreen.module.css";
import PackageRatio from "../../components/Dashboard/Packages/Main/PackageRatio";
import RecentActivity from "../../components/Dashboard/Packages/Main/RecentActivity";
import PageTitle from "../../components/UI/Texts/PageTitle";

const DashboardScreen = () => {
  return (
    <div className={classes["ps-wrapper"]}>
      <div className={`${classes["ps-content"]} wrapper`}>
        {/* Title */}
        <PageTitle text={"Dashboard"} />
        <div className={classes["db-grid"]}>
          <div className={classes["grid-1"]}>
            {/* Top control package buttons */}
            <PackageButtons />
            {/* Package manaager */}
            <PackageManager />
          </div>
          {/* Package ratio statistic */}
          <div className={classes["grid-2"]}>
            <PackageRatio />
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
