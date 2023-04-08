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

const StyledGridContainer = styled(Grid)(({ theme, alert, jobData }) => ({
  display: "flex",
  flexDirection: alert ? "" : jobData ? "column" : "row",
  alignItems: "center",
  justifyContent: alert ? "flex-end" : jobData ? "" : "flex-start",
  margin: alert ? "1rem 0 0 0" : "1rem 0 0.5rem 3rem",
  gap: alert ? "1rem" : "",
  fontSize: jobData ? 17 : "",
  padding: jobData ? 2 : "",
}));

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
              {button}
              <Divider flexItem />
              <StyledGridContainer container>
                <LocationOnIcon />
                <Typography>{job.creator.headquarters}</Typography>
              </StyledGridContainer>
              <StyledGridContainer container>
                <BusinessIcon />
                <Typography>{job.creator.companySize} employees</Typography>
              </StyledGridContainer>
              <StyledGridContainer container>
                <EventAvailableIcon />
                <Typography>Established: {job.creator.established} </Typography>
              </StyledGridContainer>
              <StyledGridContainer container>
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
              </StyledGridContainer>
            </Item>
          </Grid>
          <Grid item xs={6} md={8}>
            <StyledGridContainer
              container
              direction="row"
              wrap="nowrap"
              spacing={1}
              alert
            >
              <Alert
                icon={<VerifiedUserIcon fontSize="inherit" />}
                severity="success"
              >
                This listing was vetted and approved by AjarnJobs.com staff.
              </Alert>
              {outlinedButton}
              <Button>Need Help?</Button>
            </StyledGridContainer>
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
                <StyledGridContainer key={i} item xs={6} jobData>
                  {icon} {text}
                  <Grid
                    sx={{
                      borderTop: "1px solid black",
                      margin: "0.3rem 0 0 0",
                    }}
                  >
                    {data}
                  </Grid>
                </StyledGridContainer>
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
