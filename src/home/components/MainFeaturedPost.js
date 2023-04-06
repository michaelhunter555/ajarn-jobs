import React from 'react';

import { Link } from 'react-router-dom';

import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)({
  position: "relative",
  backgroundColor: "grey.800",
  color: "#fff",
  height: "auto",
  objectFit: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  verticalAlign: "bottom",
});

const StyledBoxOverlay = styled(Box)({
  position: "absolute",
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  backgroundColor: "rgba(0,0,0,.5)",
});

const StyledBoxContent = styled(Box)({
  position: "relative",
  margin: "0 0 0 1rem",
  p: { xs: 3, md: 6 },
  pr: { md: 0 },
});

const StyledTitle = styled("h2")(({ theme }) => ({
  color: "black",
  position: "relative",
  fontSize: 10,
  p: { xs: 3, md: 6 },
  pr: { md: 0 },
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const StyledAuthor = styled("h3")(({ theme }) => ({
  color: "black",
  lineHeight: "1px",
  position: "relative",
  fontSize: 10,
  p: { xs: 3, md: 6 },
  pr: { md: 0 },
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  color: "white",
  position: "relative",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const MainFeaturedPost = (props) => {
  const { post } = props;

  return (
    <>
      <StyledPaper sx={{ backgroundImage: `url(${post[0].image})` }}>
        <StyledBoxOverlay />
        <Grid container>
          <Grid item md={6}>
            <StyledBoxContent>
              <Typography
                variant="h3"
                component="h2"
                color="inherit"
                gutterBottom
              >
                {post[0].title}
              </Typography>
              <Typography variant="h5" component="h3" color="inherit" paragraph>
                {post[0].content}
              </Typography>
              <Button
                variant="contained"
                component={Link}
                to={`/posts/${post.id}`}
              >
                Read more
              </Button>
            </StyledBoxContent>
          </Grid>
        </Grid>

        <StyledDivider variant="middle">More Content</StyledDivider>

        <Box sx={{ padding: "0 0 2rem 0", margin: "0 0 0 1rem" }}>
          <Grid container spacing={2}>
            {post.slice(1).map((posts, i) => (
              <Grid item key={i} xs={12} sm={6} md={4}>
                <Link key={i} to="/">
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    <Paper raised={true}>
                      <StyledTitle>{posts.title}</StyledTitle>
                      <StyledAuthor>
                        By {posts.author} on {posts.datePosted}
                      </StyledAuthor>
                    </Paper>
                  </Box>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      </StyledPaper>
    </>
  );
};

export default MainFeaturedPost;
