import { useCallback, useContext } from "react";

import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "./http-hook";

export const useResume = () => {
  const auth = useContext(AuthContext);
  const { updateUser } = auth;
  const { isLoading, isPostLoading, error, sendRequest, clearError } =
    useHttpClient();

  const updateUserResume = useCallback(
    async (userId, update) => {
      try {
        const response = await sendRequest(
          //We expect dynamic userId
          `${process.env.REACT_APP_USERS}/update-profile/${userId}`,
          "PATCH",
          //property to be updated "resume" on user object
          JSON.stringify({ resume: update }),
          { "Content-type": "application/json" }
        );
        //create object with copy of existing user data and updated response.
        //if _id matches then we update, otherwise new resumeItem
        const updatedResume = {
          ...auth.user,
          resume: response.user?.resume?.map((resumeItem) => {
            return resumeItem?._id === update._id ? update : resumeItem;
          }),
        };
        //update authContext
        updateUser(updatedResume);
      } catch (err) {}
    },
    [sendRequest, updateUser, auth.user]
  );

  const deleteUserResume = useCallback(
    async (userId, resumeItem) => {
      try {
        await sendRequest(
          //We expect a dynamic Id to update the profile and Patch to update the user object
          `${process.env.REACT_APP_USERS}/update-profile/${userId}`,
          "PATCH",
          //we send deleteResume key in the req.body (req.body.deleteResume)
          //see => /backend/controllers/users/update-user-profile.js
          JSON.stringify({ deleteResume: resumeItem }),
          { "Content-Type": "application/json" }
        );
        //update the currentUser client side
        const deleteResume = {
          ...auth.user,
          resume: auth.user.resume.filter((r) => r._id !== resumeItem._id),
        };
        updateUser(deleteResume);
      } catch (err) {}
    },
    [sendRequest, updateUser, auth.user]
  );

  return {
    updateUserResume,
    deleteUserResume,
    isPostLoading,
    isLoading,
    error,
    clearError,
  };
};
