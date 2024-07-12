import React from "react";

import MainFeaturedJob from "./MainFeaturedJob";

const JobContent = ({ featuredJobs, page, totalPages, onPageChange }) => {
  return (
    <MainFeaturedJob
      fontSize={12}
      height={400}
      featured={true}
      jobs={featuredJobs}
      page={page}
      totalPages={totalPages}
      onPageChange={onPageChange}
    />
  );
};

export default JobContent;
