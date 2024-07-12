import { useCallback, useContext, useState } from "react";

import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "./http-hook";

export const useUser = () => {
  const auth = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const { updateUser } = auth;
  const { isLoading, isPostLoading, error, sendRequest, clearError, client } =
    useHttpClient();

  //Get All users
  const getAllUsers = useCallback(async () => {
    try {
      const response = await sendRequest(`${process.env.REACT_APP_USERS}`);
      setUsers(response.users);
      return response.users;
    } catch (err) {}
  }, [sendRequest]);

  //get user applications for dashboard
  const getUserApplications = async (userId, page, limit) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_USERS}/get-applications/${userId}?page=${page}&limit=${limit}`
      );

      if (!response.ok) {
        throw new Error(
          "There was an error getting users job applications list."
        );
      }

      const data = await response.json();
      return {
        applications: data.applications,
        page: data.pageNum,
        totalPages: data.totalPages,
        totalApplications: data.totalApplications,
      };
    } catch (err) {
      console.log(err);
    }
  };

  //GET user cards for dashboard
  const getUserCard = async (page, limit) => {
    const response = await fetch(
      `${process.env.REACT_APP_USERS}?page=${page}&limit=${limit}`
    );

    if (!response.ok) {
      throw new Error("There was an error with getting all users GET request.");
    }
    const data = await response.json();
    return {
      users: data.users,
      totalPages: data.totalPages,
      page: data.pageNum,
      totalUsers: data.totalUsers,
    };
  };

  //GET logged in user information - should remove this use getUserProfileInfo
  const getUserInformation = useCallback(
    async (userId) => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_USERS}/${userId}`
        );
        updateUser(response.user);
        return response.user;
      } catch (err) {}
    },
    [updateUser, sendRequest]
  );

  ////GET logged in user information
  const getUserProfileInfo = async (userId) => {
    const response = await fetch(`${process.env.REACT_APP_USERS}/${userId}`);
    if (!response.ok) {
      throw new Error("There was an error with profile informatin retrievl.");
    }
    const data = await response.json();

    auth.updateUser(data.user);
    return data.user;
  };

  //GET applicants by creator(if a creator)
  const getApplicantsByCreator = async (page, limit) => {
    try {
      const response = await fetch(
        ///applicants/
        `${process.env.REACT_APP_USERS}/applicants/${auth?.user?.creator?._id}?page=${page}&limit=${limit}`
      );

      const data = await response.json();

      return data;
    } catch (err) {
      console.log("Error with the request: " + err);
    }
  };

  //

  //PATCH update userprofile
  const updateUserProfile = useCallback(
    async (userId, update) => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_USERS}/update-profile/${userId}`,
          "PATCH",
          update
        );

        updateUser(response.user);
      } catch (err) {}
    },
    [sendRequest, updateUser]
  );

  //PATCH Add credits
  const addCredits = useCallback(
    async (userId, credits) => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_USERS}/${userId}/add-credits`,
          "PATCH",
          JSON.stringify({ credits: credits }),
          { "Content-Type": "application/json" }
        );
        const updatedUser = {
          ...auth.user,
          credits: response.credits,
        };
        updateUser(updatedUser);
      } catch (err) {}
    },
    [sendRequest, updateUser, auth.user]
  );

  //POST user apply to jobs
  const applyToJob = useCallback(
    async (userId, jobId) => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_USERS}/${userId}/apply/${jobId}`,
          "POST",
          JSON.stringify({ coverLetter: auth.user?.coverLetter }),
          { "Content-Type": "application/json" }
        );

        const updatedUser = {
          ...auth.user,
          applications: response.user.applications,
        };
        response.ok && updateUser(updatedUser);
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    [sendRequest, updateUser, auth.user]
  );

  //POST
  const incomeDirectoryPost = useCallback(
    async (userId, incomePost) => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_USERS}/income-directory/${userId}`,
          "POST",
          JSON.stringify({ userIncomeData: incomePost }),
          { "Content-Type": "application/json" }
        );
        const updatedUser = {
          ...auth.user,
          incomeDirectory: response.user.incomeDirectory,
        };
        updateUser(updatedUser);
      } catch (err) {
        console.log("Income Directory Post Error:" + err);
      }
    },
    [auth.user, updateUser, sendRequest]
  );

  return {
    users,
    getAllUsers,
    getUserProfileInfo,
    getUserCard,
    getUserApplications,
    getApplicantsByCreator,
    getUserInformation,
    updateUserProfile,
    addCredits,
    applyToJob,
    incomeDirectoryPost,
    isLoading,
    isPostLoading,
    error,
    clearError,
    client,
  };
};
