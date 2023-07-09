import React, { useContext, useEffect, useState } from "react";

import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import {
  Button,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import { AuthContext } from "../../shared/context/auth-context";
import { useContent } from "../../shared/hooks/content-hook";

const UserInteractions = ({ blogId, content, refetchLikeState }) => {
  const auth = useContext(AuthContext);
  const { user } = auth;
  const [isLiked, setIsLiked] = useState(true);
  const [isDisliked, setIsDisliked] = useState(false);
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

  return (
    <>
      <Grid item>
        <Stack direction="row" alignItems="center" spacing={1}>
          {!isPostLikeLoading && (
            <Button
              onClick={handlePostLike}
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
                {totalLikes > 1 ? totalLikes + " Likes" : totalLikes + " Like"}
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
                    auth.isLoggedIn && userAlreadyDisliked ? "error" : "action"
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
    </>
  );
};

export default UserInteractions;
