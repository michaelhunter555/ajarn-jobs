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

  return (
    <>
      <StyledTitle>
        Recent Jobs
        <MdOutlineFiberNew style={{ color: "green" }} />
      </StyledTitle>
      {props.homeJobs &&
        props?.homeJobs?.map((job) => (
          <Link
            style={{ color: "rgb(92, 92, 92)" }}
            key={job.id}
            to={`/jobs/${job.id}`}
          >
            <RecentJobItems
              location={job.location}
              salary={job.salary}
              datePosted={job.datePosted}
              logo={job.creator.logoUrl}
              title={job.title}
              id={job.id}
              creationDate={getTimeDifference(job.creationDate)}
            />
          </Link>
        ))}
    </>
  );
};

export default RecentJobs;
