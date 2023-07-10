import React from "react";

import MainFeaturedJob from "./MainFeaturedJob";

const JobContent = ({ featuredJobs }) => {
  return (
    <MainFeaturedJob
      fontSize={12}
      height={400}
      featured={true}
      jobs={featuredJobs}
    />
  );
};

export default JobContent;
