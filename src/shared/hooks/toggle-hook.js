import { useCallback, useContext } from "react";

import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "./http-hook";

export const useSettingsToggle = () => {
  const auth = useContext(AuthContext);
  const { updateUser } = auth;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  //PATCH toggle between teacher or employer//DEPRECATED***DONOTUSE
  const updateRoleChange = useCallback(
    async (userId) => {
      const isTeacher = auth.user?.userType === "teacher";
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_USERS}/update-role/${userId}`,
          "PATCH",
          JSON.stringify({ userType: isTeacher ? "employer" : "teacher" }),
          { "Content-Type": "application/json" }
        );

        const updatedUser = {
          ...auth.user,
          userType: response.user?.userType,
        };
        updateUser(updatedUser);
      } catch (e) {}
    },
    [sendRequest, updateUser, auth.user]
  );

  //PATCH isHidden property for search results.
  const updateUserVisibility = useCallback(
    async (userId) => {
      const isHidden = auth.user?.isHidden;
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_USERS}/update-visibility/${userId}`,
          "PATCH",
          JSON.stringify({ isHidden: !isHidden }),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );
        const updatedUser = {
          ...auth.user,
          isHidden: response.user.isHidden,
        };

        updateUser(updatedUser);
      } catch (e) {}
    },
    [sendRequest, updateUser, auth.user, auth.token]
  );

  return {
    updateRoleChange,
    updateUserVisibility,
    isLoading,
    error,
    clearError,
  };
};
