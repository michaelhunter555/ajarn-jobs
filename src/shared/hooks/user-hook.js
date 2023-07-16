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

  //GET logged in user information
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
