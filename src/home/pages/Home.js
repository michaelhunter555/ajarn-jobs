import React from "react";

import { Link as RouterLink } from "react-router-dom";

import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

import Footer from "../../shared/components/UIElements/Footer";
import JobAd from "../../shared/components/UIElements/JobAd";
import { dummy_jobs } from "../../shared/util/DummyJobs";
import BlogContent from "../components/BlogContent";
import BottomFeatured from "../components/BottomFeatured";
import BottomFeaturedAdsList from "../components/BottomFeaturedAdsList";
import RecentJobs from "../components/RecentJobs";
import SiteFeatures from "../components/SiteFeatures";
import SponsorsList from "../components/SponsorsList";
import Tefl from "../components/Tefl";
import UrgentJobs from "../components/UrgentJobs";

const StyledGridContainer = styled("div")(({ theme }) => ({
  display: "grid",
  justifyContent: "center",
  alignItems: "start",
  gridTemplateColumns: "20% 45% 20%",
  gridAutoRows: "auto",
  margin: "6rem 0 2rem 0",
  gap: "6px",

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
  gridColumn: "2/3",
  height: "auto",
  borderRadius: "15px",
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
  boxShadow: "0 0 20px rgba(112, 180, 247, 0.5)",
  overflow: "auto",
  borderRadius: "15px",
  [theme.breakpoints.down("md")]: {
    gridColumn: 1,
    gridRow: 3,
  },
  [theme.breakpoints.down("sm")]: {
    gridColumn: 1,
    gridRow: 3,
  },
}));

const StyledHomeFeaturedSponsors = styled("div")(({ theme }) => ({
  textAlign: "center",
  boxShadow: "0 0 20px rgba(112, 180, 247, 0.5)",
  overflow: "auto",
  borderRadius: "15px",
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
  return (
    <>
      {/* */}
      <StyledGridContainer>
        {/* top-left column*/}
        <StyledTeflWrapper>
          <Tefl />
        </StyledTeflWrapper>
        <StyledHomeFeaturedTop>
          <JobAd job={dummy_jobs[0]} />
          {/* top-middle column */}
        </StyledHomeFeaturedTop>

        {/* top-right column*/}
        <StyledUrgentJobsWrapper>
          <UrgentJobs job={dummy_jobs} />
        </StyledUrgentJobsWrapper>

        {/*lower-left column */}
        <StyledHomeFeaturedJobs>
          <RecentJobs homeJobs={dummy_jobs} />
          <Button component={RouterLink} to="/jobs">
            View All Jobs
          </Button>
        </StyledHomeFeaturedJobs>
        {/* lower middle-column*/}
        <StyledHomeFeaturedContent>
          <BlogContent />
          {/** {state && <JobDetails />} */}
        </StyledHomeFeaturedContent>
        {/* lower-right column*/}
        <StyledHomeFeaturedSponsors>
          <SponsorsList sponsor={dummy_jobs} />
          <Button component={RouterLink} to="/jobs">
            Become a Sponsor
          </Button>
        </StyledHomeFeaturedSponsors>
      </StyledGridContainer>
      <div>
        <SiteFeatures />
      </div>
      <div>
        <BottomFeatured />
      </div>
      <div>
        <h2 style={{ textAlign: "center" }}>Jobs You may like:</h2>{" "}
        <BottomFeaturedAdsList footerJobs={dummy_jobs} />
      </div>
      <Footer />
    </>
  );
};

export default Home;
