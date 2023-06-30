import React from "react";

import { useQuery } from "@tanstack/react-query";

import MainFeaturedPost from "./MainFeaturedPost";

const BlogContent = () => {
  const getUserContent = async () => {
    const response = await fetch(`${process.env.REACT_APP_BLOG}`);

    if (!response.ok) {
      throw new Error("There was an error with the request.");
    }

    const data = await response.json();
    return data.blogList;
  };

  const { data: featuredContent, isLoading } = useQuery(
    ["userHomeContent"],
    () => getUserContent()
  );

  return <MainFeaturedPost isLoading={isLoading} post={featuredContent} />;
};

export default BlogContent;
