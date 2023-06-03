import { useCallback, useContext } from "react";

import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "./http-hook";

export const useCreator = () => {
  const auth = useContext(AuthContext);
  const { updateUser, user } = auth;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  //PATCH update creator information
  const updateCreator = useCallback(
    async (userId, creatorItem) => {
      try {
        await sendRequest(
          `${process.env.REACT_APP_USERS}/update-profile/${userId}`,
          "PATCH",
          JSON.stringify({ creator: creatorItem }),
          { "Content-Type": "application/json" }
        );

        const updatedCreator = {
          ...user,
          creator: creatorItem,
        };
        updateUser(updatedCreator);
      } catch (err) {}
    },
    [sendRequest, updateUser, user]
  );

  //PATCH remove Creator Data
  const deleteCreator = useCallback(
    async (userId, creatorItem) => {
      try {
        await sendRequest(
          `${process.env.REACT_APP_USERS}/update-profile/${userId}`,
          "PATCH",
          JSON.stringify({ deleteCreator: creatorItem._id }),
          { "Content-Type": "application/json" }
        );
        const deletedCreator = {
          ...user,
          creator: null,
        };
        updateUser(deletedCreator);
      } catch (e) {}
    },
    [sendRequest, updateUser, user]
  );

  return {
    updateCreator,
    deleteCreator,
    sendRequest,
    isLoading,
    error,
    clearError,
  };
};
