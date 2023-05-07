import { useCallback, useContext } from "react";

import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "./http-hook";

export const useSettingsToggle = () => {
  const auth = useContext(AuthContext);
  const { updateUser } = auth;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  //PATCH toggle between teacher or employer
  const updateRoleChange = useCallback(
    async (userId) => {
      const isTeacher = auth.user?.userType === "teacher";
      try {
        const response = await sendRequest(
          `http://localhost:5000/api/user/update-profile/${userId}`,
          "PATCH",
          JSON.stringify({ userType: isTeacher ? "employer" : "teacher" }),
          { "Content-Type": "application/json" }
        );
        console.log("ROLECHANGE_RESPONSE:", response);
        updateUser(response.user);
      } catch (e) {}
    },
    [sendRequest, updateUser, auth.user?.userType]
  );

  //PATCH isHidden property for search results.
  const updateUserVisibility = useCallback(
    async (userId) => {
      const isHidden = auth.user?.isHidden;
      try {
        const response = await sendRequest(
          `http://localhost:5000/api/user/update-profile/${userId}`,
          "PATCH",
          JSON.stringify({ isHidden: !isHidden }),
          { "Content-Type": "application/json" }
        );

        updateUser(response.user);
      } catch (e) {}
    },
    [sendRequest, updateUser, auth.user?.isHidden]
  );

  return {
    updateRoleChange,
    updateUserVisibility,
    isLoading,
    error,
    clearError,
  };
};
