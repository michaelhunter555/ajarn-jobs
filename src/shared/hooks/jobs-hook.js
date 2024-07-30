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

  //GET Jobs for API Cache
  const getJobsData = async (page, limit) => {
    const response = await fetch(
      `${process.env.REACT_APP_JOBS}?isHome=${true}&page=${page}&limit=${limit}`
    );

    if (!response.ok) {
      throw new Error("There was an error with retrieving the jobs Data.");
    }
    const data = await response.json();
    return data.jobs;
  };

  const getAllJobs = useCallback(
    async (page, limit) => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_JOBS}?page=${page}&limit=${limit}`
        );
        setJobs(response.jobs);
        return response.jobs;
      } catch {}
    },
    [sendRequest]
  );

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
      } catch (err) {
        console.log(err);
        throw err;
      }
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

  //GET job ads
  const getJobAds = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_JOBS}`);
      if (!response.ok) {
        throw new Error("There was an error with getJobAds");
      }
      const data = await response.json();

      return data.jobs;
    } catch (err) {
      console.log("There was an error getting the job ads - Msg: " + err);
    }
  };

  //get jobs by creatorId
  const getJobsByCreatorId = useCallback(
    async (creatorId, page, limit) => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_JOBS}/creator/${creatorId}?page=${page}&limit=${limit}`
        );
        setJobs(response.jobs);
        return {
          jobs: response.jobs,
          page: response.pageNum,
          totalPages: response.totalPages,
        };
      } catch (err) {}
    },
    [sendRequest]
  );

  //Get JobListings (if any)
  //get jobs by creatorId
  const getJobsJobListings = useCallback(
    async (creatorId, page, limit) => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_JOBS}/job-listings/${creatorId}?page=${page}&limit=${limit}`
        );
        setJobs(response.jobs);
        return {
          jobs: response.jobs,
          page: response.pageNum,
          totalPages: response.totalPages,
        };
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
    async (userId, buffetType) => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_JOBS}/activate-buffet/${userId}?buffetType=${buffetType}`,
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
          buffetStartDate: response.user.buffetStartDate,
          buffetEndDate: response.user.buffetEndDate,
        };
        updateUser(updatedUser);
      } catch (err) {}
    },
    [auth.user, sendRequest, updateUser, auth.token]
  );

  //POST Recruit Teacher
  const sendRecruitmentOffer = useCallback(
    async (recruitment) => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_JOBS}/recruit-teacher`,
          "POST",
          JSON.stringify({ recruitment }),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );
        if (!response.ok) {
          throw new Error(response.message);
        }
        return response;
      } catch (err) {
        console.log(err);
      }
    },
    [sendRequest, auth.token]
  );

  //DELETE job by userId
  const deleteJobById = useCallback(
    async (jobId, userId) => {
      setIsDeleting(true);
      try {
        await sendRequest(
          `${process.env.REACT_APP_JOBS}/delete-job/${jobId}`,
          "DELETE",
          null,
          {
            Authorization: "Bearer " + auth.token,
          }
        );
        //optimistic update - Be Careful!
        const deletedJob = {
          ...auth.user,
          jobs: auth.user?.jobs?.filter((job) => job?._id !== jobId),
        };
        /**
         * response.jobs,
         * auth.user.jobs.filter((item) => item._id !== jobId)
         */

        updateUser(deletedJob);
        setIsDeleting(false);
      } catch (err) {
        setIsDeleting(false);
        console.log(err);
      }
    },
    [sendRequest, updateUser, auth.user, auth.token]
  );

  const deleteManyJobsById = useCallback(
    async (jobIdArray) => {
      setIsDeleting(true);
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_JOBS}/bulk-job-delete`,
          "DELETE",
          JSON.stringify({ jobIds: jobIdArray }),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );

        if (!response.ok) {
          throw new Error(response.message);
        }

        setIsDeleting(false);
        return response.message;
      } catch (err) {
        setIsDeleting(false);
        console.log(err);
      }
    },
    [sendRequest, auth.token]
  );

  return {
    client,
    jobs,
    getJobsData,
    getJobsByCreatorId,
    activateTeacherBuffet,
    getAllJobs,
    getJobAds,
    getJobsJobListings,
    getJobById,
    addJobByUserId,
    getJobsByUserId,
    updateJobById,
    deleteJobById,
    deleteManyJobsById,
    sendRecruitmentOffer,
    isLoading,
    isPostLoading,
    isDeleting,
    error,
    clearError,
  };
};

export const useJobViolation = () => {
  const auth = useContext(AuthContext);
  const { isPostLoading, error, sendRequest, clearError } = useHttpClient();

  const sendJobViolation = useCallback(
    async (jobViolation) => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_JOBS}/job-post-violation`,
          "POST",
          JSON.stringify({ jobViolation }),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth?.token,
          }
        );
        if (!response.ok) {
          throw new Error(response.error);
        }
        return response.message;
      } catch (err) {
        console.log(err);
      }
    },
    [sendRequest, auth.token]
  );

  return {
    isPostLoading,
    sendJobViolation,
    error,
    clearError,
  };
};
