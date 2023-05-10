import React from 'react';

import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

import FeaturedJobs from './FeaturedJobs';

const StyledFeaturedJobs = styled(Paper)({
  border: "1px solid #ddd",
  padding: "1.5rem",
  borderRadius: "6px",
  background: "#fff",
})

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
          <FeaturedJobs
            key={school?._id}
            id={school?._id}
            logo={school?.image}
            company={school?.creator?.company} /> 
        ))}
        </StyledFeaturedJobs>
  )
};

export default FeaturedJobsLists;
