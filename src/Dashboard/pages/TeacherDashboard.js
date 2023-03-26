import React, { useState } from "react";

import { Grid } from "@mui/material";

import JobAdsList from "../../shared/components/UIElements/JobAdsList";
import UserProfileJobAd from "../../shared/components/UIElements/UserProfileJobAd";
import { dummy_jobs } from "../../shared/util/DummyJobs";
import ProfileInformation from "../components/Profile/ProfileInformation";
import Sidebar from "../components/Sidebar";

const TeacherDashboard = () => {
  const [currentComponent, setCurrentComponent] = useState("profile");

  const handleMenuItemClick = (componentName) => {
    setCurrentComponent(componentName);
  };

  const renderComponent = () => {
    switch (currentComponent) {
      case "profile":
        return <ProfileInformation />;
      case "job-listings":
        return <JobAdsList job={dummy_jobs} />;
      default:
        return <ProfileInformation />;
    }
  };

  return (
    <Grid container spacing={2} sx={{ maxWidth: "90%", margin: "0 auto" }}>
      <Grid item xs={12} md={3}>
        <Sidebar onMenuItemClick={handleMenuItemClick} />
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
              id={dummy_jobs[0].id}
              logo={dummy_jobs[0].creator.logoUrl}
              title={dummy_jobs[0].title}
              description={dummy_jobs[0].description}
            />
          </Grid>
          <Grid item>
            <UserProfileJobAd
              id={dummy_jobs[0].id}
              logo={dummy_jobs[0].creator.logoUrl}
              title={dummy_jobs[0].title}
              description={dummy_jobs[0].description}
            />
          </Grid>
        </Grid>

        <Grid
          item
          sx={{
            maxWidth: "80%",
            display: "flex",
            justifyContet: "flex-start",
            flexDirection: "column",
          }}
        >
          {renderComponent()}
        </Grid>
        {/**add other components here */}
      </Grid>
    </Grid>
  );
};

export default TeacherDashboard;
