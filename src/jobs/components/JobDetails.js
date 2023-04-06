import React, { useContext } from 'react';

import {
  FaClipboardList,
  FaClock,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaMoneyBill,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

import BusinessIcon from '@mui/icons-material/Business';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import {
  Alert,
  Box,
  Button,
  CardMedia,
  Divider,
  Grid,
  List,
  ListItem,
  Paper,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { AuthContext } from '../../shared/context/auth-context';

//job details layout container
// const StyledJobBoxContainer = styled(Box)(({ theme, jobTitle }) => ({
//   display: "flex",
//   flexDirection: "row",
//   alignItems: "center",
//   justifyContent: "flex-start",
//   backgroundColor: "#fff",
//   borderRadius: "5px",
//   boxShadow: "0 2px 8px rgba(0, 0, 0, 0.26)",
//   padding: "1rem",
//   width: "100%",
//   maxWidth: "80%",
//   margin: "0 auto",
// }));
// //header for job
// const StyledJobHeader = styled(Box)({
//   display: "flex",
//   flexDirection: "column",
//   width: "300px",
// });

//job title || school
const StyledJobTitle = styled("div")({
  fontSize: "2rem",
  fontWeight: "bold",
  textAlign: "center",
});

//image styles of school
const StyledCardMedia = styled(CardMedia)({
  border: "1px solid #e5e5e5",
  margin: "0 0 0.5rem 0",
  borderRadius: "10px",
  width: "50%",
});

//job description
// const StyledDescriptionBox = styled(Box)({
//   border: "1px solid #e5e5e5",
// });

const Item = styled(Paper)(({ theme, button }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "#1A2027" : button ? "transparent" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

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

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} sx={{ width: "calc(90% + 16)" }}>
          <Grid item xs={6} md={4}>
            <Item>
              <StyledJobTitle>{job.creator.company}</StyledJobTitle>
              <Typography color="text.secondary" variant="subtitle1">
                {job.title}
              </Typography>
              <StyledCardMedia
                component="img"
                image={job.creator.logoUrl}
                alt={job.creator.company}
              />
              {!authCtx.isLoggedIn && (
                <Button
                  sx={{ marginBottom: 1.5 }}
                  component={Link}
                  to="/auth"
                  variant="contained"
                >
                  login/join
                </Button>
              )}
              {authCtx.isLoggedIn && (
                <Button
                  sx={{ marginBottom: 1.5 }}
                  onClick={() => console.log("POST request")}
                  variant="contained"
                >
                  Apply Now
                </Button>
              )}
              <Divider flexItem />
              <Grid
                container
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  margin: "1rem 0 0.5rem 3rem",
                }}
              >
                <LocationOnIcon />
                <Typography>{job.creator.headquarters}</Typography>
              </Grid>
              <Grid
                container
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  margin: "0 0 0.5rem 3rem",
                }}
              >
                <BusinessIcon />
                <Typography>{job.creator.companySize} employees</Typography>
              </Grid>
              <Grid
                container
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  margin: "0 0 0.5rem 3rem",
                }}
              >
                <EventAvailableIcon />
                <Typography>Established: {job.creator.established} </Typography>
              </Grid>
              <Grid
                container
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  margin: "0 0 0.5rem 3rem",
                }}
              >
                <List
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    margin: 0,
                  }}
                  color="text.secondary"
                >
                  <b>Works with schools in:</b>{" "}
                  {job.creator.presence.map((item, i) => (
                    <ListItem key={i}>{item}</ListItem>
                  ))}{" "}
                </List>
              </Grid>
            </Item>
          </Grid>
          <Grid item xs={6} md={8}>
            <Grid
              container
              direction="row"
              wrap="nowrap"
              spacing={1}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "1rem",
                margin: "1rem 0 0 0",
              }}
            >
              <Alert
                icon={<VerifiedUserIcon fontSize="inherit" />}
                severity="success"
              >
                This was listing was vetted and approved by AjarnJobs.com staff.
              </Alert>
              {!authCtx.isLoggedIn && (
                <Button component={Link} to="/auth" variant="outlined">
                  login/join
                </Button>
              )}
              {authCtx.isLoggedIn && (
                <Button
                  onClick={() => console.log("POST request")}
                  variant="outlined"
                >
                  Apply Now
                </Button>
              )}

              <Button>Need Help?</Button>
            </Grid>
            <Item
              sx={{
                border: "1px solid #e5e5e5",
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
                marginTop: 5,
              }}
            >
              {jobSpecifications.map(({ text, icon, data }, i) => (
                <Grid
                  key={i}
                  item
                  xs={6}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    fontSize: 17,
                    padding: 2,
                  }}
                >
                  {icon} {text}
                  <Grid
                    sx={{
                      borderTop: "1px solid black",
                      margin: "0.3rem 0 0 0",
                    }}
                  >
                    {data}
                  </Grid>
                </Grid>
              ))}
            </Item>
            <Grid
              item
              sx={{ margin: "1rem auto", height: 300, overflowY: "auto" }}
            >
              <Paper>
                <Typography
                  color="text.secondary"
                  variant="h3"
                  sx={{ margin: "5px 0 0 0" }}
                >
                  About {job.creator.company}
                  <img src={job.creator.logoUrl} alt={job.creator.company} />
                </Typography>
                <Typography sx={{ margin: 1 }} paragraph color="text.secondary">
                  {job.about}
                  {job.description}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Button component={Link} to={`/jobs/${job.id}/update`}>
          {" "}
          update Job{" "}
        </Button>
      </Box>
    </>
  );
};

export default JobDetails;
