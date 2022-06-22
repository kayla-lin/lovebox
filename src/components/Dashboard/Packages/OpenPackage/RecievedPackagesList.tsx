import React, { useContext, useState } from "react";
import { FaSearch, FaThumbtack } from "react-icons/fa";
import Package from "../../../../models/package";
import { UnopenedContext } from "../../../../store/unopened-context";
import IconInput from "../../../UI/Forms/IconInput";
import RecievedPackageItem from "./RecievedPackageItem";
import classes from "./RecievedPackagesList.module.css";

type AppProps = {
  selectedBox: Package;
  setSelectedBox: React.Dispatch<React.SetStateAction<Package>>;
  closeEntireModal: () => void;
};

const RecievedPackagesList = (props: AppProps) => {
  const unopenedCtx = useContext(UnopenedContext);
  const [search, setSearch] = useState("");

  /* Helper function to calculator last opened time */
  const checkTime = (lastOpened: string) => {
    const now = new Date().getTime() / 1000;
    return lastOpened === "never" ? -1 : parseInt(lastOpened) - now;
  };

  const handleSearchChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
  };

  const searchPara =
    search.length > 0
      ? unopenedCtx.packages.filter((p) => p.name.includes(search))
      : unopenedCtx.packages;

  const packageList = searchPara
    .filter((p) => p.id !== props.selectedBox.id)
    .map((p) => {
      return (
        <RecievedPackageItem
          closeEntireModal={props.closeEntireModal}
          p={p}
          time={checkTime(p.lastOpened)}
          key={p.id}
          selectedBox={props.selectedBox}
          setSelectedBox={props.setSelectedBox}
        />
      );
    });

  return (
    <>
      <IconInput
        type={"text"}
        id={"search"}
        icon={<FaSearch />}
        placeholder={"Search boxes"}
        shadow={true}
        value={search}
        onChange={handleSearchChange}
      />
      <ul className={`${classes.list} mod-margin-tb-1`}>
        {/* Selected box */}
        <div className={classes['selected']}>
          <FaThumbtack className={classes.pinned} />
          <RecievedPackageItem
            closeEntireModal={props.closeEntireModal}
            p={props.selectedBox}
            time={checkTime(props.selectedBox.lastOpened)}
            key={props.selectedBox.id}
            selectedBox={props.selectedBox}
            setSelectedBox={props.setSelectedBox}
          />
        </div>
        {/* Reset of the boxes */}
        {packageList}
      </ul>
    </>
  );
};

export default RecievedPackagesList;
