import React from "react";

import { useParams } from "react-router-dom";

import { dummy_jobs } from "../../shared/util/DummyJobs";
import JobDetails from "../components/JobDetails";

const JobDetailsPage = () => {
  const jobId = useParams().jid;
  const job = dummy_jobs.find((j) => j.id === jobId);
  return <JobDetails job={job} />;
};

export default JobDetailsPage;
