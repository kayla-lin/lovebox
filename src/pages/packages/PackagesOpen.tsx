import React, { useContext, useEffect, useState } from "react";
import { AnimationAction, LoopOnce } from "three";
import AnimatedNote from "../../components/Dashboard/Packages/OpenPackage/AnimatedNote";
import BoxAnimated from "../../components/Dashboard/Packages/OpenPackage/BoxAnimated";
import OpenControls from "../../components/Dashboard/Packages/OpenPackage/OpenControls";
import RecievedPackageModal from "../../components/Dashboard/Packages/OpenPackage/RecievedPackageModal";
import ViewNoteModal from "../../components/Dashboard/Packages/OpenPackage/ViewNoteModal";
import Loading from "../../components/UI/Loading";
import { hideScroll, showScroll } from "../../models/helper";
import {
  calculateUnopened,
  getUnopenedPackageArray,
  getUnopenedPackageDB,
} from "../../models/open-package-db";
import Package from "../../models/package";
import { UnopenedContext } from "../../store/unopened-context";
import classes from "./PackagesOpen.module.css";

const PackagesOpen = () => {
  const unopenedCtx = useContext(UnopenedContext);
  const [viewBoxModal, setViewBoxModal] = useState(false);
  const [viewNoteModal, setViewNoteModal] = useState(false);
  const [selectedBox, setSelectedBox] = useState<Package>(new Package());
  const [loading, setLoading] = useState(false);
  const [animatedNote, setAnimatedNote] = useState<{
    open: boolean;
    text: string;
  }>({
    open: false,
    text: "",
  });
  const [noPackage, setNoPackage] = useState(false);

  const handleBoxModal = () => {
    if (viewBoxModal) {
      showScroll();
    } else {
      hideScroll();
    }
    setViewBoxModal(!viewBoxModal);
  };

  const handleNoteModal = () => {
    if (viewNoteModal) {
      showScroll();
    } else {
      hideScroll();
    }
    setViewNoteModal(!viewNoteModal);
  };

  const handleAnimatedNote = () => {
    if (animatedNote.open) {
      showScroll();
    } else {
      hideScroll();
    }
    setAnimatedNote((prevState) => {
      return { ...prevState, open: !animatedNote.open };
    });
  };

  const refreshRecievedPackages = async () => {
    const data = await getUnopenedPackageDB();
    // Set count of unopened packages
    const count = calculateUnopened(data.docs);
    unopenedCtx.setCount(count);
    const arr = getUnopenedPackageArray(data.docs);

    // Update selected note data with refreshed info
    if (selectedBox.name !== "") {
      arr.forEach((p) => {
        if (p.id === selectedBox.id) {
          setSelectedBox(p);
        }
      });
    }

    // Set package array
    unopenedCtx.setPackages(arr);
    return arr;
  };

  /* Loading unopened packages */
  useEffect(() => {
    const getUnopenedPackages = async () => {
      setLoading(true);
      const arr = await refreshRecievedPackages();
      setLoading(false);

      // User has no packages!
      if (arr.length === 0) {
        setNoPackage(true);
        return;
      }

      // Set array with highest unopened boxes to selected box
      setSelectedBox(arr[0]);
    };
    getUnopenedPackages();
  }, []);

  const [actions, setActions] = useState<{
    [x: string]: AnimationAction | null;
  }>();
  const [flash, setFlash] = useState(false);

  // Play animation
  const animateOpen = (text: string) => {
    setFlash(true);
    setAnimatedNote((prevState) => {
      return { ...prevState, text: text };
    });
    actions!.presentBottom!.stop();
    actions!.presentThrow!.stop();
    actions!.presentBottom!.setLoop(LoopOnce, 1);
    actions!.presentThrow!.setLoop(LoopOnce, 1);
    actions!.presentBottom!.play();
    actions!.presentThrow!.play();
    setTimeout(() => {
      setFlash(false);
      handleAnimatedNote();
    }, 500);
  };

  const packagePage = (
    <div className={classes["open-wrapper"]}>
      <div className={classes.position}>
        {/* Overlays */}
        {flash && <div className={classes.flash}></div>}
        {/* Modals */}
        {viewBoxModal && (
          <RecievedPackageModal
            setSelectedBox={setSelectedBox}
            selectedBox={selectedBox}
            toggleBoxModal={handleBoxModal}
          />
        )}
        {viewNoteModal && (
          <ViewNoteModal
            refreshRecievedPackages={refreshRecievedPackages}
            selectedBox={selectedBox}
            toggleNoteModal={handleNoteModal}
          />
        )}
        {animatedNote.open && (
          <AnimatedNote
            text={animatedNote.text}
            toggleAnimatedNote={handleAnimatedNote}
            selectedBox={selectedBox}
          />
        )}
        {/* Animation */}
        <div className={classes["animated-package"]}>
          <BoxAnimated setActions={setActions} />
        </div>
        {/* Bottom buttons and text */}
        <div className={classes.bottom}>
          <OpenControls
            selectedBox={selectedBox}
            setSelectedBox={setSelectedBox}
            toggleNoteModal={handleNoteModal}
            toggleBoxModal={handleBoxModal}
            animateOpen={animateOpen}
            noPackage={noPackage}
          />
        </div>
      </div>
    </div>
    // <div className={"wrapper"}>
    //   {/* Current box, change current box */}
    //   <div className={`${classes["top-controls"]} mod-margin-tb-1 `}>
    //     <Button
    //       onClick={handleBoxModal}
    //       label={"Change box"}
    //       color={"dark-blue"}
    //     />
    //   </div>
    //   {/* Modals */}
    //   {viewBoxModal && (
    //     <RecievedPackageModal
    //       setSelectedBox={setSelectedBox}
    //       selectedBox={selectedBox}
    //       toggleBoxModal={handleBoxModal}
    //     />
    //   )}
    //   {viewNoteModal && (
    //     <ViewNoteModal
    //       refreshRecievedPackages={refreshRecievedPackages}
    //       selectedBox={selectedBox}
    //       toggleNoteModal={handleNoteModal}
    //     />
    //   )}

    //   {/* Bottom controls */}
    //   <OpenControls
    //     setOpening={setOpening}
    //     selectedBox={selectedBox}
    //     setSelectedBox={setSelectedBox}
    //     toggleNoteModal={handleNoteModal}
    //   />
    // </div>
  );

  const loadingPage = (
    <div className={classes["loading-wrapper"]}>
      <Loading />
    </div>
  );

  return <>{loading ? loadingPage : packagePage}</>;
};

export default PackagesOpen;
