import "./FeaturedJobsList.css";

import React from "react";

import FeaturedJobs from "./FeaturedJobs";

const FeaturedJobsLists = (props) => {
  if (props?.sponsors.length < 0) {
    return (
      <div>
        <p>no sponsors yet :(</p>
      </div>
    );
  }

  return (
    <>
      {props?.hello && <div></div>}
      <h2>Featured jobs:</h2>
      {props?.sponsors
        .filter((listing) => listing.jobType?.featured)
        .map((school) => (
          <FeaturedJobs
            key={school?.id}
            id={school?.id}
            logo={school.creator?.logoUrl}
            company={school.creator?.company}
          />
        ))}
    </>
  );
};

export default FeaturedJobsLists;
