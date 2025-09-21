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
        // Check if there's a PDF file to upload
        const hasPdfFile = update.pdfResume && update.pdfResume instanceof File;
        
        let requestData;
        let headers;
        
        if (hasPdfFile) {
          // Use FormData for file upload
          requestData = new FormData();
          requestData.append('resume', JSON.stringify(update));
          requestData.append('resumeId', update._id);
          requestData.append('pdfResume', update.pdfResume);
          headers = {
            Authorization: "Bearer " + auth.token,
          };
        } else {
          // Use JSON for regular updates
          requestData = JSON.stringify({ resume: update });
          headers = {
            "Content-type": "application/json",
            Authorization: "Bearer " + auth.token,
          };
        }
        
        const response = await sendRequest(
          //We expect dynamic userId
          `${process.env.REACT_APP_USERS}/update-profile/${userId}`,
          "PATCH",
          requestData,
          headers
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
    [sendRequest, updateUser, auth.user, auth.token]
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
          {
            "Content-type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );
        //update the currentUser client side
        const deleteResume = {
          ...auth.user,
          resume: auth.user?.resume?.filter((r) => r?._id !== resumeItem?._id),
        };
        updateUser(deleteResume);
      } catch (err) {}
    },
    [sendRequest, updateUser, auth.user, auth.token]
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
