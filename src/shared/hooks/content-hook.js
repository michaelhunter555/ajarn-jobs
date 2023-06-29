import { useCallback, useContext } from "react";

import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "./http-hook";

export const useContent = () => {
  const auth = useContext(AuthContext);
  const { updateUser } = auth;
  const { isLoading, postIsLoading, sendRequest, error, clearError } =
    useHttpClient();

  //create a blog post
  const createContentPost = useCallback(
    async (userId, blogPost) => {
      const { title, postContent, category } = blogPost;
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BLOG}/new-post/${userId}`,
          "POST",
          JSON.stringify({
            title: title,
            postContent: postContent,
            category: category,
          }),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );

        const updatedUser = {
          ...auth.user,
          blogPosts: [...auth.user?.blogPosts, response.blogPost],
        };

        updateUser(updatedUser);
      } catch (err) {
        console.log("Error with the blog post:" + err);
      }
    },
    [updateUser, auth.user, auth.token, sendRequest]
  );

  //PATCH update content post
  const updateContentPost = useCallback(
    async (postId, updatedPost) => {
      try {
        const response = await sendRequest(
          `
                ${process.env.REACT_APP_BLOG}/post/${postId}`,
          "PATCH",
          JSON.Strigify({ updatedPost: updatedPost }),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );

        const updatedUser = {
          ...auth.user,
          blogPosts: response.user?.blogPosts?.map((currentPost) => {
            return currentPost?._id === updatedPost?._id
              ? updatedPost
              : currentPost;
          }),
        };
        updateUser(updatedUser);
      } catch (err) {
        console.log("There was an error updating the blog post.");
      }
    },
    [updateUser, sendRequest, auth.user, auth.token]
  );

  //DELETE content post
  const deleteContentPost = useCallback(
    async (postId) => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BLOG}/post/${postId}`,
          "DELETE",
          null,
          {
            Authorization: "Bearer " + auth.token,
          }
        );
        const deletedPost = {
          ...auth.user,
          blogPosts: response.user.blogPosts.filter(
            (post) => post._id !== postId
          ),
        };
        updateUser(deletedPost);
      } catch (err) {
        console.log(
          "There was an issue with the request to delete the blog post." + err
        );
      }
    },
    [auth.user, auth.token, sendRequest, updateUser]
  );

  return {
    isLoading,
    postIsLoading,
    error,
    clearError,
    createContentPost,
    updateContentPost,
    deleteContentPost,
  };
};
