import React from "react";

import { useQuery } from "@tanstack/react-query";

import MainFeaturedJob from "./MainFeaturedJob";

const JobContent = () => {
  const getJobContent = async () => {
    const response = await fetch(`${process.env.REACT_APP_JOBS}`);

    if (!response.ok) {
      throw new Error("There was an error with the request.");
    }

    const data = await response.json();
    return data.jobs;
  };

  const { data: featuredJobs, isLoading } = useQuery(["userJobContent"], () =>
    getJobContent()
  );

  return <MainFeaturedJob isLoading={isLoading} jobs={featuredJobs} />;
};

export default JobContent;
