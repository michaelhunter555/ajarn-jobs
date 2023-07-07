import React, { useEffect } from "react";

import { useParams } from "react-router-dom";

//import { useQuery } from "@tanstack/react-query";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useJob } from "../../shared/hooks/jobs-hook";
import JobDetails from "../components/JobDetails";

const JobDetailsPage = () => {
  const jobId = useParams().jid;
  const { jobs, getJobById, isLoading, error, clearError } = useJob();
  useEffect(() => {
    getJobById(jobId);
  });
  //const { data: jobs } = useQuery(["jobDetailsPage"], () => getJobById(jobId));

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <JobDetails isLoading={isLoading} job={jobs} />
    </>
  );
};

export default JobDetailsPage;
