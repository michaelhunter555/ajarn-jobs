import React, { useEffect, useState } from "react";

import WorkIcon from "@mui/icons-material/Work";
//import { Link } from 'react-router-dom';
import {
  Divider,
  Grid,
  Pagination,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import AjarnHowToHelper from "../../introduction/HowToLead";
import Footer, {
  Content,
  PageContainer,
} from "../../shared/components/UIElements/Footer";
import JobAd from "../../shared/components/UIElements/JobAd";
import { JobAdSkeleton } from "../../shared/components/UIElements/LoadingSkeletons";
//import { useHttpClient } from "../../shared/hooks/http-hook";
import BottomFeatured from "../components/BottomFeatured";
import BottomFeaturedAdsList from "../components/BottomFeaturedAdsList";
import FeaturedContentList from "../components/FeaturedContentList";
import JobContent from "../components/JobContent";
import MobileJobsAccordion from "../components/MobileJobsAccordion";
import RecentJobs from "../components/RecentJobs";
import SiteFeatures from "../components/SiteFeatures";
import WelcomeCard from "../components/WelcomeCard";
import {
  StyledGridContainer,
  StyledHomeFeaturedContent,
  StyledHomeFeaturedTop,
} from "./HomeStyles";

const Home = () => {
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(
    theme.breakpoints.down("sm") || theme.breakpoints.down("md")
  );
  //featured jobs page, limit & total pages
  const [featuredPage, setFeaturedPage] = useState({
    page: 1,
    limit: isMobileOrTablet ? 6 : 10,
  });
  const [totalFeaturedPages, setTotalFeaturedPages] = useState(1);

  const getFeaturedJobs = async (page, limit) => {
    const response = await fetch(
      `${
        process.env.REACT_APP_JOBS
      }/featured-jobs?isHome=${true}&page=${page}&limit=${limit}`
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
    queryKey: ["featuredJobs", featuredPage.page, featuredPage.limit],
    queryFn: () => getFeaturedJobs(featuredPage.page, featuredPage.limit),
    staleTime: 2 * 60 * 60 * 1000,
    keepPreviousData: true,
  });

  useEffect(() => {
    if (featuredJobs?.totalPages !== totalFeaturedPages) {
      setTotalFeaturedPages(featuredJobs?.totalPages);
    }
  }, [featuredJobs?.totalPages, totalFeaturedPages]);

  //GET Jobs for API Cache
  const getJobsData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_JOBS}?isHome=false&page=1&limit=5`
    );

    if (!response.ok) {
      throw new Error("There was an error with retrieving the jobs Data.");
    }
    const data = await response.json();
    return data.jobs;
  };

  const { data: homeJobs, isLoading } = useQuery({
    queryKey: ["homePageJobs"],
    queryFn: () => getJobsData(),
    staleTime: 2 * 60 * 60 * 1000,
  });

  //GET all user content for API Cache
  const getAllContent = async () => {
    const response = await fetch(`${process.env.REACT_APP_BLOG}`);
    if (!response.ok) {
      throw new Error("There was an error trying to get content posts.");
    }
    const data = await response.json();
    return data.blogList;
  };

  const { data: contentList, isLoading: contentListIsLoading } = useQuery({
    queryKey: ["homeContentList"],
    queryFn: () => getAllContent(),
  });

  //Randomize the job
  const randomFeaturedJob = featuredJobs?.jobs
    ? featuredJobs?.jobs[Math.floor(Math.random() * featuredJobs?.jobs?.length)]
    : null;

  const handleFeaturedPageChange = (page) => {
    setFeaturedPage({
      page: page,
      limit: featuredPage.limit,
    });
  };

  const homepageIsLoading =
    featuredJobsIsLoading || contentListIsLoading || isLoading;

  return (
    <PageContainer>
      <Content>
        <StyledGridContainer>
          {/* top-middle column */}
          <StyledHomeFeaturedTop>
            <Stack sx={{ width: "100%" }}>
              {homepageIsLoading && (
                <Grid
                  container
                  sx={{
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: { md: "center" },
                  }}
                  spacing={2}
                >
                  <Grid item xs={12} md={2}>
                    <JobAdSkeleton
                      sx={{
                        fontSize: 11,
                        width: "100%",
                        borderRadius: "6px",
                      }}
                      num={1}
                      variant="text"
                    />
                    <JobAdSkeleton
                      sx={{
                        fontSize: 11,
                        width: "80%",
                        borderRadius: "6px",
                      }}
                      num={1}
                      variant="text"
                    />
                    <JobAdSkeleton
                      sx={{
                        fontSize: 11,
                        width: "70%",
                        borderRadius: "6px",
                      }}
                      num={1}
                      variant="text"
                    />
                  </Grid>
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ margin: "0.5rem" }}
                  />
                  <Grid item xs={12} md={9}>
                    <JobAdSkeleton
                      sx={{
                        height: "5.5rem",

                        borderRadius: "6px",
                      }}
                      num={1}
                      variant="rectangular"
                    />
                  </Grid>
                </Grid>
              )}
            </Stack>
            {!homepageIsLoading && randomFeaturedJob && (
              <Grid
                container
                sx={{
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: { md: "center" },
                }}
                spacing={2}
              >
                <Grid item xs={12} md={2}>
                  <Typography
                    color="text.secondary"
                    component="h2"
                    variant="h6"
                  >
                    Find Teaching Jobs
                  </Typography>
                  <Typography
                    color="text.secondary"
                    component="h3"
                    variant="subtitle2"
                  >
                    Welcome to AjarnJobs.com a resource for finding teaching
                    jobs in Thailand & Asia.
                  </Typography>
                </Grid>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ margin: "0.5rem" }}
                />
                <Grid item xs={12} md={9}>
                  <JobAd key={randomFeaturedJob?._id} job={randomFeaturedJob} />
                </Grid>
              </Grid>
            )}
          </StyledHomeFeaturedTop>

          {/* lower middle-column*/}
          <StyledHomeFeaturedContent
            id="jobsTop"
            sx={{
              ...(!homepageIsLoading && {
                boxShadow: "0 0 20px rgba(112, 180, 247, 0.5)",
              }),
            }}
          >
            {/* only load for desktop */}
            {homepageIsLoading && !isMobileOrTablet && (
              <JobAdSkeleton
                num={1}
                sx={{ height: 500 }}
                variant="rectangular"
              />
            )}

            {!homepageIsLoading && (
              <JobContent
                page={featuredPage}
                totalPages={totalFeaturedPages}
                onPageChange={handleFeaturedPageChange}
                featuredJobs={featuredJobs?.jobs}
              />
            )}

            <MobileJobsAccordion
              jobs={featuredJobs?.jobs}
              jobsIsLoading={homepageIsLoading}
            />
            {isMobileOrTablet && totalFeaturedPages > 1 && (
              <Pagination
                count={totalFeaturedPages}
                page={featuredPage.page}
                onChange={(event, page) => handleFeaturedPageChange(page)}
              />
            )}
          </StyledHomeFeaturedContent>

          <Divider sx={{ margin: "0.5rem auto", width: "95%" }} />
          <div>
            <SiteFeatures isLoading={homepageIsLoading} />
          </div>

          <Grid
            container
            sx={{
              width: { xs: "100%", md: "100%" },
              flexDirection: { xs: "column", md: "row" },
              justifyContent: { md: "center" },
              alignItems: { md: "stretch" },
            }}
            spacing={2}
          >
            <Grid item xs={12} md={3}>
              {homepageIsLoading && (
                <JobAdSkeleton
                  sx={{
                    height: "95px",
                  }}
                  num={5}
                  variant="rectangular"
                />
              )}
              {!homepageIsLoading && <RecentJobs homeJobs={homeJobs} />}
            </Grid>
            <Grid item xs={12} md={5}>
              {homepageIsLoading && (
                <JobAdSkeleton
                  sx={{
                    height: "95px",
                  }}
                  num={5}
                  variant="rectangular"
                />
              )}
              {!homepageIsLoading && (
                <FeaturedContentList posts={contentList} />
              )}
            </Grid>
            <Grid item xs={12} md={4}>
              {homepageIsLoading && (
                <JobAdSkeleton
                  sx={{
                    height: "95px",
                    borderRadius: "6px",
                  }}
                  num={5}
                  variant="rectangular"
                />
              )}

              {!homepageIsLoading && <WelcomeCard />}
            </Grid>
          </Grid>

          <div>
            <Divider />
            <AjarnHowToHelper />
            <Divider />
          </div>
          <div>
            <BottomFeatured isLoading={homepageIsLoading} />
          </div>
          <Divider flexItem />
        </StyledGridContainer>
        <div>
          <Typography align="center" variant="h6" color="text.secondary">
            Jobs you may like <WorkIcon sx={{ fontSize: 14 }} />
          </Typography>

          <BottomFeaturedAdsList
            isLoading={homepageIsLoading}
            footerJobs={homeJobs}
          />
        </div>
      </Content>
      {/* */}

      <Footer />
    </PageContainer>
  );
};

export default Home;
