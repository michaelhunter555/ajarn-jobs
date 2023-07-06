import React from "react";

import { Link } from "react-router-dom";
import sanitizeHtml from "sanitize-html";

import CommentIcon from "@mui/icons-material/Comment";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import {
  Avatar,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { getTimeDifference } from "../../shared/util/getTimeDifference";

const ContentPostList = ({ isLoading, filteredContent }) => {
  let noPostsYet;
  if (filteredContent?.length === 0) {
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
          There are no posts that match your search.
        </Typography>
        <Typography variant="outlined" color="text.secondary">
          Check back later or get the conversation started!
        </Typography>
      </Paper>
    );
  }

  return (
    <Grid container>
      {isLoading && <CircularProgress />}
      {noPostsYet}
      {!isLoading &&
        filteredContent &&
        filteredContent?.map((val, i) => (
          <List
            key={val?._id}
            sx={{ width: "100%", bgcolor: "background.paper" }}
          >
            <ListItemButton
              component={Link}
              to={`/content/${val?._id}`}
              alignItems="flex-start"
            >
              <ListItemAvatar>
                <Avatar
                  alt={val?.title}
                  src={`${process.env.REACT_APP_IMAGE}${val?.author?.image}`}
                />
              </ListItemAvatar>

              <ListItemText
                component="div"
                primary={
                  <>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Typography>{val?.title}</Typography>
                      <Chip
                        size="small"
                        sx={{ backgroundColor: "#d2fdf2" }}
                        label={val?.category}
                      />
                    </Stack>
                    <Chip label={getTimeDifference(val?.postDate)} />
                  </>
                }
                secondary={
                  <>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="subtitle2"
                      color="text.primary"
                    >
                      Posted By {val?.name}
                    </Typography>
                    {" - "}
                    {sanitizeHtml(val?.postContent, {
                      allowedTags: [],
                      allowedAttributes: {},
                    })?.substring(0, 40) + "..."}
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
                    <Typography color="text.secondary" variant="subtitle2">
                      {val?.comments?.length}
                    </Typography>
                    <CommentIcon color="action" fontSize="small" />
                  </Stack>
                  <Stack>
                    <Typography color="text.secondary" variant="subtitle2">
                      {
                        val?.interactions?.filter(
                          (action) => action?.like === true
                        )?.length
                      }
                    </Typography>
                    <ThumbUpIcon color="action" fontSize="small" />
                  </Stack>
                  <Stack>
                    <Typography color="text.secondary" variant="subtitle2">
                      {
                        val?.interactions?.filter(
                          (action) => action?.dislike === true
                        )?.length
                      }
                    </Typography>
                    <ThumbDownIcon color="action" fontSize="small" />
                  </Stack>
                </Stack>
              </Stack>
            </ListItemButton>

            {i - filteredContent?.length - 1 && (
              <Divider variant="inset" light />
            )}
          </List>
        ))}
    </Grid>
  );
};

export default ContentPostList;
