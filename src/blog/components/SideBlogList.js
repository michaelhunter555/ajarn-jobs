import React from "react";

import { Link as RouterLink } from "react-router-dom";
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
  Link,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";

import CategoryChip from "../../shared/components/UIElements/CategoryIconChip";
import TeflBanner from "../../shared/components/UIElements/TeflBanner";
import { getTimeDifference } from "../../shared/util/getTimeDifference";

const StyledGridContainer = styled(Grid)({
  overflowY: "scroll",
  maxHeight: "100vh",
  borderRadius: "18px 0 0 18px",
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
    background: "#f1f1f1",
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
      background: "#f1f1f1",
    },
  },
});

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: "none",
  ...theme.typography.subtitle2,
}));

const SideBlogList = ({ contentPosts }) => {
  const getBlogList = async () => {
    const response = await fetch(`${process.env.REACT_APP_BLOG}`);

    if (!response.ok) {
      throw new Error(
        "There was an error retreiving the blog details for this post."
      );
    }
    const data = await response.json();
    return data.blogList;
  };

  const { data: blogList, isLoading } = useQuery(["otherContentPosts"], () =>
    getBlogList()
  );

  return (
    <Grid container direction="row" sx={{ margin: "2rem auto" }}>
      {!isLoading && <TeflBanner />}
      {isLoading && <CircularProgress />}
      <StyledGridContainer>
        {!isLoading &&
          blogList &&
          blogList?.map((val, i) => (
            <List
              key={val?._id}
              sx={{ width: "100%", bgcolor: "background.paper" }}
            >
              <StyledLink component={RouterLink} to={`/content/${val?._id}`}>
                <ListItemButton alignItems="flex-start">
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
                          <Typography sx={{ fontWeight: 600 }}>
                            {val?.title}
                          </Typography>
                          <CategoryChip category={val?.category} />
                        </Stack>
                        <Chip
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
                </ListItemButton>
              </StyledLink>

              {i - blogList?.length - 1 && <Divider variant="inset" light />}
            </List>
          ))}
      </StyledGridContainer>
    </Grid>
  );
};

export default SideBlogList;
