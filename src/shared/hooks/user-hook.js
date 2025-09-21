import { useCallback, useContext, useState } from "react";

import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "./http-hook";

export const useUser = () => {
  const auth = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const { updateUser } = auth;
  const { isLoading, isPostLoading, error, sendRequest, clearError, client } =
    useHttpClient();

  //Get All users
  const getAllUsers = useCallback(async () => {
    try {
      const response = await sendRequest(`${process.env.REACT_APP_USERS}`);
      setUsers(response.users);
      return response.users;
    } catch (err) {}
  }, [sendRequest]);

  //GET user cards for dashboard
  const getUserCard = async (page, limit) => {
    const response = await fetch(
      `${process.env.REACT_APP_USERS}?page=${page}&limit=${limit}`
    );

    if (!response.ok) {
      throw new Error("There was an error with getting all users GET request.");
    }
    const data = await response.json();
    return {
      users: data.users,
      totalPages: data.totalPages,
      page: data.pageNum,
      totalUsers: data.totalUsers,
    };
  };

  //GET logged in user information - should remove this use getUserProfileInfo
  const getUserInformation = useCallback(
    async (userId) => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_USERS}/${userId}`
        );
        updateUser(response.user);
        return response.user;
      } catch (err) {}
    },
    [updateUser, sendRequest]
  );

  ////GET logged in user information
  const getUserProfileInfo = async (userId) => {
    const response = await fetch(`${process.env.REACT_APP_USERS}/${userId}`);
    if (!response.ok) {
      throw new Error("There was an error with profile informatin retrievl.");
    }
    const data = await response.json();

    auth.updateUser(data.user);
    return data.user;
  };

  //*~AUTH TOKEN REQUIRED FOR HOOKS BELOW~*//

  //Remove RecruitsById
  const removeRecruitsById = useCallback(
    async (recruitIds) => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_USERS}/remove-recruits-by-id`,
          "DELETE",
          JSON.stringify({ recruitIds }),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );
        if (!response.ok) {
          throw new Error(response.message);
        }

        return response.message;
      } catch (err) {
        console.log(err);
      }
    },
    [sendRequest, auth.token]
  );

  //DELETE - remove application from job
  const removeApplicationFromJob = useCallback(
    async (applications, userId) => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_USERS}/remove-application-from-job/${userId}`,
          "DELETE",
          JSON.stringify({ applications }),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );

        if (!response.ok) {
          throw new Error(response.message);
        }
        return response.message;
      } catch (err) {}
    },
    [sendRequest, auth.token]
  );

  //DELETE - remove applicants
  const removeApplicantsById = useCallback(
    async (idsArray) => {
      try {
        const response = sendRequest(
          `${process.env.REACT_APP_USERS}/remove-applicants`,
          "DELETE",
          JSON.stringify({ userApplicants: idsArray }),
          {
            "Content-type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );

        if (!response.ok) {
          throw new Error(response.message);
        }
        return response.message;
      } catch (err) {}
    },
    [sendRequest, auth.token]
  );

  //respond to recruitments (if any)
  //get user recruitments
  const getUserRecruitments = async (userId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_USERS}/get-recruitment-offers/${userId}`,
        { headers: { Authorization: "Bearer " + auth.token } }
      );
      const data = await response.json();

      if (!data.ok) {
        throw new Error(data.message);
      }
      return {
        recruitments: data.recruitmentOffers,
        page: data.pageNum,
        totalPages: data.totalPages,
        totalOffers: data.totalRecruitmentOffers,
      };
    } catch (err) {
      console.log(err);
    }
  };

  const getEmployerRecruits = async (creatorId, page, limit) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_USERS}/get-employer-recruits/${creatorId}?page=${page}&limit=${limit}`,
        { headers: { Authorization: "Bearer " + auth.token } }
      );
      const data = await response.json();

      if (!data.ok) {
        throw new Error(data.message);
      }
      return {
        recruitments: data.recruitmentOffers,
        page: data.pageNum,
        totalPages: data.totalPages,
        totalOffers: data.totalRecruitmentOffers,
      };
    } catch (err) {
      console.log(err);
    }
  };

  //POST response to user recruitment offers
  const recruitmentOfferResponse = useCallback(
    async (userId, recruitmentResponse, recruitmentId) => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_USERS}/recruitment-offfer-response/${userId}`,
          "POST",
          JSON.stringify({ recruitmentResponse, recruitmentId }),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );
        if (!response.ok) {
          throw new Error(response.message);
        }
      } catch (err) {}
    },
    [sendRequest, auth.token]
  );

  //get user applications for dashboard
  const getUserApplications = async (userId, page, limit) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_USERS}/get-applications/${userId}?page=${page}&limit=${limit}`,
        { headers: { Authorization: "Bearer " + auth.token } }
      );

      if (!response.ok) {
        throw new Error(
          "There was an error getting users job applications list."
        );
      }

      const data = await response.json();
      return {
        applications: data.applications,
        page: data.pageNum,
        totalPages: data.totalPages,
        totalApplications: data.totalApplications,
      };
    } catch (err) {
      console.log(err);
    }
  };

  //GET applicants by creator(if a creator)
  const getApplicantsByCreator = async (page, limit) => {
    try {
      const response = await fetch(
        ///applicants/
        `${process.env.REACT_APP_USERS}/applicants/${auth?.user?.creator?._id}?page=${page}&limit=${limit}`,
        { headers: { Authorization: "Bearer " + auth.token } }
      );

      const data = await response.json();

      return data;
    } catch (err) {
      console.log("Error with the request: " + err);
    }
  };

  //
  //PATCH update userprofile
  const updateUserProfile = useCallback(
    async (userId, update) => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_USERS}/update-profile/${userId}`,
          "PATCH",
          update,
          { Authorization: "Bearer " + auth.token }
        );

        updateUser(response.user);
      } catch (err) {}
    },
    [sendRequest, updateUser, auth.token]
  );

  //PATCH Add credits - *deprecated - STRIPE HANDLES CREDITS NOW
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

  //POST user apply to jobs
  const applyToJob = useCallback(
    async (userId, jobId) => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_USERS}/${userId}/apply/${jobId}`,
          "POST",
          JSON.stringify({ coverLetter: auth.user?.coverLetter }),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );

        const updatedUser = {
          ...auth.user,
          applications: response.user.applications,
        };
        response.ok && updateUser(updatedUser);
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    [sendRequest, updateUser, auth.user, auth.token]
  );

  //POST
  const incomeDirectoryPost = useCallback(
    async (userId, incomePost) => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_USERS}/income-directory/${userId}`,
          "POST",
          JSON.stringify({ userIncomeData: incomePost }),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );
        const updatedUser = {
          ...auth.user,
          incomeDirectory: response.user.incomeDirectory,
        };
        updateUser(updatedUser);
      } catch (err) {
        console.log("Income Directory Post Error:" + err);
      }
    },
    [auth.user, updateUser, sendRequest, auth.token]
  );

    //DELETE - remove applicants
    const deleteUserById = useCallback(
      async (id) => {
        try {
          const response = await sendRequest(
            `${process.env.REACT_APP_USERS}/delete-user-by-id`,
            "DELETE",
            JSON.stringify({ userId: id }),
            {
              "Content-type": "application/json",
              Authorization: "Bearer " + auth.token,
            }
          );
  
          if (!response.ok) {
            throw new Error(response.message);
          }
          return response.message;
        } catch (err) {
          console.error("Delete user error:", err);
          throw err;
        }
      },
      [sendRequest, auth.token]
    );

  return {
    users,
    getAllUsers,
    getUserProfileInfo,
    getUserCard,
    getUserApplications,
    getApplicantsByCreator,
    getUserInformation,
    updateUserProfile,
    addCredits,
    applyToJob,
    incomeDirectoryPost,
    getUserRecruitments,
    recruitmentOfferResponse,
    getEmployerRecruits,
    removeApplicantsById,
    removeRecruitsById,
    removeApplicationFromJob,
    deleteUserById,
    isLoading,
    isPostLoading,
    error,
    clearError,
    client,
  };
};
