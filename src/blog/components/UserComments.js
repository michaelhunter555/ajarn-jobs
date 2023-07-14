import React, { useContext, useEffect, useState } from "react";

import { FaChalkboardTeacher, FaSchool } from "react-icons/fa";

import ClearIcon from "@mui/icons-material/Clear";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumbDownAltTwoToneIcon from "@mui/icons-material/ThumbDownAltTwoTone";
import ThumbUpAltTwoToneIcon from "@mui/icons-material/ThumbUpAltTwoTone";
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
  const [authClickedDelete, setAuthClickedDelete] = useState(false);
  const [isLoadingArray, setIsLoadingArray] = useState(
    new Array(usersComments?.length).fill(false)
  );
  const [isDislikeLoadingArray, setIsDislikeLoadingArray] = useState(
    new Array(usersComments?.length).fill(false)
  );

  const { likeComment, dislikeComment, deleteCommentById } = useComment();

  //keep track of usersComments array length to make sure editing and loading indices are in sync
  useEffect(() => {
    setIsLoadingArray(new Array(usersComments?.length).fill(false));
    setToggleAuthOptions(new Array(usersComments?.length).fill(false));
    setIsDislikeLoadingArray(new Array(usersComments?.length).fill(false));
  }, [usersComments?.length]);

  /**
   *
   * @param {number} i - represents the index where the comment is at
   * @description function updates comment based on Index. Clones toggleAuthOptions array and modifies values at (i) to its opposite before updating its state.
   */
  const toggleAuthHandler = (i) => {
    const isSelectedComment = [...toggleAuthOptions];
    isSelectedComment[i] = !isSelectedComment[i];
    setToggleAuthOptions(isSelectedComment);
    setAuthClickedDelete(false);
  };

  const toggleDeleteWarningHandler = () => {
    setAuthClickedDelete((prev) => !prev);
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
                      onClick={() => {
                        //created copy of all loadable comments
                        const loadingArray = [...isLoadingArray];
                        //find indice and set to true
                        loadingArray[i] = true;
                        //set state so we know which specific icon should be loading
                        setIsLoadingArray(loadingArray);

                        //call likeComment (PATCH) and pass arguments
                        likeComment(blogId, auth.user?._id, comment?._id)
                          .then(() => {
                            //create a copy of all loadable comments
                            const loadingArray = [...isLoadingArray];
                            //set the comment that was loading to false
                            loadingArray[i] = false;
                            //update state
                            setIsLoadingArray(loadingArray);
                            //refetch data
                            refetch();
                          })
                          .catch((err) => {
                            const loadingArray = [...isLoadingArray];
                            loadingArray[i] = false;
                            setIsLoadingArray(loadingArray);
                            console.log(err);
                          });
                      }}
                      disabled={!auth.isLoggedIn}
                      //if loading display a spinner instead of the icon
                      startIcon={
                        !isLoadingArray[i] ? (
                          <ThumbUpAltTwoToneIcon
                            color={userLikedAlready[i] ? "primary" : "action"}
                            sx={{ fontSize: 20 }}
                          />
                        ) : (
                          <CircularProgress size="12px" />
                        )
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
                      </Typography>
                    </Button>
                  </Stack>
                </Grid>

                <Grid item>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Button
                      onClick={() => {
                        const dislikeLoadingArray = [...isDislikeLoadingArray];
                        dislikeLoadingArray[i] = true;
                        setIsDislikeLoadingArray(dislikeLoadingArray);
                        dislikeComment(blogId, auth.user?._id, comment?._id)
                          .then(() => {
                            const dislikeLoadingArray = [
                              ...isDislikeLoadingArray,
                            ];
                            dislikeLoadingArray[i] = false;
                            setIsDislikeLoadingArray(dislikeLoadingArray);
                            refetch();
                          })
                          .catch((err) => {
                            const dislikeLoadingArray = [
                              ...isDislikeLoadingArray,
                            ];
                            dislikeLoadingArray[i] = false;
                            setIsDislikeLoadingArray(dislikeLoadingArray);
                            console.log(err);
                          });
                      }}
                      disabled={!auth.isLoggedIn}
                      startIcon={
                        !isDislikeLoadingArray[i] ? (
                          <ThumbDownAltTwoToneIcon
                            color={
                              auth.isLoggedIn && userDislikedAlready[i]
                                ? "error"
                                : "action"
                            }
                            sx={{ fontSize: 20 }}
                          />
                        ) : (
                          <CircularProgress size="12px" />
                        )
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
                      </Typography>
                    </Button>
                  </Stack>
                </Grid>
                {/* toggle delete option */}
                {comment?.userId?._id === auth?.user?._id && (
                  <Grid item>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Button
                        onClick={() => toggleAuthHandler(i)}
                        sx={{ borderRadius: "50%", minWidth: 0 }}
                      >
                        <MoreHorizIcon style={{ color: "#888", padding: 1 }} />
                      </Button>
                    </Stack>
                  </Grid>
                )}
                {/* only toggle the index where user clicked on one of their created comments */}
                {toggleAuthOptions[i] &&
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
                        {/* pre-delete button */}
                        {!authClickedDelete && (
                          <Button
                            onClick={toggleDeleteWarningHandler}
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
                        )}
                        {/*Cancel pre-delete button */}
                        {authClickedDelete && (
                          <Button
                            onClick={() => toggleAuthHandler(i)}
                            startIcon={
                              <ClearIcon style={{ color: "#434749" }} />
                            }
                          >
                            <Typography
                              color="text.secondary"
                              variant="subtitle2"
                              sx={{ fontSize: 10, fontWeight: 550 }}
                            >
                              Clear
                            </Typography>
                          </Button>
                        )}
                        {/* confirm delete button */}
                        {authClickedDelete && (
                          <Button
                            color="error"
                            variant="outlined"
                            onClick={() =>
                              deleteCommentById(comment?._id, blogId)
                                .then(() => {
                                  setAuthClickedDelete(false);
                                  refetch();
                                })
                                .catch((err) => console.log(err))
                            }
                            sx={{ fontSize: 10, fontWeight: 550 }}
                          >
                            Confirm Deletion
                          </Button>
                        )}
                      </Stack>
                    </Grid>
                  )}
              </Grid>

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
