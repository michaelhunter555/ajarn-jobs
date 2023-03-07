import "./JobAd.css";

import React from "react";

import { Link } from "react-router-dom";

const JobAd = (props) => {
  const { job } = props;

  return (
    <Link to={`/jobs/${job.id}`} className="job-ad__link">
      <div className="job-ad__container">
        <img src={job.creator.logoUrl} alt="job ad" className="job-ad__image" />
        <h3>
          {job.title.length > 25
            ? job.title.substring(0, 25) + "..."
            : job.title}
        </h3>
        <p>{job.location}</p>
        <p>{job.salary}</p>
        <p>{job.hours}</p>
      </div>
    </Link>
  );
};

export default JobAd;
