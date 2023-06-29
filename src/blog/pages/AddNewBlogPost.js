import React, { useContext } from "react";

import { Link } from "react-router-dom";

import CommentIcon from "@mui/icons-material/Comment";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import {
  Avatar,
  Box,
  Button,
  CardMedia,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import RemoteLifestyleImg from "../../assets/contribute.png";
import { StyledGlassTeflAd } from "../../jobs/pages/UserJobs";
import { AuthContext } from "../../shared/context/auth-context";
import BlogPostForm from "../components/BlogPostForm";

const AddNewBlogPost = () => {
  const auth = useContext(AuthContext);

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
    error,
    refetch,
  } = useQuery(["AllBlogPosts"], () => getAllBlogPosts());

  const incomingBlogPostHandler = () => {
    refetch();
  };

  let noPostsYet;

  if (blogPosts?.length === 0) {
    noPostsYet = (
      <Paper
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "90%",
          padding: 5,
        }}
      >
        <Typography variant="h5" color="text.secondary">
          There are no posts yet.
        </Typography>
        <Typography variant="outlined" color="text.secondary">
          Add a Post!
        </Typography>
      </Paper>
    );
  }

  let teflAd = (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ margin: "1rem auto" }}
    >
      <StyledGlassTeflAd>
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          sx={{ display: "flex", alignItems: "center", borderRadius: "8px" }}
        >
          <CardMedia
            sx={{ padding: 1 }}
            component="img"
            image={RemoteLifestyleImg}
            alt="temp-lifestyle-tefl"
          />
        </Grid>
        <Grid item xs={12} sm={8} sx={{ margin: "0 0.5rem", padding: 1 }}>
          <Typography
            variant="body1"
            sx={{ fontWeight: 550, color: "#464646" }}
          >
            Barvard TEFL - 120 Hour Course{" "}
            <Chip
              sx={{ fontSize: 10, borderRadius: "6px" }}
              label="Ad"
              size="small"
            />
          </Typography>

          <Typography variant="subtitle2" color="text.secondary">
            Get Qaulified, find work, earn more.
          </Typography>
        </Grid>
      </StyledGlassTeflAd>
    </Grid>
  );

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      spacing={1}
      sx={{ margin: 5, padding: 5 }}
    >
      <Grid
        item
        xs={12}
        sm={6}
        md={5}
        sx={{ display: "flex", justifyContent: "center" }}
      >
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
      <Grid item xs={12} sm={6} md={7}>
        <Stack sx={{ margin: "0 2rem" }}>
          <Box sx={{ width: "50%" }}>{teflAd}</Box>
          <Grid Container>
            {isLoading && <CircularProgress />}
            {noPostsYet}
            {!isLoading &&
              blogPosts &&
              blogPosts?.map((val, i) => (
                <List
                  key={val._id}
                  sx={{ width: "100%", bgcolor: "background.paper" }}
                >
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt={val.title}
                        src={`${process.env.REACT_APP_IMAGE}${val?.author?.image}`}
                      />
                    </ListItemAvatar>

                    <ListItemText
                      component="div"
                      primary={
                        <>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            <Typography>{val?.title}</Typography>
                            <Chip size="small" label={val?.category} />
                          </Stack>
                          <Typography variant="subtitle2">
                            {val?.postDate?.split("T")[0]}{" "}
                          </Typography>
                        </>
                      }
                      secondary={
                        <>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {val?.name}
                          </Typography>
                          {" — " + val?.postContent?.substring(0, 40) + "..."}
                        </>
                      }
                    />

                    <Stack justifyContent="flex-end">
                      <Stack
                        direction="row"
                        justifyContent="space-evenly"
                        alignItems="center"
                        spacing={2}
                        sx={{ marginBottom: "2px" }}
                      >
                        <Stack>
                          <Typography
                            color="text.secondary"
                            variant="subtitle2"
                          >
                            {val?.comments?.length}
                          </Typography>
                          <CommentIcon color="action" fontSize="small" />
                        </Stack>
                        <Stack>
                          <Typography
                            color="text.secondary"
                            variant="subtitle2"
                          >
                            {val?.comments?.length}
                          </Typography>
                          <ThumbUpIcon color="action" fontSize="small" />
                        </Stack>
                        <Stack>
                          <Typography
                            color="text.secondary"
                            variant="subtitle2"
                          >
                            {val?.comments?.length}
                          </Typography>
                          <ThumbDownIcon color="action" fontSize="small" />
                        </Stack>
                      </Stack>
                      <Button
                        variant="contained"
                        component={Link}
                        to={`/content/${val?._id}`}
                      >
                        Read Post
                      </Button>
                    </Stack>
                  </ListItem>

                  {i - blogPosts?.length - 1 && (
                    <Divider variant="inset" light />
                  )}
                </List>
              ))}
          </Grid>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default AddNewBlogPost;
