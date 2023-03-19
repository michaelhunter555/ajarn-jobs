import React from "react";

import {
  FaClipboardList,
  FaClock,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaMoneyBill,
} from "react-icons/fa";

import { Box, Button, CardMedia, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

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
  const { job } = props;

  // work permit?

  //add function for sending job application to employer. maybe email.js?
  // const sendApplicationHandler = (event, userId) => {
  //   event.preventDefault();

  // const sendRequest = async () => {
  //   const responseData = await sendRequest(
  //     "url",
  //     "POST",
  //     JSON.stringify({})
  //     ,
  //     {'Content-Type': 'application/json'}
  //     );
  // };
  // };

  const items = [
    { text: "Location", icon: <FaMapMarkerAlt />, data: job.location },
    { text: "Requirements", icon: <FaGraduationCap />, data: job.requirements },
    { text: "Salary", icon: <FaMoneyBill />, data: job.salary },
    {
      text: "Work Permit",
      icon: <FaClipboardList />,
      data: job.workPermit ? "✅" : "⛔",
    },
    { text: "Workload", icon: <FaClock />, data: job.hours },
  ];

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
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
              <Button variant="contained">Apply Now</Button>
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
              <Button variant="outlined">Apply Now</Button>

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
              {items.map(({ text, icon, data }, i) => (
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
            <Item
              sx={{ textAlingn: "left", width: " 95%", margin: "1rem auto" }}
            >
              <h1>Job Details</h1>
              {job.description}
            </Item>
          </Grid>

          <Grid item xs={6} md={4}>
            <Paper
              sx={{
                display: "flex",
                alignItems: "left",
                flexDirection: "column",
              }}
            >
              <Typography variant="h3" sx={{ margin: "5px 0 0 0" }}>
                About {job.creator.company}
              </Typography>
              <Typography paragraph color="text.secondary">
                Short About School
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={6} md={8} sx={{ display: "flex", alignItems: "left" }}>
            <Item>{job.description}</Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default JobDetails;
//<Button to={`/jobs/${job.id}/update`}> update Job </Button>
