import React, { useEffect, useState, useContext, useRef } from "react";
import classes from "./PackageManager.module.css";
import Button from "../../../UI/Layout/Button";
import Loading from "../../../UI/Loading";
import { PackageContext } from "../../../../store/package-context";
import Package from "../../../../models/package";
import IconInput from "../../../UI/Forms/IconInput";
import { FaSearch } from "react-icons/fa";
import OpenedPackageModal from "./OpenedPackageModal";
import {
  strReducer,
  convertSecondsToDate,
  hideScroll,
} from "../../../../models/helper";
import { getPackagesDB } from "../../../../models/sending-package-db";
import {
  dayGreater,
  getUnopenedPackageCount,
} from "../../../../models/open-package-db";
import { UnopenedContext } from "../../../../store/unopened-context";

let allPackages: Package[] = [];
// TODO: change search logic
const PackageManager = () => {
  const packageCtx = useContext(PackageContext);
  const unopenedCtx = useContext(UnopenedContext);
  const [loading, setLoading] = useState(false);
  const [openedPack, setOpenedPack] = useState<Package>(new Package());
  const [search, setSearch] = useState("");

  /* Get package from db */
  const getPackages = async () => {
    setLoading(true);
    const data = await getPackagesDB();

    allPackages = data.docs.map((doc) => {
      const lastOpenedText =
        doc.data().lastOpened === "never"
          ? "never"
          : convertSecondsToDate(doc.data().lastOpened.seconds);
      return new Package(
        doc.data().name,
        doc.data().recipient,
        doc.data().recipientUID,
        doc.data().openCount,
        lastOpenedText,
        doc.id,
        doc.data().freq,
        doc.data().size
      );
    });

    packageCtx.setPackages(allPackages);
    setLoading(false);
  };

  /* Load sent packages */
  useEffect(() => {
    allPackages = [];
    getPackages();
  }, []);

  /* Load unopened notes */
  useEffect(() => {
    const getUnOpenedNotes = async () => {
      const num = await getUnopenedPackageCount();
      unopenedCtx.setCount(num);
    };
    getUnOpenedNotes();
  }, [openedPack]);

  /* Search */
  const onSearchChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  useEffect(() => {
    if (allPackages.length === 0) {
      return;
    }
    const timer = setTimeout(() => {
      if (search.length === 0) {
        packageCtx.setPackages(allPackages);
      }
      if (search.length > 0) {
        packageCtx.setPackages(() => {
          return allPackages.filter((p) => p.name.includes(search));
        });
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  /* Package item in list */
  const handleOpenPackage = async (p: Package) => {
    setOpenedPack(p);
  };

  const packageList = packageCtx.packages.map((p, i) => {
    return (
      <tr key={i}>
        <td className={classes["first-col"]}>
          {strReducer(p.name, 6)}
          <div className={classes['mobile-button']}>
            <Button
              label={"Open"}
              onClick={() => {
                handleOpenPackage(p);
                hideScroll();
              }}
              color={"dark-pink"}
            />
          </div>
        </td>
        <td className={classes["third-col"]}>{p.lastOpened}</td>
        <td className={`${classes["fourth-col"]} ${classes['desk-button']}`}>
          <Button
            label={"Open"}
            onClick={() => {
              handleOpenPackage(p);
              hideScroll();
            }}
            color={"dark-pink"}
          />
        </td>
      </tr>
    );
  });

  /* Loading vs. package manager */
  const loadingState = (
    <div className={classes.loading}>
      <Loading />
    </div>
  );

  const packageState = (
    <section className={`${classes.table}`}>
      <table cellSpacing={0}>
        <tbody>
          <tr className={classes.labels}>
            <td className={`${classes["label-name"]} ${classes["first-col"]}`}>
              Name
            </td>
            <td className={`${classes["label-date"]} ${classes["third-col"]}`}>
              Last opened date
            </td>
            <td
              className={`${classes["label-button"]} ${classes["fourth-col"]}`}
            ></td>
          </tr>
          {packageList}
        </tbody>
      </table>
    </section>
  );

  return (
    <>
      {openedPack!.id.length > 0 && (
        <OpenedPackageModal
          setOpenedPack={setOpenedPack}
          package={openedPack!}
        />
      )}
      <div className={`${classes.padding} mod-white-1`}>
        <section className={"mod-margin-bottom-1"}>
          <section className={'title-small-2 mod-margin-bottom-1'}>
            <h2>Sent box manager</h2>
          </section>
          <IconInput
            value={search}
            onChange={onSearchChange}
            type={"text"}
            id={"search"}
            placeholder={"Search"}
            icon={<FaSearch />}
          />
        </section>
        {loading ? loadingState : packageState}
      </div>
    </>
  );
};
export default PackageManager;
