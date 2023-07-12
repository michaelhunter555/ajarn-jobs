import React, { useContext } from "react";

import { FaChalkboardTeacher, FaSchool } from "react-icons/fa";

import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { AuthContext } from "../../shared/context/auth-context";
import { useComment } from "../../shared/hooks/content-hook";
import { getTimeDifference } from "../../shared/util/getTimeDifference";

const UserComments = ({
  blogId,
  usersComments,
  commentsIsLoading,
  refetch,
}) => {
  const auth = useContext(AuthContext);
  const {
    likeComment,
    dislikeComment,
    setIsCommentDislikesLoading,
    setIsCommentLikeLoading,
  } = useComment();

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          height: usersComments?.comments?.length === 0 ? 200 : "",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: 4,
          boxSizing: "border-box",
          margin: "0 0 2rem 0",
        }}
      >
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
        {!commentsIsLoading && usersComments?.length === 0 && (
          <Typography variant="h4">No comments yet. Be the first!</Typography>
        )}
        {!commentsIsLoading &&
          usersComments?.length !== 0 &&
          usersComments?.map((comment, i) => (
            <Box
              key={comment?._id}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
                gap: "5px",
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

              <Typography
                variant="subtitle2"
                dangerouslySetInnerHTML={{ __html: comment?.comment }}
              />
              {/**THIS WILL be replaced with <CommentInteractions blogId={blogId} commentId={comment?._id} userComments={comment} */}
              <Grid container direction="row" spacing={1} alignItems="center">
                <Grid item>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Button
                      onClick={() =>
                        likeComment(blogId, auth.user?._id, comment?._id)
                          .then(() => {
                            console.log("Refetch Ran:");
                            refetch();
                          })
                          .catch((err) => console.log(err))
                      }
                      disabled={!auth.isLoggedIn}
                      startIcon={
                        <ThumbUpIcon color="action" sx={{ fontSize: 20 }} />
                      }
                    >
                      <Typography
                        color="text.secondary"
                        variant="subtitle2"
                        sx={{ fontSize: 14, fontWeight: 550 }}
                      >
                        {comment?.interactions?.length !== 0
                          ? comment?.interactions?.filter(
                              (actions) => actions?.like === true
                            )?.length
                          : 0}{" "}
                        Likes
                      </Typography>
                    </Button>
                  </Stack>
                </Grid>

                <Grid item>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Button
                      onClick={() =>
                        dislikeComment(blogId, auth.user?._id, comment?._id)
                          .then(() => {
                            refetch();
                          })
                          .catch((err) => console.log(err))
                      }
                      disabled={!auth.isLoggedIn}
                      startIcon={
                        <ThumbDownIcon color="action" sx={{ fontSize: 20 }} />
                      }
                    >
                      <Typography
                        color="text.secondary"
                        variant="subtitle2"
                        sx={{ fontSize: 14, fontWeight: 550 }}
                      >
                        {comment?.interactions?.length
                          ? comment?.interactions?.filter(
                              (interaction) => interaction?.dislike === true
                            )?.length
                          : 0}{" "}
                        Dislikes
                      </Typography>
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
              {/**THIS WILL be replaced with <CommentInteractions blogId={blogId} commentId={comment?._id} userComments={comment} */}

              {i - usersComments?.length - 1 && (
                <Divider light sx={{ width: "100%", margin: "0.5rem 0" }} />
              )}
            </Box>
          ))}
      </Paper>
    </>
  );
};

export default UserComments;
