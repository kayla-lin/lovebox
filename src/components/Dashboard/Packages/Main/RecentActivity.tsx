import React, { useEffect, useState } from "react";
import { FaEnvelopeOpen } from "react-icons/fa";
import { strReducer } from "../../../../models/helper";
import { getActivityArr } from "../../../../models/open-package-db";
import classes from "./RecentActivity.module.css";

interface ActivityType {
  user: string;
  event: string;
  package: string;
}

const RecentActivity = () => {
  const [activity, setActivity] = useState<ActivityType[]>([]);

  useEffect(() => {
    const getActivityState = async () => {
      try {
        const arr = await getActivityArr();
        const reverse = arr.reverse();
        setActivity(reverse);
      } catch { }
    };
    getActivityState();
  }, []);

  const mapActivity = activity.map((a, i) => (
    <div key={i} className={classes.activity}>
      {/* First part */}
      <div className={classes["part-1"]}>
        <div className={"icon-wrap"}>
          <FaEnvelopeOpen className={classes["act-icon"]} />
        </div>
        <div>
          <div className={classes["act-user"]}>{strReducer(a.user, 8)}</div>
          <div>{a.event}</div>
        </div>
      </div>
      {/* Second part  */}
      <div className={classes["package"]}>{strReducer(a.package, 12)}</div>
    </div>
  ));

  const noActivity = (
    <div className={classes["no-activity"]}>You have no recent activity</div>
  );

  return (
    <div className={`${classes.wrapper} mod-white-1 mod-padding-1`}>
      <section className={"title-small-2"}>
        <h2>Recent Activity</h2>
        {activity.length === 0 ? (
          noActivity
        ) : (
          <div className={classes["activity-wrapper"]}>{mapActivity}</div>
        )}
      </section>
    </div>
  );
};

export default RecentActivity;
