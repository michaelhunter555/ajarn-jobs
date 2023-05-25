import { useContext } from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "./http-hook";

//const { users } = useQueryFetch('key', userId);
//const { jobs } = useQueryFetch('jobs', userId);
//const { getUserInformation } = useQueryFetch('userInfo, userId, `user/${userId}`);

export const useQueryFetch = (key, userId) => {
  const auth = useContext(AuthContext);
  const { updateUser } = auth;
  const queryClient = useQueryClient();
  const { client, isLoading, error, clearError } = useHttpClient();

  //Query for all users
  const { data: users } = useQuery([key], async () => {
    const response = await client.query(`${process.env.REACT_APP_USERS}`);
    return response.users;
  });

  //Query for jobs by userId
  const { data: jobs } = useQuery([key, userId], async () => {
    const response = await client.query(
      `${process.env.REACT_APP_JOBS}/user/${userId}`
    );
    return response.jobs;
  });

  //get logged in user info
  const { data: getUserInformation } = useQuery([key, userId], async () => {
    const response = await client.query(
      `${process.env.REACT_APP_USERS}/${userId}`
    );
    queryClient.setQueryData([key, userId], response.user);
    updateUser(response.user);
    return response.user;
  });

  return {
    users,
    jobs,
    getUserInformation,
    key,
    userId,
    isLoading,
    error,
    clearError,
  };
};
