import React, { useEffect } from "react";

import { useParams } from "react-router-dom";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useJob } from "../../shared/hooks/jobs-hook";
import JobDetails from "../components/JobDetails";

const JobDetailsPage = () => {
  const jobId = useParams().jid;
  const { jobs, getJobById, isLoading, error, clearError } = useJob();

  useEffect(() => {
    getJobById(jobId);
  }, [getJobById, jobId]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <JobDetails job={jobs} />
    </>
  );
};

export default JobDetailsPage;
