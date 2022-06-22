import React, { useContext, useEffect, useState } from "react";
import Package from "../../../../models/package";
import { PackageContext } from "../../../../store/package-context";
import classes from "./PackageRatio.module.css";

interface statsPackage {
  openedTotal: number;
  noteTotal: number;
  packTotal: number;
  percent: string;
}

const PackageRatio = () => {
  const [stats, setStat] = useState<statsPackage>({
    openedTotal: 0,
    noteTotal: 0,
    packTotal: 0,
    percent: "0",
  });

  const packageCtx = useContext(PackageContext);
  const noPackageCond =
    packageCtx.packages.length === 0 || stats.openedTotal === 0;
  const style = {
    "--p": `${noPackageCond ? 100 : stats.percent}`,
    "--c": `${noPackageCond ? `rgb(242, 164, 211)` : `rgb(210, 20, 162)`}`,
  } as React.CSSProperties;

  const addPackageToCount = (p: Package) => {
    setStat((prevState) => {
      return {
        ...prevState,
        openedTotal: prevState.openedTotal + p.streak,
        noteTotal: prevState.noteTotal + p.size,
        packTotal: prevState.packTotal + 1,
      };
    });
  };

  useEffect(() => {
    setStat({ openedTotal: 0, noteTotal: 0, packTotal: 0, percent: "0" });
    packageCtx.packages.forEach((p) => {
      addPackageToCount(p);
    });

    setStat((prevState) => {
      return {
        ...prevState,
        percent: ((prevState.openedTotal / prevState.noteTotal) * 100).toFixed(
          1
        ),
      };
    });
  }, [packageCtx.packages]);

  return (
    <div className={`${classes["wrapper"]} mod-white-1 mod-padding-1`}>
      {/* Title */}
      <section className={`title-small-2 mod-padding-bottom-1`}>
        <h2>Sent notes opened</h2>
      </section>
      {/* Graphic */}
      <div className={classes.pies}>
        <div style={style} className={`${classes.pie}`}>
          {packageCtx.packages.length === 0 ? "0%" : `${stats.percent}%`}
        </div>
        <div className={`${classes["pie-bg"]}`}></div>
      </div>
      {/* Key */}
      <div className={classes.legend}>
        <div className={classes.key}></div> {stats.openedTotal} notes /{" "}
        {stats.noteTotal} notes from {stats.packTotal} boxes
      </div>
    </div>
  );
};

export default PackageRatio;
