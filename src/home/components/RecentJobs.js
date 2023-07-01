import React from "react";

import { MdOutlineFiberNew } from "react-icons/md";
import { Link } from "react-router-dom";

import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

import { getTimeDifference } from "../../shared/util/getTimeDifference";
import RecentJobItems from "./RecentJobItems";

const StyledTitle = styled("h2")({
  color: "#002379",
});

const StyledPaper = styled(Paper)({
  maxHeight: 300,
  overflowY: "auto",
  pointerEvents: "auto",
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#b5b5b5",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#8b8b8d",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
    borderRadius: "4px",
  },
});
const RecentJobs = (props) => {
  if (props.homeJobs?.length === 0) {
    return (
      <div>
        <p>...no jobs</p>
      </div>
    );
  }

  const recentJobsLimit = props.homeJobs.slice(0, 5);

  return (
    <>
      <StyledTitle>
        Recent Jobs
        <MdOutlineFiberNew style={{ color: "green" }} />
      </StyledTitle>
      <StyledPaper elevation={0}>
        {props.homeJobs &&
          recentJobsLimit?.map((job) => (
            <Link
              style={{ color: "rgb(92, 92, 92)", textDecoration: "none" }}
              key={job?._id}
              to={`/jobs/${job?._id}`}
            >
              <RecentJobItems
                location={job?.location}
                salary={job?.salary}
                datePosted={job?.datePosted}
                logo={`${process.env.REACT_APP_IMAGE}${job?.image}`}
                title={job?.title}
                id={job?.id}
                creationDate={getTimeDifference(job?.datePosted)}
              />
            </Link>
          ))}
      </StyledPaper>
    </>
  );
};

export default RecentJobs;
