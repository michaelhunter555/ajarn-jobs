import React from "react";

import MainFeaturedJob from "./MainFeaturedJob";

const JobContent = ({ featuredJobs }) => {
  return <MainFeaturedJob jobs={featuredJobs} />;
};

export default JobContent;
