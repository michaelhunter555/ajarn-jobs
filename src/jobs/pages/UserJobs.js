import { useContext, useEffect, useState } from "react";

import { Link as RouterLink } from "react-router-dom";

import EastIcon from "@mui/icons-material/East";
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
import { dummy_jobs } from "../../shared/util/DummyJobs";
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
  const [filter, setFilter] = useState(dummy_jobs);

  const [jobPage, setJobPage] = useState({
    page: 1,
    limit: 5,
  });
  const [totalPages, setTotalPages] = useState(1);

  const { clearError } = useJob();

  const getAllJobs = async (page, limit) => {
    try {
      const response = await fetch(
        `${
          process.env.REACT_APP_JOBS
        }?page=${page}&limit=${limit}&isHome=${false}`
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
    queryKey: ["jobs", jobPage.page, jobPage.limit],
    queryFn: () => getAllJobs(jobPage.page, jobPage.limit),
    staleTime: 2 * 60 * 60 * 1000,
  });

  useEffect(() => {
    if (jobs?.totalPages && jobs?.totalPages !== totalPages) {
      setTotalPages(jobs?.totalPages);
    }
  }, [totalPages, jobs?.totalPages]);

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

  const filteredJobs = jobs?.jobs?.filter((job) => {
    return (
      (!filter.location ||
        job.location.toLowerCase().includes(filter.location.toLowerCase())) &&
      (!filter.salaryRange || job.salary.includes(filter.salaryRange)) &&
      (!filter.hours || job.hours === filter.hours)
    );
  });

  //if not filter.location or dummyjobs[lowercase][includes] + (filter[location][lowercase])

  let button;
  let actionItem;

  console.log(
    "buttons should show",
    auth?.isLoggedIn && auth?.user?.userType === "employer",
    auth?.user
  );

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
        icon={<EastIcon />}
        size="small"
        variant="contained"
        disabled={!auth.isLoggedIn}
        component={RouterLink}
        to="/auth"
        label="Sign-up to create jobs!"
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
            <Stack>
              <StyledChip
                variant="outlined"
                component={RouterLink}
                to={`/modern-view/jobs`}
                icon={<ViewListIcon />}
                label="Dynamic View"
                clickable
              />
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
            {!isLoading && <JobAdsList job={filteredJobs} company={true} />}
            {!isLoading && (
              <Pagination
                count={totalPages}
                page={jobPage.page}
                onChange={(event, page) => handlePageChange(page, 5)}
              />
            )}
            {!isLoading && filteredJobs?.length === 0 && noJobs}
          </UserJobListDiv>
          <FeaturedJobListDiv>
            {isLoading && (
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
            {!isLoading && (
              <StyledAdJobDiv>
                {!isLoading && (
                  <Stack
                    sx={{ margin: "1rem auto" }}
                    spacing={2}
                    direction="row"
                    justifyContent="center"
                  >
                    {button}

                    <Divider orientation="vertical" />
                    {actionItem}
                  </Stack>
                )}
              </StyledAdJobDiv>
            )}
            {!isLoading && <FeaturedJobsLists sponsors={jobs?.jobs} />}
          </FeaturedJobListDiv>
        </StyledUserJobsDiv>
      </Content>
      <Footer />
    </PageContainer>
  );
};

export default UserJobs;
