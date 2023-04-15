import React, { useContext } from "react";

import {
  FaClipboardList,
  FaClock,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaMoneyBill,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import BusinessIcon from "@mui/icons-material/Business";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  ListItem,
  Typography,
} from "@mui/material";

import { AuthContext } from "../../shared/context/auth-context";
import JobDataTable from "./JobDataTable";

// const StyledGridContainer = styled(Grid)(({ theme, alert, jobData }) => ({
//   display: "flex",
//   flexDirection: alert ? "" : jobData ? "column" : "row",
//   alignItems: "center",
//   justifyContent: alert ? "flex-end" : jobData ? "" : "flex-start",
//   margin: alert ? "1rem 0 0 0" : "1rem 0 0.5rem 3rem",
//   gap: alert ? "1rem" : "",
//   fontSize: jobData ? 17 : "",
//   padding: jobData ? 2 : "",
// }));

// //job title || school
// const StyledJobTitle = styled("div")({
//   fontSize: "2rem",
//   fontWeight: "bold",
//   textAlign: "center",
// });

// //image styles of school
// const StyledCardMedia = styled(CardMedia)({
//   border: "1px solid #e5e5e5",
//   margin: "0 0 0.5rem 0",
//   borderRadius: "10px",
//   width: "50%",
// });

// const Item = styled(Paper)(({ theme, button }) => ({
//   backgroundColor:
//     theme.palette.mode === "dark" ? "#1A2027" : button ? "transparent" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
// }));

const JobDetails = (props) => {
  const authCtx = useContext(AuthContext);
  const { job } = props;

  // work permit?

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
    { variant: "subtitle2", component: "h3", text: job.creator.company },
    {
      variant: "subtitle2",
      component: "h3",
      icon: <LocationOnIcon size="inherit" />,
      text: job.creator.headquarters,
    },
    {
      variant: "subtitle2",
      component: "h3",
      icon: <BusinessIcon size="inherit" />,
      text: job.creator.companySize,
    },
    {
      variant: "subtitle2",
      component: "h3",
      icon: <VerifiedUserIcon size="inherit" />,
      text: job.creator.established,
    },
    {
      variant: "subtitle2",
      component: "h3",
      icon: <EventAvailableIcon size="inherit" />,
      text: "company Website: www.blah.com",
    },
  ];

  let button;
  let outlinedButton;

  if (authCtx.isLoggedIn) {
    button = (
      <Button
        sx={{ marginBottom: 1.5 }}
        onClick={() => console.log("modal")}
        variant="contained"
      >
        Apply Now
      </Button>
    );

    outlinedButton = (
      <Button onClick={() => console.log("POST request")} variant="outlined">
        Apply Now
      </Button>
    );
  } else {
    button = (
      <Button
        sx={{ marginBottom: 1.5 }}
        component={Link}
        to="/auth"
        variant="contained"
      >
        login/join
      </Button>
    );

    outlinedButton = (
      <Button component={Link} to="/auth" variant="outlined">
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
                  sx={{ height: 150, width: 150, border: "1px solid #e5e5e5" }}
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
              <Grid item>
                <Button variant="outlined" sx={{ borderRadius: "17px" }}>
                  Apply Now
                </Button>
              </Grid>
            </Grid>

            <Grid item>
              <Card sx={{ padding: 2 }}>
                <Typography variant="h6" component="h4">
                  A little about {job.creator.company}:
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  {job.creator.about}
                </Typography>
                <Divider />
                <Typography
                  variant="subtitle2"
                  component="div"
                  sx={{ display: "flex", flexDirection: "row" }}
                >
                  <Typography
                    color="text.secondary"
                    variant="subtitle2"
                    component="ul"
                  >
                    presence:
                  </Typography>
                  {job.creator.presence.map((item, i) => (
                    <ListItem key={i}>{item}</ListItem>
                  ))}
                </Typography>
              </Card>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6} sx={{ marginTop: 4 }}>
            <JobDataTable jobSpecifications={jobSpecifications} />
            {button} {outlinedButton}
            <Divider sx={{ margin: "2rem auto" }} />
            {job.description}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default JobDetails;
