import React from "react";

import { Link as RouterLink } from "react-router-dom";

import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";

import Footer from "../../shared/components/UIElements/Footer";
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

const StyledGridContainer = styled("div")(({ theme }) => ({
  display: "grid",
  justifyContent: "center",
  alignItems: "start",
  gridTemplateColumns: "20% 50% 20%",
  gridAutoRows: "auto",
  margin: "0rem 0 2rem 0",
  gap: "15px",

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "100%",
    gridAutoColumns: "auto",
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "100%",
    gridAutoColumns: "auto",
  },
}));

const StyledHomeFeaturedTop = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gridAutoRows: "auto",
  alignItems: "stretch",
  gap: "5px",
  [theme.breakpoints.down("md")]: {
    gridColumn: 1,
    gridRow: 1,
  },
  [theme.breakpoints.down("sm")]: {
    gridColumn: 1,
    gridRow: 1,
  },
}));

const StyledHomeFeaturedContent = styled("div")(({ theme }) => ({
  backgroundColor: "rgb(255, 255, 255)",
  boxShadow: "0 0 20px rgba(112, 180, 247, 0.5)",
  gridColumn: "2/3",
  borderRadius: "15px",
  overflow: "auto",
  [theme.breakpoints.down("md")]: {
    gridColumn: 1,
    gridRow: 2,
  },
  [theme.breakpoints.down("sm")]: {
    gridColumn: 1,
    gridrow: 2,
  },
}));

const StyledHomeFeaturedJobs = styled("div")(({ theme }) => ({
  textAlign: "center",
  boxShadow: "0 0 5px rgba(112, 180, 247, 0.5)",
  overflow: "auto",
  borderRadius: "5px",
  [theme.breakpoints.down("md")]: {
    gridColumn: 1,
    gridRow: 3,
  },
  [theme.breakpoints.down("sm")]: {
    gridColumn: 1,
    gridRow: 3,
  },
}));

const StyledHomeFeaturedContentList = styled("div")(({ theme }) => ({
  textAlign: "center",
  boxShadow: "0 0 5px rgba(112, 180, 247, 0.5)",
  overflow: "auto",
  borderRadius: "5px",
  [theme.breakpoints.down("md")]: {
    gridcolumn: 1,
    gridRow: 4,
  },
  [theme.breakpoints.down("sm")]: {
    gridColumn: 1,
    gridRow: 4,
  },
}));

const StyledUrgentJobsWrapper = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    gridColumn: 1,
    gridRow: 5,
  },
  [theme.breakpoints.down("sm")]: {
    gridColumn: 1,
    gridRow: 5,
  },
}));

const StyledTeflWrapper = styled("div")(({ theme }) => ({
  height: "100%",
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  alignItems: "stretch",

  [theme.breakpoints.down("md")]: {
    gridColumn: 1,
    gridRow: 6,
  },
  [theme.breakpoints.down("sm")]: {
    gridColumn: 1,
    gridRow: 6,
  },
}));

const Home = () => {
  //GET Jobs for API Cache
  const getJobsData = async () => {
    const response = await fetch(`${process.env.REACT_APP_JOBS}`);

    if (!response.ok) {
      throw new Error("There was an error with retrieving the jobs Data.");
    }
    const data = await response.json();
    return data.jobs;
  };

  const { data: homeJobs, isLoading } = useQuery(["homePageJobs"], () =>
    getJobsData()
  );

  //GET all user content for API Cache
  const getAllContent = async () => {
    const response = await fetch(`${process.env.REACT_APP_BLOG}`);
    if (!response.ok) {
      throw new Error("There was an error trying to get content posts.");
    }
    const data = await response.json();
    return data.blogList;
  };

  const { data: contentList } = useQuery(["homeContentList"], () =>
    getAllContent()
  );

  //Filter jobs for featured
  const filterFeaturedJobs = homeJobs?.filter(
    (job) => job?.jobType === "featured"
  );

  //Randomize the job
  const randomFeaturedJob = filterFeaturedJobs
    ? filterFeaturedJobs[Math.floor(Math.random() * filterFeaturedJobs?.length)]
    : null;

  return (
    <>
      {/* */}
      <StyledGridContainer>
        {/* top-left column*/}
        <StyledTeflWrapper>
          {!isLoading && <Tefl />}
          {isLoading && (
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
          {isLoading && (
            <JobAdSkeleton
              sx={{
                height: "126px",
                borderRadius: "6px",
              }}
              num={1}
              variant="rectangular"
            />
          )}
          {!isLoading && randomFeaturedJob && (
            <JobAd key={randomFeaturedJob?._id} job={randomFeaturedJob} />
          )}

          {/* top-middle column */}
        </StyledHomeFeaturedTop>

        {/* top-right column*/}
        <StyledUrgentJobsWrapper>
          {isLoading && (
            <JobAdSkeleton
              sx={{
                height: "130px",
                borderRadius: "6px",
              }}
              num={1}
              variant="rectangular"
            />
          )}
          {!isLoading && <UrgentJobs job={homeJobs} />}
        </StyledUrgentJobsWrapper>

        {/*lower-left column */}
        <StyledHomeFeaturedJobs>
          {isLoading && (
            <JobAdSkeleton
              sx={{
                height: "95px",
              }}
              num={4}
              variant="rectangular"
            />
          )}
          {!isLoading && <RecentJobs homeJobs={homeJobs} />}

          <Button component={RouterLink} to="/jobs">
            View All Jobs
          </Button>
        </StyledHomeFeaturedJobs>

        {/* lower middle-column*/}
        <StyledHomeFeaturedContent>
          {isLoading && (
            <JobAdSkeleton
              num={1}
              sx={{ height: 420, width: 855 }}
              variant="rectangular"
            />
          )}
          {!isLoading && <JobContent featuredJobs={filterFeaturedJobs} />}
        </StyledHomeFeaturedContent>

        {/* lower-right column*/}
        <StyledHomeFeaturedContentList>
          {isLoading && (
            <JobAdSkeleton
              sx={{
                height: "95px",
              }}
              num={4}
              variant="rectangular"
            />
          )}
          {!isLoading && <FeaturedContentList posts={contentList} />}
          <Button component={RouterLink} to="/content">
            Make a post
          </Button>
        </StyledHomeFeaturedContentList>
      </StyledGridContainer>
      <div>
        <SiteFeatures isLoading={isLoading} />
      </div>
      <div>
        <BottomFeatured isLoading={isLoading} />
      </div>
      <div>
        <h2 style={{ textAlign: "center" }}>Jobs You may like:</h2>{" "}
        <BottomFeaturedAdsList isLoading={isLoading} footerJobs={homeJobs} />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
