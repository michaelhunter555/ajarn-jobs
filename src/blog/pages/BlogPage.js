import React from "react";

import { useParams } from "react-router-dom";

import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";

import BlogPageItem from "../components/BlogPageItem";
import SideBlogList from "../components/SideBlogList";

const BlogPage = () => {
  const blogId = useParams().bid;

  const getBlogPostById = async () => {
    try {
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
    } catch (err) {
      console.log(err);
    }
  };
  const {
    data: content,
    refetch,
    isLoading,
  } = useQuery(["blogDetails", blogId], () => getBlogPostById());

  return (
    <Grid container direction="row" alignItems="start" spacing={1}>
      <Grid item xs={12} md={8}>
        <BlogPageItem
          content={content}
          refetchLikeState={refetch}
          isLoading={isLoading}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <SideBlogList />
      </Grid>
    </Grid>
  );
};

export default BlogPage;
