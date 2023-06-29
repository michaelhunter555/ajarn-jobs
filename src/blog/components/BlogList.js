import React from "react";

import { useQuery } from "@tanstack/react-query";

const BlogList = () => {
  const getAllBlogPosts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BLOG}`);

      if (!response.ok) {
        throw new Error(
          "There was an error with the request for all blog posts."
        );
      }
      const data = await response.json();
      console.log(data);
      return data.blogList;
    } catch (err) {
      console.log(err);
    }
  };

  const {
    data: blogPosts,
    isLoading,
    error,
  } = useQuery(["blogPosts"], () => getAllBlogPosts());

  const posts = (
    <>
      {blogPosts.map((item, i) => (
        <li key={item._id}>{item.title}</li>
      ))}
    </>
  );

  return <div>BlogList</div>;
};

export default BlogList;
