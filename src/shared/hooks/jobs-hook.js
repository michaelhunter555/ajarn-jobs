import { useCallback, useContext, useState } from "react";

import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "./http-hook";

export const useJob = () => {
  const auth = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const { updateUser } = auth;
  const { isLoading, isPostLoading, error, sendRequest, clearError, client } =
    useHttpClient();

  const getAllJobs = useCallback(async () => {
    try {
      const response = await sendRequest(`${process.env.REACT_APP_JOBS}`);
      setJobs(response.jobs);
      return response.jobs;
    } catch {}
  }, [sendRequest]);

  //POST Create job by userId
  const addJobByUserId = useCallback(
    async (userId, jobData, jobCost) => {
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
              established: auth.user.creator.established,
              presence: auth.user.creator.presence,
              about: auth.user.creator.about,
            },
            credits: jobCost,
          }),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );
        const updatedUser = {
          ...auth.user,
          jobs: [...auth.user.jobs, response.job],
          credits: auth.user.credits - jobCost,
        };
        updateUser(updatedUser);
      } catch (err) {}
    },
    [sendRequest, updateUser, auth.user, auth.token]
  );

  //GET all jobs by userId
  const getJobsByUserId = useCallback(
    async (userId) => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_JOBS}/user/${userId}`
        );
        setJobs(response.jobs);
        return response.jobs;
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
        return response.job;
      } catch (err) {}
    },
    [sendRequest]
  );

  //PATCH Job by userId
  const updateJobById = useCallback(
    async (jobId, updatedInfo) => {
      const { title, description } = updatedInfo;
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_JOBS}/${jobId}`,
          "PATCH",
          JSON.stringify({
            title: title,
            description: description,
          }),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );
        const jobToUpdate = auth.user?.jobs.map((job) =>
          job?._id === response.job._id ? response.job : job
        );
        const updatedJob = {
          ...auth.user,
          jobs: jobToUpdate,
        };
        updateUser(updatedJob);
      } catch (err) {}
    },
    [sendRequest, updateUser, auth.user, auth.token]
  );

  //Patch - activate teacher buffet
  const activateTeacherBuffet = useCallback(
    async (userId) => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_JOBS}/activate-buffet/${userId}`,
          "PATCH",
          JSON.stringify({ buffetIsActive: true, lastActiveDate: new Date() }),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );

        const updatedUser = {
          ...auth.user,
          buffetIsActive: response.user.buffetIsActive, //NEEDS TO BE CHANGED TO response.user.buffetIsActive this is only for testing purposes with existing users who do not have this new property
          credits: response.user.credits,
        };
        updateUser(updatedUser);
      } catch (err) {}
    },
    [auth.user, sendRequest, updateUser, auth.token]
  );

  //DELETE job by userId
  const deleteJobById = useCallback(
    async (jobId, userId) => {
      setIsDeleting(true);
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_JOBS}/${jobId}`,
          "DELETE",
          null,
          {
            Authorization: "Bearer " + auth.token,
          }
        );
        const deletedJob = {
          ...auth.user,
          jobs: response.jobs,
        };

        updateUser(deletedJob);
        setIsDeleting(false);
      } catch (err) {
        setIsDeleting(false);
        console.log(err);
      }
    },
    [sendRequest, updateUser, auth.user, auth.token]
  );

  return {
    client,
    jobs,
    activateTeacherBuffet,
    getAllJobs,
    getJobById,
    addJobByUserId,
    getJobsByUserId,
    updateJobById,
    deleteJobById,
    isLoading,
    isPostLoading,
    isDeleting,
    error,
    clearError,
  };
};
