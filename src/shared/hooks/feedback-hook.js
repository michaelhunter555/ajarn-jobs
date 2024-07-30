import { useCallback, useContext } from "react";

import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "./http-hook";

export const useFeedback = () => {
  const auth = useContext(AuthContext);
  const { sendRequest, isPostLoading, error, clearError } = useHttpClient();

  const postFeedback = useCallback(
    async (userId, feedback) => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_USERS}/user-feedback/${userId}`,
          "POST",
          JSON.stringify({ feedback }),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
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
    postFeedback,
    isPostLoading,
    error,
    clearError,
  };
};
