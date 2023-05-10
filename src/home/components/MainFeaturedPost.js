import "animate.css";

import React from "react";

import { Link } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

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
  borderRadius: "5px",
  backgroundColor: "rgba(0,0,0,.5)",
});

const StyledBoxContent = styled(Box)({
  position: "relative",
  margin: "0 0 0 1rem",
  p: { xs: 3, md: 6 },
  pr: { md: 0 },
});

const StyledGlassCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  position: "relative",
  border: "1px solid rgba(216, 216, 216, 0.5)",
  color: "black",
  fontSize: "16px",
  fontWeight: "bold",
  padding: "0 20px 0 0",
  borderRadius: "6px",
  overflow: "hidden",

  background:
    "linear-gradient(135deg, hsla(360, 100%, 100%, 0.9), hsla(360, 100%, 100%, 0.9) 9.37%, hsla(360, 100%, 100%, 0.9) 54.69%, hsla(360, 100%, 100%, 0.9) 66.15%, hsla(360, 1000%, 100%, 0.9))",
  "&::after": {
    content: '""',
    position: "absolute",
    top: "0",
    left: "-200%",
    width: "200%",
    height: "100%",
    transform: "skewX(-20deg)",
    backgroundImage:
      "linear-gradient(90deg, transparent, rgba(98, 250, 255, 0.219), transparent)",
  },
  "&:hover::after": {
    animation: "shine 1s infinite alternate",
    animationTimingFunction: "cubic-bezier(0, 0.6, 0.5, 0.4)",
  },
  "@keyframes shine": {
    "0%": {
      left: "-200%",
    },
    "60%": {
      left: "100%",
    },
    "100%": {
      left: "100%",
    },
  },
  [theme.breakpoints.down("md")]: {
    margin: "0.5rem 0.5rem 0",
  },
  [theme.breakpoints.down("sm")]: {
    margin: "0.5rem 1rem 0",
  },
}));

const StyledBox = styled(Box)({
  display: "flex",
  flexDirection: "row",
});

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  flex: "1 0 auto",
  background: theme.palette.background.glass,
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
      {/*featured post */}
      <StyledPaper
        sx={{ backgroundImage: `url(${post[0].image})`, borderRadius: "5px" }}
      >
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

        <Box
          sx={{ padding: "0 0 1rem 0", margin: "0 0 0 0.5rem", width: "100%" }}
        >
          <Grid container spacing={2}>
            {/*next posts after 1st or featured post */}
            {post.slice(1).map((posts, i) => (
              <Grid item key={i} xs={12} sm={6}>
                <Link key={i} to="/">
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      justifyContent: "flex-start",
                      position: "relative",
                    }}
                  >
                    <StyledGlassCard elevation={3}>
                      <CardMedia
                        component="img"
                        image={posts.image}
                        alt={`${posts.author}-${posts.title}`}
                        sx={{
                          width: 70,
                          borderRight: "1px solid #bbbbbb",
                        }}
                      />
                      <StyledBox>
                        <StyledCardContent>
                          <Box sx={{ overflowWrap: "break-word" }}>
                            <Typography
                              component="h2"
                              variant="h6"
                              color="text.primary"
                              sx={{
                                fontSize: 12,
                                wordWrap: "break-word",
                                maxWidth: "100%",
                              }}
                            >
                              {posts.title.length > 50
                                ? posts.title.substring(0, 50) + "..."
                                : posts.title}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="subtitle1"
                              color="text.primary"
                              component="h3"
                              sx={{ fontSize: 10 }}
                            >
                              By {posts.author}
                            </Typography>
                          </Box>
                        </StyledCardContent>
                      </StyledBox>
                    </StyledGlassCard>
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
