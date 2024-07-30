import React from "react";

import { Link } from "react-router-dom";

import {
  CardMedia,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

const imageUrl =
  "https://res.cloudinary.com/dtqbxfe7r/image/upload/v1721794614/teacher-noblue_enhpgz.svg";
const AjarnHowToHelper = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        background: "transparent",
        borderRadius: 5,
        padding: 2,
        margin: "0 auto 1rem",
      }}
    >
      <Stack
        sx={{ flexDirection: { xs: "column", md: "row" } }}
        alignItems="center"
        spacing={2}
      >
        <Stack sx={{ width: { xs: "100%", md: "100%" } }} alignItems="start">
          <Typography variant="h4" color="text.secondary">
            Learn About Ajarn Jobs
          </Typography>
          <Typography gutterBottom variant="subtitle1" color="text.secondary">
            Our aim is to seamlessly connect teachers and employers through our
            platform through a user-friendly interface. If you are new to
            AjarnJobs.com take a quick moment to learn how you can use our
            website and the features available to you depending on your user
            type (teacher or employer). We are actively improving the website
            and plan to implement new features over time.
          </Typography>
        </Stack>
        <Divider
          orientation="vertical"
          sx={{ width: 20, margin: "0.5rem !important" }}
          flexItem
        />
        <Stack>
          <CardMedia
            sx={{ width: { xs: "100%", md: "75%" }, margin: "0 auto" }}
            component="img"
            src={imageUrl}
            alt="get-started-ajarn-jobs"
          />
          <Divider sx={{ margin: "0.5rem auto", width: "80%" }} />
          <Chip
            variant="contained"
            color="primary"
            component={Link}
            clickable
            label="Learn More"
            to="/how-to-use-ajarn-jobs"
          />
        </Stack>
      </Stack>
    </Paper>
  );
};

export default AjarnHowToHelper;
