import React, { useContext, useEffect, useState } from "react";

import ThumbDownAltTwoToneIcon from "@mui/icons-material/ThumbDownAltTwoTone";
import ThumbUpAltTwoToneIcon from "@mui/icons-material/ThumbUpAltTwoTone";
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
  const [isDisliked, setIsDisliked] = useState(true);
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

  console.log("blog content", content);

  return (
    <>
      <Grid item>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Button
            onClick={handlePostLike}
            disabled={!auth.isLoggedIn}
            startIcon={
              !isPostLikeLoading ? (
                <ThumbUpAltTwoToneIcon
                  color={
                    auth.isLoggedIn && userAlreadyLiked ? "primary" : "action"
                  }
                  sx={{ fontSize: 20 }}
                />
              ) : (
                isPostLikeLoading && <CircularProgress size="12px" />
              )
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
        </Stack>
      </Grid>

      <Grid item>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Button
            onClick={handlePostDislike}
            disabled={!auth.isLoggedIn}
            startIcon={
              !isPostDislikeLoading ? (
                <ThumbDownAltTwoToneIcon
                  color={
                    auth.isLoggedIn && userAlreadyDisliked ? "error" : "action"
                  }
                  sx={{ fontSize: 20 }}
                />
              ) : (
                isPostDislikeLoading && <CircularProgress size="12px" />
              )
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
        </Stack>
      </Grid>
    </>
  );
};

export default UserInteractions;
