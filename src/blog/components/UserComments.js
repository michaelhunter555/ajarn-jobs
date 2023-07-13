import React, { useContext, useState } from "react";

import { FaChalkboardTeacher, FaSchool } from "react-icons/fa";

import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
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
  const [toggleAuthOptions, setToggleAuthOptions] = useState(false);
  const {
    likeComment,
    dislikeComment,
    isCommentLikeLoading,
    isCommentDislikeLoading,
  } = useComment();

  const toggleAuthHandler = () => {
    setToggleAuthOptions((prev) => !prev);
  };

  //check if user liked post
  const userLikedAlready = usersComments?.map((item) => {
    //see if match for userId and like property value of true
    const findLikeIndex = item?.interactions?.find(
      (item) => item?.userId === auth?.user?._id && item?.like === true
    );
    //if true, we know this user liked this comment :)
    return findLikeIndex !== undefined;
  });

  const userDislikedAlready = usersComments?.map((item) => {
    const findDislikeIndex = item?.interactions?.find(
      (action) => action?.userId === auth?.user?._id && action?.dislike === true
    );
    return findDislikeIndex !== undefined;
  });

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
                        <ThumbUpIcon
                          color={userLikedAlready[i] ? "primary" : "action"}
                          sx={{ fontSize: 20 }}
                        />
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
                        <ThumbDownIcon
                          color={
                            auth.isLoggedIn && userDislikedAlready[i]
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

                {comment?.userId?._id === auth?.user?._id && (
                  <Grid item>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Button
                        onClick={toggleAuthHandler}
                        sx={{ borderRadius: "50%" }}
                      >
                        <MoreHorizIcon style={{ color: "#888", padding: 1 }} />
                      </Button>
                    </Stack>
                  </Grid>
                )}

                {toggleAuthOptions &&
                  comment?.userId?._id === auth?.user?._id && (
                    <Grid
                      item
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "3px",
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Button
                          startIcon={
                            <EditTwoToneIcon style={{ color: "#888" }} />
                          }
                        >
                          <Typography
                            color="text.secondary"
                            variant="subtitle2"
                            sx={{ fontSize: 10, fontWeight: 550 }}
                          >
                            Edit
                          </Typography>
                        </Button>
                      </Stack>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Button
                          startIcon={
                            <DeleteForeverTwoToneIcon
                              style={{ color: "#b74724" }}
                            />
                          }
                        >
                          <Typography
                            color="text.secondary"
                            variant="subtitle2"
                            sx={{ fontSize: 10, fontWeight: 550 }}
                          >
                            Delete
                          </Typography>
                        </Button>
                      </Stack>
                    </Grid>
                  )}

                {/* {comment?.userId?._id === auth?.user?._id && (
                  <Grid item>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Button
                        startIcon={
                          <EditTwoToneIcon style={{ color: "#888" }} />
                        }
                      >
                        <Typography
                          color="text.secondary"
                          variant="subtitle2"
                          sx={{ fontSize: 10, fontWeight: 550 }}
                        >
                          Edit
                        </Typography>
                      </Button>
                    </Stack>
                  </Grid>
                )}
                {comment?.userId?._id === auth?.user?._id && (
                  <Grid item>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Button
                        startIcon={
                          <DeleteForeverTwoToneIcon
                            style={{ color: "#b74724" }}
                          />
                        }
                      >
                        <Typography
                          color="text.secondary"
                          variant="subtitle2"
                          sx={{ fontSize: 10, fontWeight: 550 }}
                        >
                          Delete
                        </Typography>
                      </Button>
                    </Stack>
                  </Grid>
                )} */}
              </Grid>
              {/**THIS WILL be replaced with <CommentInteractions blogId={blogId} commentId={comment?._id} userComments={comment}  {comment?.userId?._id === auth?.user?._id && (
                      <Button>Edit</Button>
                    )}*/}

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
