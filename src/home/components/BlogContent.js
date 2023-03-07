import React from "react";

import Logo from "../../logo.svg";
import BlogItem from "./BlogItem";

const DUMMY_BLOG = [
  {
    title: "Top 10 Tips for New Teachers",
    author: "Mi ke Hun",
    image: Logo,
    datePosted: "2023-03-28",
    content:
      "Blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah.",
  },
  {
    title: "5 Ways to Engage Students in Online Learning",
    author: "Jane Doe",
    image: Logo,
    datePosted: "2023-03-20",
    content:
      "Blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah.",
  },
  {
    title: "How to Manage a Classroom Effectively",
    author: "John Smith",
    image: Logo,
    datePosted: "2023-03-15",
    content:
      "Blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah.",
  },
];

const BlogContent = () => {
  return <BlogItem posts={DUMMY_BLOG} />;
};

export default BlogContent;
