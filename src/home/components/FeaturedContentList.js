import React from "react";

import { Link } from "react-router-dom";

import { Divider, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

import Sponsors from "./Sponsors";

const StyledPaper = styled(Paper)({
  maxHeight: 440,
  overflowY: "auto",
  pointerEvents: "auto",
  "&::-webkit-scrollbar": {
    width: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "transparent",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#8b8b8d",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
    borderRadius: "4px",
  },
  "&:hover": {
    "&::-webkit-scrollbar-thumb": {
      background: "#b5b5b5",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      transition: "background 1s ease-in",
      background: "#8b8b8d",
    },
    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },
  },
});

const StyledLink = styled(Link)({
  color: "rgb(92, 92, 92)",
  textDecoration: "none",
});

const StyledTitle = styled("h2")(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const FeaturedContentList = (props) => {
  const { posts } = props;

  return (
    <>
      <StyledTitle>User Content</StyledTitle>
      <Divider />
      <StyledPaper elevation={0}>
        {posts &&
          posts?.map((post, i) => (
            <StyledLink key={post?._id} to={`/content/${post?._id}`}>
              <Sponsors
                contentImage={`${post?.author?.image}`}
                postContent={post?.postContent}
                title={post?.title}
                name={post?.name}
                category={post?.category}
                postDate={post?.postDate?.split("T")[0]}
                userType={post?.author?.userType}
              />
            </StyledLink>
          ))}
      </StyledPaper>
    </>
  );
};

export default FeaturedContentList;
