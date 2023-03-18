import "./BlogItem.css";

import React from "react";

import { Link } from "react-router-dom";

import { styled } from "@mui/material/styles";

import Card from "../../shared/components/UIElements/Card";

const StyledDiv = styled("div")({
  textDecoration: "none",
  display: "flex",
  flexDirection: "column",
  lineHeight: "1.5rem",
  borderTop: "2px solid rgb(212, 235, 236)",
});

const StyledFirstPost = styled("div")({
  border: "1px solid rgb(223, 223, 223)",
  borderRadius: "6px",
  marginBottom: "1rem",
});

const StyledTitle = styled("h2")({
  color: "black",
});

const StyledAuthor = styled("p")({
  color: "black",
  lineHeight: "1px",
});

const BlogItem = (props) => {
  const { posts } = props;
  return (
    <Card>
      <StyledDiv>
        <StyledFirstPost>
          <h2>{posts[0].title}</h2>
          <div>
            <img src={posts[0].image} alt={posts[0].title} />
            <p>{`${posts[0].content.substring(0, 40)}...`}</p>
            <p>By {`${posts[0].author} on ${posts[0].datePosted}`}</p>
          </div>
        </StyledFirstPost>
      </StyledDiv>

      <div>
        {posts.slice(1).map((post, i) => (
          <Link key={i} className="blog-item">
            <StyledTitle>{post.title}</StyledTitle>
            <StyledAuthor>
              By {post.author} on {post.datePosted}
            </StyledAuthor>
          </Link>
        ))}
      </div>
    </Card>
  );
};

export default BlogItem;

/**
 * <Paper
 * sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${post.image})`,
      }}>
      {img style={{display: 'none'}} src={props.image}
 * </Paper>
 */
