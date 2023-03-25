import React from "react";

import { Grid } from "@mui/material";

import Logo from "../../logo.svg";
import UserProfileJobAd from "../../shared/components/UIElements/UserProfileJobAd";
import ProfileInformation from "../components/Profile/ProfileInformation";
import Sidebar from "../components/Sidebar";

const dummyJob = [
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
];

const TeacherDashboard = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
        <Sidebar />
      </Grid>
      <Grid item xs={12} md={9}>
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "1rem",
            gap: "5px",
          }}
        >
          <Grid item>
            <UserProfileJobAd
              id={dummyJob[0].id}
              logo={dummyJob[0].creator.logoUrl}
              title={dummyJob[0].title}
              description={dummyJob[0].description}
            />
          </Grid>
          <Grid item>
            <UserProfileJobAd
              id={dummyJob[0].id}
              logo={dummyJob[0].creator.logoUrl}
              title={dummyJob[0].title}
              description={dummyJob[0].description}
            />
          </Grid>
        </Grid>

        <ProfileInformation />
        {/**add other components here */}
      </Grid>
    </Grid>
  );
};

export default TeacherDashboard;
