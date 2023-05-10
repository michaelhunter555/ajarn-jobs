import React from "react";

import { MdOutlineFiberNew } from "react-icons/md";
import { Link } from "react-router-dom";

import { styled } from "@mui/material/styles";

import { getTimeDifference } from "../../shared/util/getTimeDifference";
import RecentJobItems from "./RecentJobItems";

const RecentJobs = (props) => {
  if (props.homeJobs?.length === 0) {
    return (
      <div>
        <p>...no jobs</p>
      </div>
    );
  }
  const StyledTitle = styled("h2")({
    color: "#002379",
  });

  const recentJobsLimit = props.homeJobs.slice(0, 3);

  return (
    <>
      <StyledTitle>
        Recent Jobs
        <MdOutlineFiberNew style={{ color: "green" }} />
      </StyledTitle>
      {props.homeJobs &&
        recentJobsLimit?.map((job) => (
          <Link
            style={{ color: "rgb(92, 92, 92)" }}
            key={job?._id}
            to={`/jobs/${job?._id}`}
          >
            <RecentJobItems
              location={job?.location}
              salary={job?.salary}
              datePosted={job?.datePosted}
              logo={job?.image}
              title={job?.title}
              id={job?.id}
              creationDate={getTimeDifference(job?.datePosted)}
            />
          </Link>
        ))}
    </>
  );
};

export default RecentJobs;
