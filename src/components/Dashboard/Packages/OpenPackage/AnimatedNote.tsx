import React from "react";
import ModalContent from "../../../UI/Layout/ModalContent";
import { useSpring, animated, config } from "react-spring";
import classes from "./AnimatedNote.module.css";
import Package from "../../../../models/package";
import { auth } from "../../../../firebase-config";

type AppProps = {
  text: string;
  selectedBox: Package;
  toggleAnimatedNote: () => void;
};

const AnimatedNote = ({ text, toggleAnimatedNote, selectedBox }: AppProps) => {
  const styles = useSpring({
    to: [{ opacity: 1 }],
    from: { opacity: 0 },
    config: config.gentle,
  });

  return (
    <>
      <div className={classes.centered}>
        <animated.div style={styles}>
          <ModalContent noColor={true} handleClose={toggleAnimatedNote}>
            <article className={classes["note"]}>
              <div>
                <div className={"title-small-2 mod-margin-bottom-2"}>
                  <h2>{selectedBox.name}</h2>
                </div>
                <div className={classes.to}>To, {auth.currentUser!.email}</div>
                <p className={classes.text}>{text}</p>
              </div>
              <div className={classes.from}>Love, {selectedBox.partner}</div>
            </article>
          </ModalContent>
        </animated.div>
      </div>
    </>
  );
};

export default AnimatedNote;
