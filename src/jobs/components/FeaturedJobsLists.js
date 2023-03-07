import "./FeaturedJobsList.css";

import React from "react";

import FeaturedJobs from "./FeaturedJobs";

const FeaturedJobsLists = (props) => {
  if (props.sponsors.length < 0) {
    return (
      <div>
        <p>no sponsors yet :(</p>
      </div>
    );
  }

  return (
    <ul className="sponsors-list">
      <h2>Featured jobs:</h2>
      {props.sponsors
        .filter((listing) => listing.jobType.featured)
        .map((school) => (
          <li className="sponsors-list__img" key={school.id}>
            <FeaturedJobs src={school.creator.logoUrl} title={school.title} />
          </li>
        ))}
    </ul>
  );
};

export default FeaturedJobsLists;
