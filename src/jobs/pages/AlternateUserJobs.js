import React, { useEffect, useState } from "react";

import { Box, CircularProgress, Grid, Paper, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";

import BottomFeatured from "../../home/components/BottomFeatured";
import MainFeaturedJob from "../../home/components/MainFeaturedJob";
import Footer, {
  Content,
  PageContainer,
} from "../../shared/components/UIElements/Footer";
import DynamicJobFilter from "../components/dynamicJobFilter";

const StyledGridContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "row", //column,
  gap: theme.spacing(1),
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const StyledFilterStack = styled(Stack)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const AlternateUserJobs = () => {
  const [dynamicPage, setDynamicPage] = useState({
    page: 1,
    limit: 12,
  });

  const [filter, setFilter] = useState({
    location: "",
    salaryRange: "",
    hours: "",
  });

  const [totalPages, setTotalPages] = useState(1);
  const getJobs = async (page, limit, location, salaryRange, hours) => {
    try {
      const response = await fetch(
        `${
          process.env.REACT_APP_JOBS
        }?page=${page}&limit=${limit}&isHome=${false}&location=${location}&salary=${salaryRange}&hours=${hours}`
      );

      if (!response.ok) {
        throw new Error("There was an issue retrieving the alternate jobs!");
      }

      const data = await response.json();

      return {
        job: data.jobs,
        totalPages: data.totalPages,
        page: data.pageNum,
        totalJobs: data.totalJobs,
      };
    } catch (err) {
      console.log("There was an error with aleternate jobs", err);
    }
  };

  const { data: jobs, isLoading } = useQuery({
    queryKey: [
      "alternateJobs",
      dynamicPage.page,
      dynamicPage.limit,
      filter.location,
      filter.salaryRange,
      filter.hours,
    ],
    queryFn: () =>
      getJobs(
        dynamicPage.page,
        dynamicPage.limit,
        filter.location,
        filter.salaryRange,
        filter.hours
      ),
    staleTime: 2 * 60 * 60 * 1000,
    keepPreviousData: true,
  });

  useEffect(() => {
    if (jobs && jobs?.totalPages !== totalPages) {
      setTotalPages(jobs?.totalPages);
    }
  }, [jobs, totalPages]);

  useEffect(() => {
    if (filter?.hours || filter?.salaryRange || filter?.location) {
      setDynamicPage({
        page: 1,
        limit: 12,
      });
    }
  }, [filter.location, filter.salaryRange, filter.hours]);

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const handleJobPageChange = (page) => {
    setDynamicPage({
      page: page,
      limit: dynamicPage.limit,
    });
  };
  return (
    <PageContainer>
      <Content>
        <StyledGridContainer container id="dynaJobs">
          <Grid item xs={12} md={9}>
            <Stack spacing={2}>
              <Paper elevation={2} sx={{ padding: 2, borderRadius: 5 }}>
                <StyledFilterStack>
                  <DynamicJobFilter onFilterChange={handleFilterChange} />
                </StyledFilterStack>
              </Paper>
              {isLoading && <CircularProgress />}
              {/* {<DynamicJobSkeleton isLoading={isLoading} height={500} />} */}

              {jobs && !isLoading && (
                <MainFeaturedJob
                  page={dynamicPage}
                  onPageChange={handleJobPageChange}
                  totalPages={totalPages}
                  fontSize={14}
                  height={500}
                  featured={false}
                  jobs={jobs?.job}
                  filter={filter}
                />
              )}
            </Stack>
            {/*isLoading && <LinearProgress />*/}
          </Grid>
        </StyledGridContainer>
        <Box sx={{ margin: "3rem auto" }}>
          <BottomFeatured />
        </Box>
      </Content>
      <Footer />
    </PageContainer>
  );
};

export default AlternateUserJobs;
