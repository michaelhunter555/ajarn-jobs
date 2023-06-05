import { useCallback, useContext } from "react";

import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "./http-hook";

export const useCreator = () => {
  const auth = useContext(AuthContext);
  const { updateUser, user } = auth;
  const { isLoading, isPostLoading, error, sendRequest, clearError } =
    useHttpClient();

  //PATCH update creator information
  const updateCreator = useCallback(
    async (userId, creatorItem) => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_USERS}/update-creator/${userId}`,
          "PATCH",
          JSON.stringify({ creator: creatorItem }),
          { "Content-Type": "application/json" }
        );

        console.log("RESPONSE-CREATOR_HOOK:", response.user.creator);

        const updatedCreator = {
          ...user,
          creator: response.user.creator,
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
    isPostLoading,
    error,
    clearError,
  };
};
