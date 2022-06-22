import React, { useContext, useEffect, useState } from "react";
import { showScroll } from "../../../../models/helper";
import {
  calculateUnopened,
  getUnopenedPackageArray,
  getUnopenedPackageDB,
} from "../../../../models/open-package-db";
import Package from "../../../../models/package";
import { UnopenedContext } from "../../../../store/unopened-context";
import ModalContent from "../../../UI/Layout/ModalContent";
import Loading from "../../../UI/Loading";
import RecievedPackagesList from "./RecievedPackagesList";

type AppProps = {
  toggleBoxModal: () => void;
  selectedBox: Package;
  setSelectedBox: React.Dispatch<React.SetStateAction<Package>>;
};
const RecievedPackageModal = (props: AppProps) => {
  const unopenedCtx = useContext(UnopenedContext);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    props.toggleBoxModal();
  };

  useEffect(() => {
    const updatePackages = async () => {
      setLoading(true);
      const data = await getUnopenedPackageDB();
      setLoading(false);
      const count = calculateUnopened(data.docs);
      unopenedCtx.setCount(count);
      unopenedCtx.setPackages(getUnopenedPackageArray(data.docs));
    };
    updatePackages();
  }, []);

  const packageList = (
    <RecievedPackagesList
      selectedBox={props.selectedBox}
      setSelectedBox={props.setSelectedBox}
      closeEntireModal={handleClose}
    />
  );

  const loadingList = (
    <div>
      <Loading />
    </div>
  );

  const listContent = loading ? loadingList : packageList;

  return (
    <>
      <ModalContent handleClose={handleClose}>
        {/* Title */}
        <div className={"title-small-3 mod-margin-tb-1"}>
          <h2>Loveboxes</h2>
        </div>
        {/* Search and list */}
        {listContent}
      </ModalContent>
    </>
  );
};

export default RecievedPackageModal;
