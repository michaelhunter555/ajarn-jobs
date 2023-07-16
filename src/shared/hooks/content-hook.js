import { useCallback, useContext, useState } from "react";

import _ from "lodash";

import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "./http-hook";

//************UseComntent Hook*************
export const useContent = () => {
  const auth = useContext(AuthContext);
  const [contentPostLikes, setContentPostLikes] = useState(0);
  const [contentPostDislikes, setContentPostDislikes] = useState(0);
  const [isPostLikeLoading, setIsPostLikeLoading] = useState(false);
  const [isPostDislikeLoading, setIsPostDislikeLoading] = useState(false);
  const [content, setContent] = useState([]);
  const { updateUser } = auth;
  const { isLoading, isPostLoading, sendRequest, error, clearError } =
    useHttpClient();
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalDislikes, setTotalDislikes] = useState(0);

  //GET blogPostById
  const getBlogPostById = useCallback(
    async (blogId) => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BLOG}/post/${blogId}`
        );
        if (!response.ok) {
          throw new Error(
            "There was an error retreiving the blog details for this post."
          );
        }
        const data = await response.json();
        setContent(data.blogPost);
        return data.blogPost;
      } catch (err) {
        console.log(err);
      }
    },
    [sendRequest]
  );

  //GET Total likes
  const getTotalLikes = useCallback(
    async (blogId) => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BLOG}/post/likes/${blogId}`
        );
        setTotalLikes(response.postLikeCount);
        return response.postLikeCount;
      } catch (err) {}
    },
    [sendRequest]
  );

  //GET Total likes
  const getTotalDislikes = useCallback(
    async (blogId) => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BLOG}/post/dislikes/${blogId}`
        );
        setTotalDislikes(response.postDislikeCount);
        return response.postDislikeCount;
      } catch (err) {}
    },
    [sendRequest]
  );

  //create a blog post - POST
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

  //PATCH like content post
  const likeContentPost = useCallback(
    async (blogId, userId, contentLiked) => {
      setIsPostLikeLoading(true);
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BLOG}/post/${blogId}/like/${userId}`,
          "PATCH",
          JSON.stringify({
            postLike: !contentLiked,
            postId: blogId,
            userId: userId,
          }),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );
        setIsPostLikeLoading(false);
        setContentPostLikes(response.contentLikes);
      } catch (err) {
        console.log("like content Post Error:", err);
      }
    },
    [auth.token, sendRequest]
  );

  const throttledLike = _.throttle(
    (...args) => {
      likeContentPost(...args);
    },
    500,
    { trailing: false }
  );

  //PATCH dislike content post
  const dislikeContentPost = useCallback(
    async (blogId, userId, contentDisliked) => {
      setIsPostDislikeLoading(true);
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BLOG}/post/${blogId}/dislike/${userId}`,
          "PATCH",
          JSON.stringify({
            postDislike: !contentDisliked,
          }),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );
        setIsPostDislikeLoading(false);
        setContentPostDislikes(response.contentDislikes);
      } catch (err) {
        console.log("dislike Content Post Error:", err);
      }
    },
    [auth.token, sendRequest]
  );

  //DELETE content post
  const deleteContentPost = useCallback(
    async (postId) => {
      try {
        const deletedPost = {
          ...auth.user,
          blogPosts: auth.user.blogPosts.filter((post) => post._id !== postId),
        };
        updateUser(deletedPost);

        console.log("DELETE INITIATED");
        const response = await sendRequest(
          `${process.env.REACT_APP_BLOG}/post/${postId}`,
          "DELETE",
          null,
          {
            Authorization: "Bearer " + auth.token,
          }
        );
        if (!response.ok) {
          updateUser({
            ...auth.user,
            blogPosts: auth.user?.blogPosts,
          });
        }

        console.log("DELETE COMPLETE");
      } catch (err) {
        console.log("DELETE FAILED");
        updateUser({
          ...auth.user,
          blogPosts: auth.user?.blogPosts,
        });
        console.log(
          "There was an issue with the request to delete the blog post." + err
        );
      }
    },
    [auth.user, auth.token, sendRequest, updateUser]
  );

  return {
    isLoading,
    isPostLoading,
    isPostLikeLoading,
    isPostDislikeLoading,
    error,
    clearError,
    dislikeContentPost,
    likeContentPost,
    throttledLike,
    getBlogPostById,
    getTotalLikes,
    getTotalDislikes,
    totalLikes,
    totalDislikes,
    content,
    createContentPost,
    contentPostLikes,
    contentPostDislikes,
    updateContentPost,
    deleteContentPost,
  };
};

//************UseComment Hook*************
export const useComment = () => {
  const auth = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [commentLikes, setCommentLikes] = useState(0);
  const [commentDislikes, setCommentDislikes] = useState(0);
  const [isCommentLikeLoading, setIsCommentLikeLoading] = useState(false);
  const [isCommentDislikesLoading, setIsCommentDislikesLoading] =
    useState(false);

  const { isPostLoading, sendRequest, error, clearError, isLoading } =
    useHttpClient();

  //POST Comment
  const addComment = useCallback(
    async (userId, blogId, comment) => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BLOG}/add-comment/${userId}/post/${blogId}`,
          "POST",
          comment,
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );
      } catch (err) {
        console.log("ERROR FROM USE COMMENT HOOK:", err);
      }
    },
    [sendRequest, auth.token]
  );

  //GET Comments by Id
  const getComments = useCallback(
    async (blogId) => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BLOG}/post/comments/${blogId}`
        );
        setComments(response.comments);

        return response.comments;
      } catch (err) {
        console.log(
          "There was an error with the request for retrieving comments." + err
        );
      }
    },
    [sendRequest]
  );

  //GET total likes
  const getTotalCommentLikes = useCallback(
    async (blogId) => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BLOG}/post/comments/likes/${blogId}`
        );

        setCommentLikes(response.totalCommentLikes);
      } catch (err) {}
    },
    [sendRequest]
  );

  //GET total Dislikes
  const getTotalCommentDislikes = useCallback(
    async (blogId) => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BLOG}/post/comments/dislikes/${blogId}`
        );

        setCommentDislikes(response.totalCommentLikes);
      } catch (err) {}
    },
    [sendRequest]
  );

  //PATCH like comment on content post
  const likeComment = useCallback(
    async (blogId, userId, commentId) => {
      setIsCommentLikeLoading(true);
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BLOG}/post/${blogId}/comment/like/${userId}`,
          "PATCH",
          JSON.stringify({ commentId: commentId }),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );
        setCommentLikes(response.commentLikes);
        setIsCommentLikeLoading(false);
      } catch (err) {
        console.log("likeComment Error:", err);
        setIsCommentLikeLoading(false);
      }
    },
    [auth.token, sendRequest]
  );

  //PATCH dislike comment on content post
  const dislikeComment = useCallback(
    async (blogId, userId, commentId) => {
      setIsCommentDislikesLoading(false);
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BLOG}/post/${blogId}/comment/dislike/${userId}`,
          "PATCH",
          JSON.stringify({ commentId: commentId }),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );
        setCommentDislikes(response.commentDislikes);
        setIsCommentDislikesLoading(false);
      } catch (err) {
        console.log("dislikeComment Error:", err);
        setIsCommentDislikesLoading(false);
      }
    },
    [auth.token, sendRequest]
  );

  //DELETE comment by Id
  const deleteCommentById = useCallback(
    async (commentId, blogId) => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BLOG}/delete-comment/${commentId}/post/${blogId}`,
          "DELETE",
          null,
          { Authorization: "Bearer " + auth.token }
        );
        return response.blogComments;
      } catch (err) {}
    },
    [auth.token, sendRequest]
  );

  return {
    addComment,
    getComments,
    likeComment,
    dislikeComment,
    deleteCommentById,
    getTotalCommentLikes,
    getTotalCommentDislikes,
    isCommentLikeLoading,
    isCommentDislikesLoading,
    commentDislikes,
    commentLikes,
    comments,
    isLoading,
    isPostLoading,
    error,
    clearError,
  };
};
