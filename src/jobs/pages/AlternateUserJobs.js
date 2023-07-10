import React from "react";

import { Link as RouterLink } from "react-router-dom";

import { Button, Grid, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import MainFeaturedJob from "../../home/components/MainFeaturedJob";
import FeaturedJobsLists from "../components/FeaturedJobsLists";

const AlternateUserJobs = () => {
  const getJobs = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_JOBS}`);

      if (!response.ok) {
        throw new Error("There was an issue retrieving the alternate jobs!");
      }

      const data = await response.json();
      console.log(data);
      return data.jobs;
    } catch (err) {
      console.log("There was an error with aleternate jobs", err);
    }
  };

  const { data: jobs } = useQuery(["alternateJobs"], () => getJobs());

  return (
    <Grid container direction="row" spacing={1}>
      <Grid item xs={12} sm={9}>
        <Stack>
          <Button
            sx={{ backgroundColor: "rgba(18, 140, 177, 0.04)" }}
            component={RouterLink}
            to="/jobs"
          >
            Go back to Classic View
          </Button>
        </Stack>
        <MainFeaturedJob
          fontSize={14}
          height={500}
          featured={false}
          jobs={jobs}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <FeaturedJobsLists sponsors={jobs} />
      </Grid>
    </Grid>
  );
};

export default AlternateUserJobs;
