import { useContext, useEffect, useState } from "react";

import { Link as RouterLink } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import ViewListIcon from "@mui/icons-material/ViewList";
import { Box, Card, Divider, Stack, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useQuery } from "@tanstack/react-query";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Footer, {
  Content,
  PageContainer,
} from "../../shared/components/UIElements/Footer";
import JobAdsList from "../../shared/components/UIElements/JobAdsList";
import { JobAdSkeleton } from "../../shared/components/UIElements/LoadingSkeletons";
import TeflBanner from "../../shared/components/UIElements/TeflBanner";
import { AuthContext } from "../../shared/context/auth-context";
import { useJob } from "../../shared/hooks/jobs-hook";
import FeaturedJobsLists from "../components/FeaturedJobsLists";
import JobFilters from "../components/JobFilters";
import {
  FeaturedJobListDiv,
  StyledAdJobDiv,
  StyledChip,
  StyledUserJobsDiv,
  UserJobListDiv,
  UsersJobFilterDiv,
} from "../components/UserJobsStyle";

const UserJobs = () => {
  const auth = useContext(AuthContext);
  const [filter, setFilter] = useState({
    location: "",
    salaryRange: "",
    hours: "",
  });

  const [jobPage, setJobPage] = useState({
    page: 1,
    limit: 5,
  });
  const [totalPages, setTotalPages] = useState(1);

  const { clearError } = useJob();

  const getAllJobs = async (page, limit, location, salaryRange, hours) => {
    try {
      const response = await fetch(
        `${
          process.env.REACT_APP_JOBS
        }?page=${page}&limit=${limit}&isHome=${false}&location=${location}&salary=${salaryRange}&hours=${hours}`
      );
      const data = await response.json();
      return {
        jobs: data.jobs,
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        totalJobs: data.totalJobs,
      };
    } catch (err) {
      console.log("There was an error retrieving jobs data" + err);
    }
  };

  const {
    data: jobs,
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      "jobs",
      jobPage.page,
      jobPage.limit,
      filter.location,
      filter.salaryRange,
      filter.hours,
    ],
    queryFn: () =>
      getAllJobs(
        jobPage.page,
        jobPage.limit,
        filter.location,
        filter.salaryRange,
        filter.hours
      ),
    staleTime: 2 * 60 * 60 * 1000,
  });

  const getFeaturedJobs = async (page, limit) => {
    const response = await fetch(
      `${process.env.REACT_APP_JOBS}/featured-jobs?isHome=${false}`
    );

    if (!response.ok) {
      throw new Error("There was an error with retrieving the jobs Data.");
    }
    const data = await response.json();
    return {
      jobs: data.jobs,
      page: data.pageNum,
      totalPages: data.totalPages,
    };
  };

  const { data: featuredJobs, isLoading: featuredJobsIsLoading } = useQuery({
    queryKey: ["featuredJobsJobsPage"],
    queryFn: () => getFeaturedJobs(),
    staleTime: 2 * 60 * 60 * 1000,
  });

  useEffect(() => {
    if (jobs?.totalPages && jobs?.totalPages !== totalPages) {
      setTotalPages(jobs?.totalPages);
    }
  }, [totalPages, jobs?.totalPages]);

  useEffect(() => {
    if (filter?.hours || filter?.salaryRange || filter?.location) {
      setJobPage({
        page: 1,
        limit: 5,
      });
    }
  }, [filter.location, filter.salaryRange, filter.hours]);

  useEffect(() => {
    window.scroll(0, 0);
  }, [jobPage.page]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handlePageChange = (page, limit) => {
    setJobPage({
      page: page,
      limit: limit,
    });
  };

  let button;
  let actionItem;

  if (auth?.isLoggedIn && auth?.user?.userType === "employer") {
    button = (
      <StyledChip
        size="small"
        variant="contained"
        component={RouterLink}
        to="/job/new"
        label="Add a Job +"
        clickable
      />
    );
    actionItem = (
      <StyledChip
        size="small"
        variant="text"
        component={RouterLink}
        to="/auth"
        label="Learn More"
        clickable
      />
    );
  } else if (!auth?.isLoggedIn) {
    button = (
      <StyledChip
        icon={<AddIcon />}
        size="small"
        variant="contained"
        disabled={!auth.isLoggedIn}
        component={RouterLink}
        to="/auth"
        label="Add Job"
        clickable
      />
    );
    actionItem = (
      <StyledChip
        label="Login/Join"
        size="small"
        variant="outlined"
        component={RouterLink}
        to="/auth"
        clickable
      />
    );
  }

  const noJobs = (
    <Box>
      <Card sx={{ padding: "0 2rem" }}>
        <Typography variant="h4" color="text.primary">
          Sorry no jobs were found for your search
        </Typography>
        {auth.isLoggedIn && auth.user?.userType === "employer" && (
          <StyledChip
            component={RouterLink}
            to="/job/new"
            label="Create a job"
            clickable
          />
        )}

        <Typography color="text.secondary" variant="body2">
          Please check again at a near time in the future.
        </Typography>
      </Card>
    </Box>
  );

  return (
    <PageContainer>
      <Content>
        <ErrorModal error={error} onClear={clearError} />
        <StyledUserJobsDiv>
          <StyledAdJobDiv>
            <Stack direction="row" alignItems="center" spacing={2}>
              <StyledChip
                variant="outlined"
                component={RouterLink}
                to={`/modern-view/jobs`}
                icon={<ViewListIcon />}
                label="Dynamic View"
                clickable
              />

              {auth?.user?.userType === "employer" && (
                <>
                  <Divider orientation="vertical" />
                  {button}
                </>
              )}

              {!auth?.isLoggedIn && (
                <>
                  <Divider orientation="vertical" />
                  {actionItem}
                </>
              )}
            </Stack>
          </StyledAdJobDiv>
          <UsersJobFilterDiv>
            <JobFilters onFilterChange={handleFilterChange} />

            <Stack>
              <TeflBanner />
            </Stack>
          </UsersJobFilterDiv>

          <UserJobListDiv>
            {isLoading && (
              <JobAdSkeleton
                sx={{
                  margin: "0.5rem 0 0.5rem 0",
                  height: "136px",
                  borderRadius: "6px",
                }}
                variant="rectangular"
                num={5}
              />
            )}
            {!isLoading && <JobAdsList job={jobs?.jobs} company={true} />}
            {totalPages > 1 && (
              <Pagination
                count={totalPages}
                page={jobPage.page}
                onChange={(event, page) => handlePageChange(page, 5)}
              />
            )}
            {!isLoading && jobs?.jobs?.length === 0 && noJobs}
          </UserJobListDiv>
          <FeaturedJobListDiv>
            {featuredJobsIsLoading && (
              <>
                <JobAdSkeleton
                  sx={{
                    margin: "0.5rem 0 0.5rem 0",
                    height: "70px",
                    borderRadius: "6px",
                  }}
                  variant="rectangular"
                  num={4}
                />
              </>
            )}

            {!featuredJobsIsLoading && (
              <FeaturedJobsLists sponsors={featuredJobs?.jobs} />
            )}
          </FeaturedJobListDiv>
        </StyledUserJobsDiv>
      </Content>
      <Footer />
    </PageContainer>
  );
};

export default UserJobs;
