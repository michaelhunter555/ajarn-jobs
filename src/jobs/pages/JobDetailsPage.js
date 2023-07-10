import React from "react";

import { useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

//import { useQuery } from "@tanstack/react-query";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useJob } from "../../shared/hooks/jobs-hook";
import JobDetails from "../components/JobDetails";

const JobDetailsPage = () => {
  const jobId = useParams().jid;
  const { getJobById, error, clearError } = useJob();
  // useEffect(() => {
  //   getJobById(jobId);
  // });

  const getJobDetails = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_JOBS}/${jobId}`);
      if (!response.ok) {
        throw new Error("There was an error with the request");
      }
      const data = await response.json();
      return data.job;
    } catch (err) {
      console.log("Error in jobDetails:", err);
    }
  };

  const { data: jobs, isLoading } = useQuery(["jobDetailsPage", jobId], () =>
    getJobDetails(jobId)
  );

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <JobDetails isLoading={isLoading} job={jobs} />
    </>
  );
};

export default JobDetailsPage;
