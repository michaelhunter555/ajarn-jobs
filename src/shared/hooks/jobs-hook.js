import { useCallback, useContext, useState } from "react";

import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "./http-hook";

export const useJob = () => {
  const auth = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const { updateUser } = auth;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  //GET all jobs by userId
  const getJobsByUserId = useCallback(
    async (userId) => {
      try {
        const response = await sendRequest(
          `http://localhost:5000/api/jobs/${userId}`
        );
        updateUser(response.user);
        setJobs(response.job);
      } catch (err) {}
    },
    [sendRequest, updateUser]
  );

  //POST Create job by userId
  const addJobByUserId = useCallback(
    async (userId, jobData) => {
      try {
        const response = await sendRequest(
          `http://localhost:5000/api/jobs/create-job/${userId}`,
          "POST",
          JSON.stringify(jobData),
          { "Content-Type": "application/json" }
        );
        const updatedUser = {
          ...auth.user,
          jobs: [...auth.user.jobs, response.job],
        };
        updateUser(updatedUser);
      } catch (err) {}
    },
    [sendRequest, updateUser, auth.user]
  );

  //PATCH Job by userId
  const updateJobById = useCallback(
    async (jobId, updatedInfo) => {
      try {
        const response = await sendRequest(
          `http://localhost:5000/api/jobs/${jobId}`,
          "PATCH",
          JSON.stringify({ creatorId: updatedInfo }),
          { "Content-Type": "application/json" }
        );
        const jobToUpdate = auth.user.map((job) =>
          job._id === response.job._id ? response.job : job
        );
        const updatedJob = {
          ...auth.user,
          jobs: jobToUpdate,
        };
        updateUser(updatedJob);
      } catch (err) {}
    },
    [sendRequest, updateUser, auth.user]
  );

  //DELETE job by userId
  const deleteJobById = useCallback(
    async (jobId) => {
      try {
        const response = await sendRequest(
          `http://localhost:5000/api/jobs/${jobId}`,
          "DELETE"
        );
        const deletedJob = {
          ...auth.user,
          job: auth.user.jobs.filter((job) => job._id !== response.job._id),
        };

        updateUser(deletedJob);
      } catch (err) {}
    },
    [sendRequest, updateUser, auth.user]
  );

  return {
    jobs,
    addJobByUserId,
    getJobsByUserId,
    updateJobById,
    deleteJobById,
    isLoading,
    error,
    clearError,
  };
};
