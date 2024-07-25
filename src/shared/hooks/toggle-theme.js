import { useCallback, useContext } from "react";

import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "./http-hook";

export const useToggleUserTheme = () => {
  const auth = useContext(AuthContext);
  const { sendRequest, isPostLoading } = useHttpClient();

  const updateUserTheme = useCallback(
    async (userId, theme) => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_USERS}/toggle-theme/${userId}`,
          "POST",
          JSON.stringify({ theme }),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );

        if (!response.ok) {
          throw new Error(response.message);
        }
        return response.theme;
      } catch (err) {}
    },
    [sendRequest, auth.token]
  );

  return {
    updateUserTheme,
    isPostLoading,
  };
};
