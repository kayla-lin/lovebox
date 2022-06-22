import React from "react";
import Package from "../../../../models/package";
import classes from "./OPInfoTags.module.css";

type AppProps = {
  package: Package;
  length: number;
};

const OPInfoTags = (props: AppProps) => {

  const lastOpened = props.package.lastOpened === '' ? 'never' : props.package.lastOpened;

  const tags = [
    { text: `Opened notes: ${props.package.streak} / ${props.length}` },
    { text: `Recipient: ${props.package.partner}` },
    { text: `Last opened: ${lastOpened}` },
    { text: `Frequency: ${props.package.freq}` },
  ];

  const tagsMapped = tags.map((t, i) => (
    <div key={i} className={`${classes["info-stat"]} mod-shadow-1`}>{t.text}</div>
  ));
  return <section className={classes["info-tags"]}><div className={classes.tag}>tags:</div>{tagsMapped}</section>;
};

export default OPInfoTags;
