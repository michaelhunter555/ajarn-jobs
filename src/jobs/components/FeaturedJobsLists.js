import React from "react";

import { Link } from "react-router-dom";

import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

import FeaturedJobs from "./FeaturedJobs";

const StyledFeaturedJobs = styled(Paper)({
  border: "1px solid #ddd",
  padding: "1.5rem",
  borderRadius: "6px",
  background: "#fff",
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
        .filter((listing) => listing?.jobType === "featured")
        .map((school) => (
          <Link
            style={{ textDecoration: "none" }}
            key={school?._id}
            to={`/jobs/${school._id}`}
          >
            <FeaturedJobs
              id={school?._id}
              logo={`${process.env.REACT_APP_IMAGE}${school?.image}`}
              title={school?.title}
              salary={school?.salary}
              hours={school?.hours}
            />
          </Link>
        ))}
    </StyledFeaturedJobs>
  );
};

export default FeaturedJobsLists;
