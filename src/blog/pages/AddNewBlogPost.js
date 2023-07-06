import React, { useState } from "react";

import moment from "moment";

import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import TeflBanner from "../../shared/components/UIElements/TeflBanner";
import BlogFilter from "../components/BlogFilter";
import BlogPostForm from "../components/BlogPostForm";
import ContentPostList from "../components/ContentPostList";

const AddNewBlogPost = () => {
  const [filter, setFilter] = useState();

  const getAllBlogPosts = async () => {
    const response = await fetch(`${process.env.REACT_APP_BLOG}`);

    if (!response.ok) {
      throw new Error("There was an issue with the response.");
    }
    const data = await response.json();
    console.log(data);
    return data.blogList;
  };

  const {
    data: blogPosts,
    isLoading,
    refetch,
  } = useQuery(["AllBlogPosts"], () => getAllBlogPosts());

  const incomingBlogPostHandler = () => {
    refetch();
  };

  const handleFilterChange = (filterData) => {
    setFilter(filterData);
  };

  const filteredContent =
    blogPosts &&
    blogPosts.filter((searchContent) => {
      return (
        (!filter?.category ||
          searchContent?.category
            ?.toLowerCase()
            ?.includes(filter?.category?.toLowerCase())) &&
        (!filter?.date ||
          moment(searchContent?.date).format("YYYY-MM-DD") >=
            moment(filter?.date).format("YYYY-MM-DD")) &&
        (!filter?.search ||
          searchContent.title
            .toLowerCase()
            .includes(filter.search.toLowerCase()))
      );
    });

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      spacing={0}
      sx={{ margin: 5, padding: 5 }}
    >
      <Grid item xs={12} sm={6}>
        <Stack direction="column" spacing={1}>
          <Typography variant="h3" color="text.primary">
            Welcome to Ajarn Content!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Here you will find user submitted posts and questions
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            As always due your due dillegence as an online netizen
          </Typography>
          <Divider />
          <BlogPostForm onBlogPostCreated={incomingBlogPostHandler} />
        </Stack>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Stack sx={{ margin: "0 2rem" }}>
          <Box sx={{ width: "50%" }}>
            <TeflBanner />
          </Box>
          <BlogFilter onDataChange={handleFilterChange} />
          <ContentPostList
            isLoading={isLoading}
            filteredContent={filteredContent}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default AddNewBlogPost;
