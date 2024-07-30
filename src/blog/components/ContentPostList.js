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
import { styled } from "@mui/material/styles";

import CategoryChip from "../../shared/components/UIElements/CategoryIconChip";
import { getTimeDifference } from "../../shared/util/getTimeDifference";

const StyledGridContainer = styled(Grid)(({ theme }) => ({
  overflowY: "scroll",
  borderRadius: "0px 0px 5px 5px",
  maxHeight: 500,
  "&::-webkit-scrollbar": {
    width: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "transparent",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#8b8b8d",
  },
  "&::-webkit-scrollbar-track": {
    background: theme.palette.background.paper,
    borderRadius: "0px",
  },
  "&:hover": {
    "&::-webkit-scrollbar-thumb": {
      background: "#b5b5b5",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      transition: "background 1s ease-in",
      background: "#8b8b8d",
    },
    "&::-webkit-scrollbar-track": {
      background: theme.palette.background.paper,
    },
  },
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "stretch",
  },
}));

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

  // const pinned = filteredContent?.find(
  //   (content) => content?._id === "66a1c7e9ed38feed3a3172c6"
  // );

  return (
    <StyledGridContainer container>
      {isLoading && <CircularProgress />}
      {noPostsYet}
      {!isLoading &&
        filteredContent &&
        filteredContent?.map((val, i) => (
          <List
            key={val?._id}
            sx={{ width: "100%", bgcolor: "background.paper" }}
          >
            <StyledListItemButton
              direction="row"
              component={Link}
              to={`/content/${val?._id}`}
            >
              <ListItemAvatar>
                <Avatar alt={val?.title} src={`${val?.author?.image}`} />
              </ListItemAvatar>

              <ListItemText
                component="div"
                primary={
                  <>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Typography>{val?.title}</Typography>
                      <CategoryChip category={val?.category} />
                    </Stack>
                    <Chip
                      variant="outlined"
                      size="small"
                      label={getTimeDifference(val?.postDate)}
                    />
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
            </StyledListItemButton>

            {i - filteredContent?.length - 1 && (
              <Divider variant="inset" light />
            )}
          </List>
        ))}
    </StyledGridContainer>
  );
};

export default ContentPostList;
