import "./Home.css";

import React from "react";

import { GiDiploma } from "react-icons/gi";
import { GrCircleAlert } from "react-icons/gr";
import { Link } from "react-router-dom";

import Logo from "../../logo.svg";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import GlassCard from "../../shared/components/UIElements/GlassCard";
import JobAd from "../../shared/components/UIElements/JobAd";
import SolanaGlassCard from "../../shared/components/UIElements/SolanaGlassCard";
import BlogContent from "../components/BlogContent";
import RecentJobs from "../components/RecentJobs";
import Sponsors from "../components/Sponsors";

const dummy_jobs = [
  {
    id: 1,
    title: "Native ESL Teacher",
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
    id: 2,
    title: "Math Teacher for K9 Kids",
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
      <div className="grid-container">
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
          <GiDiploma size={50} style={{ margin: "1rem 0" }} />
          <Button inverse>start here</Button>
        </GlassCard>
        <div className="home-column__featured-top">
          <Card>
            <JobAd job={dummy_jobs[0]} />
          </Card>
          <Card>
            <JobAd job={dummy_jobs[1]} />
          </Card>
          <Card>
            <JobAd job={dummy_jobs[0]} />
          </Card>
        </div>

        <Card className="home-column-right__urgent-container">
          <SolanaGlassCard className="home-column__urgent-container">
            Urgent
            <GrCircleAlert />
          </SolanaGlassCard>
          <Card className="home-column__urgent-jobs">
            1. English Teacher - BKK - 50k THB
            <br />
            2. Jamaican Teacher - Koh Samui - 20k
            <br />
            3. University ESL teacher - BKK - 55k
          </Card>
        </Card>

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
        <div className="home-column__content">
          <BlogContent />
        </div>
        <div className="home-column__sponsors">
          <Sponsors />
        </div>
      </div>
    </>
  );
};

export default Home;
