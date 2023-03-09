import React from "react";

import { Link } from "react-router-dom";

import { Box, Grid, Paper, Typography } from "@mui/material";

const MainFeaturedPost = (props) => {
  const { post } = props;

  return (
    <Paper
      sx={{
        position: "relative",
        backgroundColor: "grey.800",
        color: "#fff",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url(${post[0].image})`,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: "rgba(0,0,0,.3)",
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: "relative",
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
            >
              {post[0].title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {post[0].content}
            </Typography>
            <Link style={{ color: "white" }} to={`/posts/${post.id}`}>
              Read more
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MainFeaturedPost;
