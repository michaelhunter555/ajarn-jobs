import "./Home.css";

import React from "react";

import { GiDiploma } from "react-icons/gi";
import { GrCircleAlert } from "react-icons/gr";
import { Link } from "react-router-dom";

import { IconButton, Tooltip } from "@mui/material";

import Logo from "../../logo.svg";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import GlassCard from "../../shared/components/UIElements/GlassCard";
import JobAd from "../../shared/components/UIElements/JobAd";
import SolanaGlassCard from "../../shared/components/UIElements/SolanaGlassCard";
import BlogContent from "../components/BlogContent";
import RecentJobs from "../components/RecentJobs";
import SponsorsList from "../components/SponsorsList";

const dummy_jobs = [
  {
    id: "1",
    title: "Native ESL Teacher",
    creationDate: "2023-03-10",
    location: "Bangkok",
    salary: "50,000THB p/m",
    requirements: "Bachelor's degree, TEFL certification",
    description: "Teach English to primary and secondary students in Bangkok.",
    datePosted: "2023-02-28",
    hours: "Full-time",
    jobType: {
      basic: false,
      flare: false,
      featured: true,
    },
    creator: {
      company: "Sine Education",
      logoUrl: Logo,
      companySize: "10-50",
    },
  },
  {
    id: "2",
    title: "Math Teacher for K9 Kids",
    creationDate: "2023-03-02",
    location: "Chiang Mai",
    salary: "80,000THB p/m",
    requirements:
      "Bachelor's degree in Mathematics, teaching experience preferred",
    description: "Teach Mathematics to secondary students in Chiang Mai.",
    datePosted: "2023-02-27",
    hours: "Full-time",
    jobType: {
      basic: false,
      flare: false,
      featured: false,
    },
    creator: {
      company: "BFits",
      logoUrl: Logo,
      companySize: "10-20",
    },
  },
];

const Home = () => {
  return (
    <>
      {/* */}
      <div className="grid-container">
        {/* top-left column*/}
        <GlassCard
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "1rem",
            alignItems: "center",
            color: "black",
            border: "1px solid #a7e7e1",
          }}
        >
          Get TEFL Certified?
          <GiDiploma size={30} style={{ margin: "1rem 0" }} />
          <Button inverse>start here</Button>
        </GlassCard>
        <div className="home-column__featured-top">
          <JobAd job={dummy_jobs[0]} />
          {/* top-middle column */}
        </div>

        {/* top-right column*/}
        <Card className="home-column-right__urgent-container">
          <SolanaGlassCard className="home-column__urgent-container">
            Priority Hire
            <Tooltip title="actively hiring!">
              <IconButton>
                <GrCircleAlert />
              </IconButton>
            </Tooltip>
          </SolanaGlassCard>
          <Card className="home-column__urgent-jobs">
            1. English Teacher - BKK - 50k THB
            <br />
            2. Jamaican Teacher - Koh Samui - 20k
            <br />
            3. University ESL teacher - BKK - 55k
          </Card>
        </Card>
        {/*lower-left column */}
        <div className="home-column__jobs">
          <RecentJobs homeJobs={dummy_jobs} />
          <Link
            style={{
              textDecoration: "underline",
              color: "gray",
            }}
            to="/jobs"
          >
            View All Jobs
          </Link>
        </div>
        {/* lower middle-column*/}
        <div className="home-column__content">
          <BlogContent />
        </div>
        {/* lower-right column*/}
        <div className="home-column__sponsors">
          <SponsorsList sponsor={dummy_jobs} />
        </div>
      </div>
    </>
  );
};

export default Home;
