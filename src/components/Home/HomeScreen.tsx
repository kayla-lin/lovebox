import React, { Fragment } from "react";
import BearAnimated from "./BearAnimated";
import classes from "./HomeScreen.module.css";
import bearImg from "../../assets/images/bearRender.png";
import Button from "../UI/Layout/Button";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
  let navigate = useNavigate();
  return (
    <Fragment>
      <section className={classes["landing-banner"]}>
        <div className={classes["landing-left"]}>
          <div className={classes["animated-bear"]}>
            <BearAnimated />
          </div>
        </div>
        <div className={classes["landing-right"]}>
          <h1>Send love from anywhere</h1>
          <p>
            Surprise your partner, friend, or family with appreciative notes
            from a virtual lovebox{" "}
          </p>
          <div className={classes.start}>
            <Button
              label={"Start now"}
              color={"dark-pink"}
              onClick={() => {
                navigate("/signup");
              }}
            />
          </div>
        </div>
      </section>
      <div className={classes["tut-wrap"]}>
        <section className={`${classes.tutorial} wrapper`}>
          <div className={classes["tut-left"]}>
            <div className={classes["box-desc"]}>
              <h2>Inside the box</h2>
              <p>
                With lovebox, you are able to prepare a care package of love
                messages that your special someone can read instantly or once a
                day
              </p>
            </div>
          </div>
          <div className={classes["tut-right"]}>
            <div className={classes["bear-img"]}>
              <img src={bearImg} alt="Cute bear" />
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default HomeScreen;
