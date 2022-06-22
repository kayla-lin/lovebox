import React, { useEffect, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { convertSecondsToTime, strReducer } from "../../../../models/helper";
import Package from "../../../../models/package";
import classes from "./RecievedPackageItem.module.css";
import RecievedPackageOps from "./RecievedPackageOps";

type AppProps = {
  p: Package;
  selectedBox: Package;
  setSelectedBox: React.Dispatch<React.SetStateAction<Package>>;
  time: number;
  closeEntireModal: () => void,
};

const RecievedPackageItem = (props: AppProps): JSX.Element => {
  const { p, selectedBox, time, setSelectedBox } = props;
  const [count, setCount] = useState(time);
  const [options, setOptions] = useState(false);

  // Conditionals to check for selected item
  const isSelected = p.id === selectedBox.id;
  const buttonClass = isSelected ? classes["p-selected"] : classes["p-select"];
  const buttonText = isSelected ? "Selected" : "Select";

  // Conditionals for daily vs. all
  const isDaily = p.freq === "daily" ? true : false;
  const buttonTag = isDaily ? classes.daily : classes.all;

  // If package is daily and doesn't have anything unopened
  const countdownCond =
    p.lastOpened !== "never" &&
    p.freq === "daily" &&
    p.unopenedCount === 0 &&
    p.size - p.streak > 0;

  useEffect(() => {
    if (count === -1) {
      return;
    }
    const timer = setTimeout(() => {
      setCount((prevState) => {
        return prevState - 1;
      });
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [count]);

  const handleSelectedBox = (p: Package) => {
    setSelectedBox(p);
  };

  return (
    <>
      {/* List-item */}
      <li key={p.id} className={`${classes["list-item"]} mod-padding-1`}>
        {/* Package info */}
        <div className={classes["list-info"]}>
          <h3 className={classes["p-name"]}>{strReducer(p.name, 8)}</h3>
          <div className={classes["p-inbox"]}>
            {p.unopenedCount} unopened | {p.streak} / {p.size} notes opened
          </div>
          {/* More info tags */}
          <div className={classes.tags}>
            <div className={buttonTag}>{p.freq}</div>
            {countdownCond && (
              <div className={classes["p-count"]}>
                Next daily in {convertSecondsToTime(count)}
              </div>
            )}
          </div>
        </div>
        {/* Button / Options */}
        <div className={buttonClass}>
          <button
            onClick={() => {
              handleSelectedBox(p);
            }}
            className="mod-shadow-1"
          >
            {buttonText}
          </button>
          {options && (
            <RecievedPackageOps p={p} closeEntireModal={props.closeEntireModal} setOptions={setOptions} />
          )}
          <FaEllipsisV
            className={classes.ellipse}
            onClick={() => {
              setOptions(true);
            }}
          />
        </div>
      </li>
    </>
  );
};

export default RecievedPackageItem;
