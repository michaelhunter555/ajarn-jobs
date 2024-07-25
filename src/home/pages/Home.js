import React, { useEffect, useState } from "react";

import { Link as RouterLink } from "react-router-dom";

import { Button } from "@mui/material";
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
import RecentJobs from "../components/RecentJobs";
import SiteFeatures from "../components/SiteFeatures";
import Tefl from "../components/Tefl";
import UrgentJobs from "../components/UrgentJobs";
import {
  StyledGridContainer,
  StyledHomeFeaturedContent,
  StyledHomeFeaturedContentList,
  StyledHomeFeaturedJobs,
  StyledHomeFeaturedTop,
  StyledTeflWrapper,
  StyledUrgentJobsWrapper,
} from "./HomeStyles";

const Home = () => {
  //featured jobs page, limit & total pages
  const [featuredPage, setFeaturedPage] = useState({
    page: 1,
    limit: 10,
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
      `${process.env.REACT_APP_JOBS}?isHome=true&page=5&limit=10`
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
          {/* top-left column*/}
          <StyledTeflWrapper>
            {!homepageIsLoading && <Tefl />}
            {homepageIsLoading && (
              <JobAdSkeleton
                sx={{
                  height: "126px",
                  borderRadius: "6px",
                }}
                num={1}
                variant="rectangular"
              />
            )}
          </StyledTeflWrapper>

          <StyledHomeFeaturedTop>
            {homepageIsLoading && (
              <JobAdSkeleton
                sx={{
                  height: "126px",
                  borderRadius: "6px",
                }}
                num={1}
                variant="rectangular"
              />
            )}
            {!homepageIsLoading && randomFeaturedJob && (
              <JobAd key={randomFeaturedJob?._id} job={randomFeaturedJob} />
            )}

            {/* top-middle column */}
          </StyledHomeFeaturedTop>

          {/* top-right column*/}
          <StyledUrgentJobsWrapper>
            {homepageIsLoading && (
              <JobAdSkeleton
                sx={{
                  height: "130px",
                  borderRadius: "6px",
                }}
                num={1}
                variant="rectangular"
              />
            )}
            {!homepageIsLoading && <UrgentJobs job={homeJobs} />}
          </StyledUrgentJobsWrapper>

          {/*lower-left column */}
          <StyledHomeFeaturedJobs>
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

            <Button component={RouterLink} to="/jobs">
              View All Jobs
            </Button>
          </StyledHomeFeaturedJobs>

          {/* lower middle-column*/}
          <StyledHomeFeaturedContent id="jobsTop">
            {homepageIsLoading && (
              <JobAdSkeleton
                num={1}
                sx={{ height: 500, width: "100%" }}
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
          </StyledHomeFeaturedContent>

          {/* lower-right column*/}
          <StyledHomeFeaturedContentList>
            {homepageIsLoading && (
              <JobAdSkeleton
                sx={{
                  height: "95px",
                }}
                num={5}
                variant="rectangular"
              />
            )}
            {!homepageIsLoading && <FeaturedContentList posts={contentList} />}
            <Button component={RouterLink} to="/content">
              Make a post
            </Button>
          </StyledHomeFeaturedContentList>
        </StyledGridContainer>
        <div>
          <SiteFeatures isLoading={homepageIsLoading} />
        </div>
        <div style={{ margin: "1rem auto" }}>
          <AjarnHowToHelper />
        </div>
        <div>
          <BottomFeatured isLoading={homepageIsLoading} />
        </div>
        <div>
          <h2 style={{ textAlign: "center" }}>Jobs You may like:</h2>{" "}
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
