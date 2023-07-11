import React, { useContext, useState } from "react";

import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Button, Grid, Stack, Typography } from "@mui/material";

import { AuthContext } from "../../shared/context/auth-context";
import { useComment } from "../../shared/hooks/content-hook";

const CommentInteractions = ({ blogId, commentId, refetch, userComments }) => {
  const auth = useContext(AuthContext);
  const [commentIsLiked, setCommentIsLiked] = useState(true);
  const [commentIsDisliked, setCommentIsDisliked] = useState(true);
  const { isPostLoading, likeComment, dislikeComment } = useComment();

  const handleCommentLike = () => {
    likeComment(blogId, auth.user?._id, commentId, true)
      .then(() => {
        refetch();
      })
      .catch((err) => console.log(err));
  };

  const handleCommentDislike = () => {
    dislikeComment(blogId, auth.user?._id, commentId, true)
      .then(() => {
        refetch();
      })
      .catch((err) => console.log(err));
  };

  const userLikedIndex =
    userComments &&
    userComments?.findIndex(
      (interaction) =>
        interaction?.userId === auth.user?._id && interaction?.like === true
    );

  const userAlreadyLiked =
    userLikedIndex !== -1 && userComments[userLikedIndex]?.like === true;

  const userDislikedIndex =
    userComments &&
    userComments?.findIndex(
      (interaction) =>
        interaction?.userId === auth.user?._id && interaction.dislike === true
    );

  const userAlreadyDisliked =
    userDislikedIndex !== -1 &&
    userComments[userDislikedIndex]?.dislike === true;

  return (
    <>
      <Grid container direction="row" spacing={1} alignItems="center">
        <Grid item>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Button
              disabled={!auth.isLoggedIn}
              endIcon={<ThumbUpIcon color="action" sx={{ fontSize: 20 }} />}
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
              endIcon={<ThumbDownIcon color="action" sx={{ fontSize: 20 }} />}
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
    </>
  );
};

export default CommentInteractions;
