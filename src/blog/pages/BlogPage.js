import React from "react";

import { useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import BlogPageItem from "../components/BlogPageItem";

const BlogPage = () => {
  const blogId = useParams().bid;

  const getBlogPostById = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BLOG}/post/${blogId}`
    );
    if (!response.ok) {
      throw new Error(
        "There was an error retreiving the blog details for this post."
      );
    }
    const data = await response.json();
    return data.blogPost;
  };
  const {
    data: content,
    refetch,
    isLoading,
  } = useQuery(["blogDetails"], () => getBlogPostById());

  const getBlogList = async () => {
    const response = await fetch(`${process.env.REACT_APP_BLOG}`);

    if (!response.ok) {
      throw new Error(
        "There was an error retreiving the blog details for this post."
      );
    }

    const data = await response.json();
    return data.blogList;
  };

  const { data: blogList } = useQuery(["otherContentPosts"], () =>
    getBlogList()
  );

  return (
    <BlogPageItem
      content={content}
      refetchLikeState={refetch}
      isLoading={isLoading}
    />
  );
};

export default BlogPage;
