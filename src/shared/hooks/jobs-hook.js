import { useCallback, useContext, useState } from "react";

import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "./http-hook";

export const useJob = () => {
  const auth = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const { updateUser } = auth;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  //POST Create job by userId
  const addJobByUserId = useCallback(
    async (userId, jobData) => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_JOBS}/create-job/${userId}`,
          "POST",
          JSON.stringify({
            ...jobData,
            creatorData: {
              company: auth.user.creator.company,
              companySize: auth.user.creator.companySize,
              headquarters: auth.user.creator.headquarters,
              eastablished: auth.user.creator.established,
              presence: auth.user.creator.presence,
              about: auth.user.creator.about,
            },
          }),
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

  //GET all jobs by userId
  const getJobsByUserId = useCallback(
    async (userId) => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_JOBS}/user/${userId}`
        );
        console.log("JOB RESPONSE", response);
        setJobs(response.jobs);
      } catch (err) {}
    },
    [sendRequest]
  );

  //Get jobs by Id ${jid}
  const getJobById = useCallback(
    async (jobId) => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_JOBS}/${jobId}`
        );
        setJobs(response.job);
      } catch (err) {}
    },
    [sendRequest]
  );

  //PATCH Job by userId
  const updateJobById = useCallback(
    async (jobId, updatedInfo) => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_JOBS}/${jobId}`,
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
          `${process.env.REACT_APP_JOBS}/${jobId}`,
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
    getJobById,
    addJobByUserId,
    getJobsByUserId,
    updateJobById,
    deleteJobById,
    isLoading,
    error,
    clearError,
  };
};
