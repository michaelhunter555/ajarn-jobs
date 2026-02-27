import React, { useEffect, useState } from "react";

import moment from "moment";
import { Link } from "react-router-dom";

import {
  Box,
  Button,
  Modal,
  Divider,
  Grid,
  Pagination,
  Stack,
  styled,
  Typography,
  Chip,
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
  justifyContent: "center",
  gap: theme.spacing(3),
  margin: "2rem auto 5rem",
  padding: theme.spacing(1),
  maxWidth: 1280,
}));

const StyledStackContent = styled(Stack)(({ theme }) => ({
  margin: 0,
  width: "100%",
  [theme.breakpoints.down("md")]: {
    margin: 0,
  },
  [theme.breakpoints.down("sm")]: {
    margin: 0,
  },
}));

const AddNewBlogPost = () => {
  const [filter, setFilter] = useState({
    search: "",
    date: "",
    category: "Any",
  });
  const [userQuery, setUserQuery] = useState({
    search: "",
    date: "",
    category: "Any",
  });
  const [totalPages, setTotalPages] = useState(1);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [blogPage, setBlogPage] = useState({
    page: 1,
    limit: 5,
  });

  const getAllBlogPosts = async (page, limit, searchQuery, date, category) => {
    const response = await fetch(
      `${process.env.REACT_APP_BLOG}?page=${page}&limit=${limit}&searchQuery=${searchQuery}&date=${filter?.date}&category=${filter?.category}`
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
  } = useQuery(["AllBlogPosts", blogPage.page, blogPage.limit, userQuery.search, filter.date, filter.category], () =>
    getAllBlogPosts(blogPage.page, blogPage.limit, userQuery.search, filter.date ?? "", filter.category)
  );

  useEffect(() => {
    if (blogPosts && Number(blogPosts?.totalPages) !== totalPages) {
      setTotalPages(blogPosts?.totalPages);
    }
  }, [blogPosts, totalPages]);

  const incomingBlogPostHandler = () => {
    refetch();
    setIsCreatePostModalOpen(false);
  };

  const handleFilterChange = (filterData) => {
    const { search, date, category } = filterData;
    setFilter(filterData);
  };

  const filteredContent = blogPosts && blogPosts?.blogList;

  const handleBlogPageChange = (page, limit) => {
    setBlogPage({
      page: page,
      limit: limit,
    });
  };

  const handleSendQuery = () => {
    setUserQuery({ search: filter?.search, date: filter?.date, category: filter?.category });
    setBlogPage({ page: 1, limit: 5 });
  }

  const handleClearAll = () => {
    setUserQuery({ search: "", date: "", category: "Any" });
    setBlogPage({ page: 1, limit: 5 });
  }

  return (
    <PageContainer>
      <Content>
        <StyledGridWrapper container>
          <Grid item xs={12}>
            <Stack direction="column" spacing={1}>
              <Typography variant="h3" color="text.primary">
                Welcome to Ajarn Content!
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Here you will find user submitted posts and questions
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                As always do your due dillegence as an online netizen
              </Typography>
              <Divider />
            </Stack>
          </Grid>

          <Grid item xs={12} md={8} lg={10}>
              <Stack sx={{ mb: 2 }}>
                <Chip
                  label="Add New+"
                  color="primary"
                  clickable
                  onClick={() => setIsCreatePostModalOpen(true)}
                />
              </Stack>
            <StyledStackContent>
           
                <TeflBanner />
              
              <Box sx={{ width: "100%" }}>
                <Box
                  sx={{
                    p: 2,
                    mb: 2,
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "background.paper",
                  }}
                >
                  <BlogFilter
                  onQuerySelect={handleSendQuery}
                  onDataChange={handleFilterChange} 
                  onClearAll={handleClearAll}
                  />
                </Box>
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
              </Box>
            </StyledStackContent>
          </Grid>
        </StyledGridWrapper>

        <Modal
          open={isCreatePostModalOpen}
          onClose={() => setIsCreatePostModalOpen(false)}
          aria-labelledby="create-post-modal-title"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "92%", sm: 560, md: 640 },
              maxHeight: "90vh",
              overflowY: "auto",
              p: 2,
              borderRadius: 2,
              bgcolor: "background.paper",
              boxShadow: 24,
            }}
          >
            <Stack spacing={2}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "background.paper",
                }}
              >
             
                <BlogPostForm onBlogPostCreated={incomingBlogPostHandler} onCancel={() => setIsCreatePostModalOpen(false)} />
              </Box>

            </Stack>
          </Box>
        </Modal>
      </Content>
      <Footer />
    </PageContainer>
  );
};

export default AddNewBlogPost;
