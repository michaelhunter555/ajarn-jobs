import React, { useState } from "react";

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
  Pagination,
  Paper,
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
  borderRadius: "0 0 0 18px",
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

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "stretch",
  },
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: "none",
  ...theme.typography.subtitle2,
}));

const SideBlogList = ({ contentPosts }) => {
  const [blogPage, setBlogPage] = useState({
    page: 1,
    limit: 6,
  });

  const getBlogList = async (page, limit) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BLOG}?page=${page}&limit=${limit}`
      );

      if (!response.ok) {
        throw new Error(
          "There was an error retreiving the blog details for this post."
        );
      }
      const data = await response.json();

      return {
        blogList: data.blogList,
        totalBlogPosts: data.totalBlogPosts,
        totalPages: data.totalPages,
        page: data.pageNum,
      };
    } catch (err) {
      console.log(err);
    }
  };

  const { data: blogList, isLoading } = useQuery({
    queryKey: ["otherContentPosts", blogPage.page, blogPage.limit],
    queryFn: () => getBlogList(blogPage.page, blogPage.limit),
    staleTime: 1 * 60 * 60 * 1000,
    keepPreviousData: true,
  });

  const handleBlogPageChange = (page, limit) => {
    setBlogPage({ page: page, limit: limit });
  };

  return (
    <Grid container direction="row" sx={{ margin: "2rem auto" }}>
      {!isLoading && <TeflBanner />}
      {isLoading && <CircularProgress />}
      <Stack sx={{ width: "100%" }}>
        {!isLoading && (
          <Paper elevation={0} sx={{ padding: "5px 5px" }}>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                textDecoration: "underline",
              }}
            >
              Recent Posts
            </Typography>
          </Paper>
        )}
      </Stack>
      <StyledGridContainer>
        {!isLoading &&
          blogList &&
          blogList?.blogList?.map((val, i) => (
            <List
              key={val?._id}
              sx={{ width: "100%", bgcolor: "background.paper" }}
            >
              <StyledLink component={RouterLink} to={`/content/${val?._id}`}>
                <StyledListItemButton direction="row" alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt={val?.title} src={`${val?.author?.image}`} />
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
                </StyledListItemButton>
              </StyledLink>

              {i - blogList?.blogList?.length - 1 && (
                <Divider variant="inset" light />
              )}
            </List>
          ))}
      </StyledGridContainer>
      {!isLoading && (
        <Pagination
          page={Number(blogPage?.page)}
          count={blogList?.totalPages}
          onChange={(event, page) => {
            handleBlogPageChange(page, 6);
          }}
        />
      )}
    </Grid>
  );
};

export default SideBlogList;
