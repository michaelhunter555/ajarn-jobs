import React from "react";

import { Link } from "react-router-dom";

import { Box, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)({
  position: "relative",
  backgroundColor: "grey.800",
  color: "#fff",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
});

const StyledBoxOverlay = styled(Box)({
  position: "absolute",
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  backgroundColor: "rgba(0,0,0,.3)",
});

const StyledBoxContent = styled(Box)({
  position: "relative",
  p: { xs: 3, md: 6 },
  pr: { md: 0 },
});

const MainFeaturedPost = (props) => {
  const { post } = props;

  return (
    <StyledPaper sx={{ backgroundImage: `url(${post[0].image})` }}>
      <StyledBoxOverlay />
      <Grid container>
        <Grid item md={6}>
          <StyledBoxContent>
            <Typography variant="h3" color="inherit" gutterBottom>
              {post[0].title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {post[0].content}
            </Typography>
            <Link style={{ color: "white" }} to={`/posts/${post.id}`}>
              Read more
            </Link>
          </StyledBoxContent>
        </Grid>
      </Grid>
    </StyledPaper>
  );
};

export default MainFeaturedPost;
