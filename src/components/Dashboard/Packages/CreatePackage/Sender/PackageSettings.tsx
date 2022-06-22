import React from "react";
import classes from "./PackageSettings.module.css";
import ToggleInput from "../../../../UI/Forms/ToggleInput";
import Button from "../../../../UI/Layout/Button";
import Input from "../../../../UI/Forms/Input";

type AppProps = {
  userInfo: userInfoState;
  setUserInfo: React.Dispatch<React.SetStateAction<userInfoState>>;
  submitPackage: () => Promise<void>;
};

type userInfoState = {
  name: string;
  email: string;
  freq: string;
};

type dropDown = {
  value: string;
  text: string;
};

const freqDropDrown: dropDown[] = [
  { value: "daily", text: "Daily" },
  { value: "all", text: "All at once" },
];

const PackageSettings = (props: AppProps) => {
  const handleSelect = (event: React.FormEvent<HTMLSelectElement>) => {
    const formValue = event.currentTarget.value;
    props.setUserInfo((prev: userInfoState) => {
      return { ...prev, freq: formValue };
    });
  };

  const handleSetEmailText = (event: React.FormEvent<HTMLInputElement>) => {
    const formValue = event.currentTarget.value;
    props.setUserInfo((prev: userInfoState) => {
      return { ...prev, email: formValue };
    });
  };

  const handleSetNameText = (event: React.FormEvent<HTMLInputElement>) => {
    const formValue = event.currentTarget.value;
    props.setUserInfo((prev: userInfoState) => {
      return { ...prev, name: formValue };
    });
  };

  return (
    <form
      className={`${classes.form} mod-white-1 mod-padding-2 mod-margin-top-1`}
      onSubmit={(event: React.FormEvent) => {
        event.preventDefault();
      }}
    >
      <section className="title-small-2">
        <h2>Box settings</h2>
      </section>
      {/* Package name */}
      <div className={`${classes.input} mod-padding-tb-1`}>
        <section className={`title-small`}>
          <p>Give a title to your box</p>
        </section>

        <Input
          type={"text"}
          id={"name"}
          placeholder={"Name"}
          onChange={handleSetNameText}
          value={props.userInfo.name}
        />
      </div>

      {/* Email */}
      <div className={`${classes.input} mod-padding-tb-1`}>
        <section className={`title-small`}>
          <p>The recipient will need an existing account</p>
        </section>

        <Input
          type={"email"}
          id={"email"}
          placeholder={"Email"}
          onChange={handleSetEmailText}
          value={props.userInfo.email}
        />
      </div>

      {/* Frequency */}
      <div className={`${classes.input} mod-padding-tb-1`}>
        <section className={`title-small`}>
          <p>How often your recipient will recieve a unique note</p>
        </section>
        <ToggleInput handleSelect={handleSelect} values={freqDropDrown} />
      </div>

      <div className={`${classes.submit} mod-margin-top-2`}>
        <Button
          onClick={props.submitPackage}
          label={"Send package"}
          color={"pink"}
        />
      </div>
    </form>
  );
};

export default PackageSettings;
