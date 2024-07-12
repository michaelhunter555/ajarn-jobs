import React, { useEffect, useState } from "react";

import moment from "moment";
import { Link } from "react-router-dom";

import {
  Box,
  Button,
  Divider,
  Grid,
  Pagination,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import Footer, {
  Content,
  PageContainer,
} from "../../shared/components/UIElements/Footer";
import TeflBanner from "../../shared/components/UIElements/TeflBanner";
import BlogFilter from "../components/BlogFilter";
import BlogPostForm from "../components/BlogPostForm";
import ContentPostList from "../components/ContentPostList";

const StyledGridWrapper = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  gap: theme.spacing(0),
  margin: "2rem auto 5rem",
  padding: 5,
}));

const StyledStackContent = styled(Stack)(({ theme }) => ({
  margin: "0 2rem",
  [theme.breakpoints.down("md")]: {
    margin: 0,
  },
  [theme.breakpoints.down("sm")]: {
    margin: 0,
  },
}));

const AddNewBlogPost = () => {
  const [filter, setFilter] = useState();
  const [totalPages, setTotalPages] = useState(1);
  const [blogPage, setBlogPage] = useState({
    page: 1,
    limit: 5,
  });

  const getAllBlogPosts = async (page, limit) => {
    const response = await fetch(
      `${process.env.REACT_APP_BLOG}?page=${page}&limit=${limit}`
    );

    if (!response.ok) {
      throw new Error("There was an issue with the response.");
    }
    const data = await response.json();

    return {
      blogList: data.blogList,
      totalBlogPosts: data.totalBlogPosts,
      totalPages: data.totalPages,
      page: data.pageNum,
    };
  };

  const {
    data: blogPosts,
    isLoading,
    refetch,
  } = useQuery(["AllBlogPosts", blogPage.page, blogPage.limit], () =>
    getAllBlogPosts(blogPage.page, blogPage.limit)
  );

  useEffect(() => {
    if (blogPosts && Number(blogPosts?.totalPages) !== totalPages) {
      setTotalPages(blogPosts?.totalPages);
    }
  }, [blogPosts, totalPages]);

  const incomingBlogPostHandler = () => {
    refetch();
  };

  const handleFilterChange = (filterData) => {
    setFilter(filterData);
  };

  const filteredContent =
    blogPosts &&
    blogPosts?.blogList?.filter((searchContent) => {
      const postDate = moment(searchContent?.postDate); // Use postDate instead of date
      const searchDate = moment(filter?.date); // Parse the string into a moment object

      return (
        (!filter?.category ||
          searchContent?.category
            ?.toLowerCase()
            ?.includes(filter?.category?.toLowerCase())) &&
        (!filter?.date ||
          (searchDate.isSameOrBefore(postDate, "day") &&
            postDate.isSameOrAfter(searchDate, "day"))) &&
        (!filter?.search ||
          searchContent.title
            .toLowerCase()
            .includes(filter.search.toLowerCase()))
      );
    });

  const handleBlogPageChange = (page, limit) => {
    setBlogPage({
      page: page,
      limit: limit,
    });
  };

  return (
    <PageContainer>
      <Content>
        <StyledGridWrapper container>
          <Grid item xs={12} sm={6}>
            <Stack direction="column" spacing={1}>
              <Typography variant="h3" color="text.primary">
                Welcome to Ajarn Content!
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Here you will find user submitted posts and questions
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                As always due your due dillegence as an online netizen
              </Typography>
              <Divider />
              <BlogPostForm onBlogPostCreated={incomingBlogPostHandler} />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledStackContent>
              <Box>
                <TeflBanner />
              </Box>
              <BlogFilter onDataChange={handleFilterChange} />
              <ContentPostList
                isLoading={isLoading}
                filteredContent={filteredContent}
              />
              {!isLoading && (
                <Pagination
                  sx={{ margin: "0.5rem" }}
                  count={totalPages}
                  page={blogPage.page}
                  onChange={(event, page) => handleBlogPageChange(page, 5)}
                />
              )}
              {!isLoading && (
                <Button variant="outlined" component={Link} to="/jobs">
                  Need a Job?
                </Button>
              )}
            </StyledStackContent>
          </Grid>
        </StyledGridWrapper>
      </Content>
      <Footer />
    </PageContainer>
  );
};

export default AddNewBlogPost;
