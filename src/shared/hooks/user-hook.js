import { useCallback, useContext } from "react";

import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "./http-hook";

export const useUser = () => {
  const auth = useContext(AuthContext);
  const { updateUser } = auth;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  //GET logged in user information
  const getUserInformation = useCallback(
    async (userId) => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_USERS}/${userId}`
        );
        updateUser(response.user);
      } catch (err) {}
    },
    [updateUser, sendRequest]
  );

  //PATCH update userprofile
  const updateUserProfile = useCallback(
    async (userId, update) => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_USERS}/${userId}`,
          "PATCH",
          JSON.stringify(update),
          { "Content-Type": "application/json" }
        );
        updateUser(response.user);
      } catch (err) {}
    },
    [sendRequest, updateUser]
  );

  //PATCH
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

  return {
    getUserInformation,
    updateUserProfile,
    addCredits,
    isLoading,
    error,
    clearError,
  };
};
