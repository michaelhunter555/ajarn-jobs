import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";

import React, { useContext, useEffect, useState } from "react";

import DOMPurify from "dompurify";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import { FaChalkboardTeacher, FaSchool } from "react-icons/fa";
import { useParams } from "react-router-dom";

import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { AuthContext } from "../../shared/context/auth-context";
import { useComment, useContent } from "../../shared/hooks/content-hook";
import { getTimeDifference } from "../../shared/util/getTimeDifference";

const styledComments = {
  height: "auto",
  padding: " 0 20px",
  borderRadius: "0 0 8px 8px",
  border: "2px solid #dbdbdb",
  boxSizing: "border-box",
};

const BlogPageItem = ({ content, refetchLikeState }) => {
  const auth = useContext(AuthContext);
  const { user } = auth;
  const blogId = useParams().bid;
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [toggleEditor, setToggleEditor] = useState(true);
  const [isLiked, setIsLiked] = useState(true);
  const [isDisliked, setIsDisliked] = useState(true);
  const { addComment, getComments, error } = useComment();
  const {
    likeContentPost,
    dislikeContentPost,
    totalLikes,
    totalDislikes,
    getTotalLikes,
    getTotalDislikes,
    isPostDislikeLoading,
    isPostLikeLoading,
  } = useContent();

  const {
    data: usersComments,
    isLoading: commentsIsLoading,
    refetch,
  } = useQuery(["commentsByBlogId", blogId], () => getComments(blogId));

  useEffect(() => {
    if (!isPostLikeLoading || !isPostDislikeLoading) {
      getTotalLikes(blogId);
    }
  }, [getTotalLikes, blogId, isPostLikeLoading, isPostDislikeLoading]);
  console.log("TotalLikes:", totalLikes);

  useEffect(() => {
    if (!isPostDislikeLoading || !isPostLikeLoading) {
      getTotalDislikes(blogId);
    }
  }, [getTotalDislikes, blogId, isPostDislikeLoading, isPostLikeLoading]);

  const handleCommentSubmit = () => {
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    const commentHtml = draftToHtml(rawContent);
    const sanitizedComment = DOMPurify.sanitize(commentHtml);
    const comment = JSON.stringify({ postComment: sanitizedComment });

    try {
      addComment(user?._id, blogId, comment)
        .then(() => {
          refetch();
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log("HandleCommentSubmit Error - POST:", error);
    }
    if (!error) {
      setEditorState(EditorState.createEmpty());
    }
  };

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handlePostLike = () => {
    likeContentPost(blogId, user?._id, isLiked)
      .then(() => {
        refetchLikeState();
      })
      .catch((err) => {
        console.error(err);
        setIsLiked(!isLiked);
      });
  };

  const handlePostDislike = () => {
    dislikeContentPost(blogId, user?._id, isDisliked)
      .then(() => {
        refetchLikeState();
      })
      .catch((err) => {
        console.error(err);
        setIsDisliked((prev) => !prev);
      });
  };

  //postlike checking
  const likedPostIndex =
    content &&
    content?.interactions?.findIndex(
      (interaction) => interaction?.userId === user?._id
    );
  const userAlreadyLiked =
    likedPostIndex !== -1 &&
    content?.interactions[likedPostIndex]?.like === true;

  //postdislike checking
  const dislikePostIndex =
    content &&
    content?.interactions?.findIndex(
      (interaction) => interaction?.userId === user?._id
    );

  const userAlreadyDisliked =
    dislikePostIndex !== -1 &&
    content?.interactions[dislikePostIndex]?.dislike === true;

  console.log(userAlreadyDisliked);

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="start"
      sx={{ maxWidth: "75%", margin: "0 auto" }}
      spacing={2}
    >
      <Grid item xs={12} sm={6} md={8}>
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: 2,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar
              sx={{ width: 100, height: 100, margin: "0 2rem" }}
              alt={`${content?.title}--${content?._id}`}
              src={`${process.env.REACT_APP_IMAGE}${content?.author?.image}`}
            />
            <Typography variant="h4" component="div">
              {content?.title}
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Stack
              sx={{
                border: "2px solid #e7e4e4",
                borderRadius: "5px",
                padding: 2,
              }}
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="subtitle2" color="text.secondary">
                {content?.postDate?.split("T")[0]}
              </Typography>
              <Chip label={content?.category} size="small" />
            </Stack>
          </Stack>
          <CardContent>
            <Typography
              variant="body1"
              dangerouslySetInnerHTML={{ __html: content?.postContent }}
            />
          </CardContent>
          <Grid container direction="row" justify="center" spacing={2}>
            <Grid item>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Button
                  onClick={() => setToggleEditor((prev) => !prev)}
                  startIcon={
                    <CommentIcon color="action" sx={{ fontSize: 20 }} />
                  }
                >
                  <Typography
                    color="text.secondary"
                    variant="subtitle2"
                    sx={{ fontSize: 14, fontWeight: 550 }}
                  >
                    {content?.comments?.length} comments
                  </Typography>
                </Button>
              </Stack>
            </Grid>
            <Grid item>
              <Stack direction="row" alignItems="center" spacing={1}>
                {!isPostLikeLoading && (
                  <Button
                    onClick={handlePostLike}
                    disabled={!auth.isLoggedIn}
                    startIcon={
                      <ThumbUpIcon
                        color={
                          auth.isLoggedIn && userAlreadyLiked
                            ? "primary"
                            : "action"
                        }
                        sx={{ fontSize: 20 }}
                      />
                    }
                  >
                    <Typography
                      color="text.secondary"
                      variant="subtitle2"
                      sx={{ fontSize: 14, fontWeight: 550 }}
                    >
                      {totalLikes > 1
                        ? totalLikes + " Likes"
                        : totalLikes + " Like"}
                    </Typography>
                  </Button>
                )}
                {isPostLikeLoading && <CircularProgress size="12px" />}
              </Stack>
            </Grid>

            <Grid item>
              <Stack direction="row" alignItems="center" spacing={1}>
                {!isPostDislikeLoading && (
                  <Button
                    onClick={handlePostDislike}
                    disabled={!auth.isLoggedIn}
                    startIcon={
                      <ThumbDownIcon
                        color={
                          auth.isLoggedIn && userAlreadyDisliked
                            ? "error"
                            : "action"
                        }
                        sx={{ fontSize: 20 }}
                      />
                    }
                  >
                    <Typography
                      color="text.secondary"
                      variant="subtitle2"
                      sx={{ fontSize: 14, fontWeight: 550 }}
                    >
                      {totalDislikes > 1
                        ? totalDislikes + " Dislikes"
                        : totalDislikes + " Dislike"}
                    </Typography>
                  </Button>
                )}
                {isPostDislikeLoading && (
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ margin: "0 auto" }}
                  >
                    <CircularProgress size="12px" />
                  </Stack>
                )}
              </Stack>
            </Grid>

            <Grid item>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Button
                  endIcon={<ShareIcon color="action" sx={{ fontSize: 20 }} />}
                >
                  <Typography
                    color="text.secondary"
                    variant="subtitle2"
                    sx={{ fontSize: 14, fontWeight: 550 }}
                  >
                    Share
                  </Typography>
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
        <Divider variant="inset" />
        <Paper
          elevation={0}
          sx={{
            padding: 2,
            display: "flex",
            flexDirection: "column",
            gap: "3px",
          }}
        >
          {toggleEditor && (
            <Box
              sx={{
                width: "100%",
                ...styledComments,
              }}
            >
              <Editor
                editorState={editorState}
                onEditorStateChange={handleEditorChange}
              />
              <Stack direction="row" justifyContent="flex-end">
                <Button
                  variant="contained"
                  sx={{ borderRadius: "20px", marginBottom: "0.5rem" }}
                  disabled={!auth.isLoggedIn}
                  onClick={handleCommentSubmit}
                >
                  {!auth.isLoggedIn ? "Login" : "Comment"}
                </Button>
              </Stack>
            </Box>
          )}
        </Paper>
        <Divider flexItem light variant="inset" />
        <Paper
          elevation={0}
          sx={{
            height: content?.comments?.length === 0 ? 200 : "",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: 4,
            boxSizing: "border-box",
            margin: "0 0 5rem 0",
          }}
        >
          {usersComments?.length === 0 && (
            <Typography variant="h4">No comments yet. Be the first!</Typography>
          )}
          {commentsIsLoading && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <CircularProgress />
            </Box>
          )}
          {!commentsIsLoading &&
            usersComments?.length !== 0 &&
            usersComments?.map((comment, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                  gap: 3,
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar
                      sx={{ height: 70, width: 70 }}
                      alt={`${comment?.userId?.name}-${comment?.userId?.userType}`}
                      src={`${process.env.REACT_APP_IMAGE}${comment?.userId?.image}`}
                    />
                  </Stack>
                  <Stack alignItems="flex-start">
                    <Stack direction="row" alignItems="center">
                      <Typography varaint="body1" color="text.primary">
                        {comment?.userId?.name} ·{" "}
                      </Typography>
                      <Typography variant="subtitle2" color="text.secondary">
                        {getTimeDifference(comment?.commentDate)}
                      </Typography>
                    </Stack>
                    <Chip
                      label={`${comment?.userId?.userType}
                      ${
                        comment?.userId?.userType === "teacher"
                          ? " | " + comment?.userId?.workExperience + " years"
                          : ""
                      } `}
                      icon={
                        comment?.userId?.userType === "teacher" ? (
                          <FaChalkboardTeacher />
                        ) : (
                          <FaSchool />
                        )
                      }
                    />
                  </Stack>
                </Stack>

                <Typography>{comment?.comment}</Typography>

                <Grid container direction="row" spacing={1} alignItems="center">
                  <Grid item>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Button
                        disabled={!auth.isLoggedIn}
                        endIcon={
                          <ThumbUpIcon color="action" sx={{ fontSize: 20 }} />
                        }
                      >
                        <Typography
                          color="text.secondary"
                          variant="subtitle2"
                          sx={{ fontSize: 14, fontWeight: 550 }}
                        >
                          0
                        </Typography>
                      </Button>
                    </Stack>
                  </Grid>

                  <Grid item>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Button
                        disabled={!auth.isLoggedIn}
                        endIcon={
                          <ThumbDownIcon color="action" sx={{ fontSize: 20 }} />
                        }
                      >
                        <Typography
                          color="text.secondary"
                          variant="subtitle2"
                          sx={{ fontSize: 14, fontWeight: 550 }}
                        >
                          0
                        </Typography>
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
                {i - usersComments?.length - 1 && (
                  <Divider light sx={{ width: "100%", margin: "0.5rem 0" }} />
                )}
              </Box>
            ))}
        </Paper>
      </Grid>
      {/**sidebar below */}
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <Button>Make a Post!</Button>
          <Typography variant="h5" component="h2" color="text.secondary">
            Other Posts
          </Typography>
        </Card>
      </Grid>
    </Grid>
  );
};

export default BlogPageItem;
