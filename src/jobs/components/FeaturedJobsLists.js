import React from "react";

import { Link } from "react-router-dom";

import { Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import FeaturedJobs from "./FeaturedJobs";

const StyledFeaturedJobs = styled(Paper)({
  border: "1px solid #ddd",
  padding: "1.5rem",
  borderRadius: "6px",
});

const FeaturedJobsLists = (props) => {
  if (props?.sponsors?.length < 0) {
    return (
      <div>
        <p>no sponsors yet :(</p>
      </div>
    );
  }

  return (
    <StyledFeaturedJobs>
      <h2>Featured jobs:</h2>
      {props?.sponsors
        ?.filter((listing) => listing?.jobType === "featured")
        .map((school) => (
          <Typography
            component={Link}
            key={school?._id}
            to={`/jobs/${school?._id}/${school?.title}`}
            color="text.secondary"
            variant="body2"
            sx={{ textDecoration: "none" }}
          >
            <FeaturedJobs
              id={school?._id}
              logo={`${school?.image}`}
              title={school?.title}
              salary={school?.salary}
              hours={school?.hours}
            />
          </Typography>
        ))}
    </StyledFeaturedJobs>
  );
};

export default FeaturedJobsLists;
