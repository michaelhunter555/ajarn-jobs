import React, { useContext, useState } from "react";

import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Button, Grid, Stack, Typography } from "@mui/material";

import { AuthContext } from "../../shared/context/auth-context";
import { useComment } from "../../shared/hooks/content-hook";

const CommentInteractions = ({ blogId, commentId, userComments }) => {
  const auth = useContext(AuthContext);
  const [commentIsLiked, setCommentIsLiked] = useState(true);
  const [commentIsDisliked, setCommentIsDisliked] = useState(true);
  const { likeComment, dislikeComment } = useComment();

  const handleCommentLike = () => {
    likeComment(blogId, auth.user?._id, commentId, commentIsLiked);
  };

  const handleCommentDislike = () => {
    dislikeComment(blogId, auth.user?._id, commentId, commentIsDisliked);
  };

  const userLikedIndex =
    userComments &&
    userComments?.interactions?.findIndex(
      (interaction) =>
        interaction?.userId === auth.user?._id && interaction?.like === true
    );

  const userAlreadyLiked =
    userLikedIndex !== -1 &&
    userComments?.interactions[userLikedIndex]?.like === true;

  const userDislikedIndex =
    userComments &&
    userComments?.interactions?.findIndex(
      (interaction) =>
        interaction?.userId === auth.user?._id && interaction?.dislike === true
    );

  const userAlreadyDisliked =
    userDislikedIndex !== -1 &&
    userComments?.interactions[userDislikedIndex]?.dislike === true;

  return (
    <Grid container direction="row" spacing={1} alignItems="center">
      <Grid item>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Button
            onClick={handleCommentLike}
            disabled={!auth.isLoggedIn}
            startIcon={
              <ThumbUpIcon
                color={
                  auth.isLoggedIn && userAlreadyLiked ? "primary" : "action"
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
              {userComments?.interactions?.length !== 0
                ? userComments?.interactions?.filter(
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
            onClick={handleCommentDislike}
            disabled={!auth.isLoggedIn}
            startIcon={
              <ThumbDownIcon
                color={
                  auth.isLoggedIn && userAlreadyDisliked ? "primary" : "action"
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
              {userComments?.interactions?.length
                ? userComments?.interactions?.filter(
                    (interaction) => interaction?.dislike === true
                  )?.length
                : 0}{" "}
              Dislikes
            </Typography>
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default CommentInteractions;
