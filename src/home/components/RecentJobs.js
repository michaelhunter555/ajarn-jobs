import "./RecentJobs.css";

import React from "react";

import { MdOutlineFiberNew } from "react-icons/md";
import { Link } from "react-router-dom";

import RecentJobItems from "./RecentJobItems";

const RecentJobs = (props) => {
  if (props.homeJobs.length === 0) {
    return (
      <div>
        <p>...no jobs bro</p>
      </div>
    );
  }
  return (
    <div className="recent-jobs">
      <h2>
        Recent Jobs
        <MdOutlineFiberNew style={{ color: "green" }} />
      </h2>
      <ul className="recent-jobs__list">
        {props.homeJobs &&
          props.homeJobs.map((job) => (
            <Link key={job.id} to={`/jobs/${job.id}`}>
              <RecentJobItems
                location={job.location}
                salary={job.salary}
                datePosted={job.datePosted}
                logo={job.creator.logoUrl}
                title={job.title}
              />
            </Link>
          ))}
      </ul>
    </div>
  );
};

export default RecentJobs;
