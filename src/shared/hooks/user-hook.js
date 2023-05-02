import { useCallback, useContext } from "react";

import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "./http-hook";

export const useUser = () => {
  const auth = useContext(AuthContext);
  const { updateUser } = auth;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const getUserInformation = useCallback(
    async (userId) => {
      try {
        const response = await sendRequest(
          `http://localhost:5000/api/user/${userId}`
        );
        updateUser(response.user);
      } catch (err) {}
    },
    [updateUser, sendRequest]
  );

  const updateUserProfile = useCallback(
    async (userId, update) => {
      try {
        const response = await sendRequest(
          `http://localhost:5000/api/user/update-profile/${userId}`,
          "PATCH",
          JSON.stringify(update),
          { "Content-Type": "application/json" }
        );
        updateUser(response.user);
      } catch (err) {}
    },
    [sendRequest, updateUser]
  );

  return {
    getUserInformation,
    updateUserProfile,
    isLoading,
    error,
    clearError,
  };
};
