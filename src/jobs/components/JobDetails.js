import React, { useContext } from "react";

import {
  FaClipboardList,
  FaClock,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaMoneyBill,
} from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

import BusinessIcon from "@mui/icons-material/Business";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Grid,
  Link,
  Paper,
  Typography,
} from "@mui/material";

import { AuthContext } from "../../shared/context/auth-context";
import JobDataTable from "./JobDataTable";

const JobDetails = (props) => {
  const authCtx = useContext(AuthContext);
  const { job } = props;

  //add function for sending job application to employer. maybe email.js?
  // const sendApplicationHandler = (event, userId) => {
  //   event.preventDefault();

  // const sendRequest = async (jobId, userId) => {
  //   const responseData = await sendRequest(
  //     "http://localhost:8080/job",
  //     "POST",
  //     JSON.stringify({})
  //     ,
  //     {'Content-Type': 'application/json'}
  //     );
  // };
  // };

  const jobSpecifications = [
    { text: "Location", icon: <FaMapMarkerAlt />, data: job.location },
    { text: "Requirements", icon: <FaGraduationCap />, data: job.requirements },
    { text: "Salary", icon: <FaMoneyBill />, data: job.salary },
    {
      text: "Work Permit",
      icon: <FaClipboardList />,
      data: job.workPermit ? "✅" : "⛔",
    },
    { text: "Hours", icon: <FaClock />, data: job.hours },
  ];

  const jobInformation = [
    { variant: "h5", component: "h2", text: job.title },
    {
      variant: "subtitle2",
      component: "h3",
      text: <Chip size="small" label={job.creator.company}></Chip>,
    },
    {
      variant: "subtitle2",
      component: "h3",
      icon: <LocationOnIcon size="inherit" />,
      text: "location " + job.creator.headquarters,
    },
    {
      variant: "subtitle2",
      component: "h3",
      icon: <BusinessIcon size="inherit" />,
      text: job.creator.companySize + " employees",
    },
    {
      variant: "subtitle2",
      component: "h3",
      icon: <VerifiedUserIcon size="inherit" />,
      text: "established in " + job.creator.established,
    },
    {
      variant: "subtitle2",
      component: "h3",
      icon: <EventAvailableIcon size="inherit" />,
      text: <Link href={job.creator.url}>{job.creator.url}</Link>,
    },
  ];

  let outlinedButton;

  if (authCtx.isLoggedIn) {
    outlinedButton = (
      <Button
        sx={{ borderRadius: "17px" }}
        onClick={() => console.log("POST request")}
        variant="outlined"
      >
        Apply Now
      </Button>
    );
  } else {
    outlinedButton = (
      <Button
        sx={{ borderRadius: "17px" }}
        component={RouterLink}
        to="/auth"
        variant="outlined"
      >
        login/join
      </Button>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "80%",
          margin: "0 auto",
        }}
      >
        <Grid
          spacing={2}
          container
          direction="row"
          sx={{ justifyContent: "flex-start" }}
        >
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            container
            direction="column"
            justifyContent="flex-start"
            spacing={2}
          >
            <Grid
              item
              container
              direction="row"
              spacing={1}
              sx={{ marginTop: 4 }}
            >
              {/**grid item 1 */}
              <Grid item>
                <Avatar
                  variant="circular"
                  src={job.creator.logoUrl}
                  sx={{ height: 175, width: 175, border: "1px solid #e5e5e5" }}
                  alt={`${job.id}--${job.creator.company}`}
                />
              </Grid>
              {/**grid item 2 */}
              <Grid item sx={{ margin: "0 0 0 0.5rem" }}>
                {jobInformation.map(({ variant, component, icon, text }) => (
                  <Typography
                    color="text.secondary"
                    variant={variant}
                    component={component}
                  >
                    {icon && <>{icon} </>}
                    {text}
                  </Typography>
                ))}
                <Divider flexItem sx={{ margin: "0.5rem 0" }} />
              </Grid>
              <Grid item>{outlinedButton}</Grid>
            </Grid>

            <Grid item sx={{ MaxWidth: "100%" }}>
              <Card sx={{ padding: 2 }}>
                <Typography variant="h6" component="h4">
                  A little about {job.creator.company}:
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  {job.creator.about}
                </Typography>
                <Divider />

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    flexWrap: "wrap",
                  }}
                >
                  {job.creator.presence.map((item, i) => (
                    <Chip
                      key={i}
                      clickable
                      label={item}
                      variant="outlined"
                      sx={{ margin: "1rem 8px 8px 0" }}
                    />
                  ))}
                </Box>
              </Card>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6} sx={{ marginTop: 4 }}>
            <JobDataTable jobSpecifications={jobSpecifications} />
            <Divider sx={{ margin: "1rem auto" }} />

            <Paper elevation={0} sx={{ padding: "2rem", borderRadius: "17px" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <Typography variant="h5" component="h4">
                  {job.title}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  component="text"
                >
                  date posted: {job.datePosted}
                </Typography>
              </Box>

              <Divider />
              {job.description}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default JobDetails;
