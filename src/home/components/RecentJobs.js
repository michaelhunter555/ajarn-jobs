import React from "react";

import { MdOutlineFiberNew } from "react-icons/md";
import { Link } from "react-router-dom";

import { Divider, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

import { getTimeDifference } from "../../shared/util/getTimeDifference";
import RecentJobItems from "./RecentJobItems";

const StyledTitle = styled("h2")(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  maxHeight: 440,
  overflowY: "auto",
  pointerEvents: "auto",
  width: "100%",
  backgroundColor: theme.palette.background.paper,
  "&::-webkit-scrollbar": {
    width: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "transparent",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#8b8b8d",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
    borderRadius: "4px",
  },
  "&:hover": {
    "&::-webkit-scrollbar-thumb": {
      background: "#b5b5b5",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      transition: "background 1s ease-in",
      background: "#8b8b8d",
    },
    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },
  },
}));

const RecentJobs = (props) => {
  if (props.homeJobs?.length === 0) {
    return (
      <div>
        <p>...no jobs</p>
      </div>
    );
  }

  const recentJobsLimit = props.homeJobs && props.homeJobs.slice(0, 5);

  return (
    <>
      <StyledTitle>
        Recent Jobs
        <MdOutlineFiberNew style={{ color: "green" }} />
      </StyledTitle>
      <Divider />
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
                logo={`${job?.image}`}
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
