import React, { useContext } from "react";
import { FaArrowRight, FaBoxes, FaMailBulk, FaWalking } from "react-icons/fa";
import { Link } from "react-router-dom";
import { PackageContext } from "../../../../store/package-context";
import { UnopenedContext } from "../../../../store/unopened-context";
import classes from "./PackageButtons.module.css";

const PackageButtons = () => {
  const packageCtx = useContext(PackageContext);
  const unopenedCtx = useContext(UnopenedContext);

  const packPlural = packageCtx.packages.length === 1 ? "box" : "boxes";
  const notePlural = unopenedCtx.count === 1 ? "note" : "notes";

  return (
    <section className={`${classes.buttons}`}>
      <Link to={"add"}>
        <button
          className={`${classes["button"]} ${classes["add-button"]} mod-shadow-1`}
        >
          <FaWalking className={classes.icon} />
          <div className={classes["button-text"]}>
            <h2>Send a box</h2>
            <div className={classes["button-go"]}>
              You currently have sent {packageCtx.packages.length} {packPlural}
              <span>
                <FaArrowRight className={classes.arrow} />
              </span>
            </div>
          </div>
        </button>
      </Link>
      <Link to={"open"}>
        <button
          className={`${classes["button"]} ${classes["view-button"]} mod-shadow-1`}
        >
          <FaBoxes className={classes.icon} />
          <div className={classes["button-text"]}>
            <h2>Open notes</h2>
            <div className={classes["button-go"]}>
              <span>
                <FaMailBulk className={classes.mail} />
              </span>
              You currently {unopenedCtx.count} unopened {notePlural}
            </div>
          </div>
        </button>
      </Link>
    </section>
  );
};

export default PackageButtons;
