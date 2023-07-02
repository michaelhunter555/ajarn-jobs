import 'animate.css';

import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import {
  Alert,
  Avatar,
  Box,
  Chip,
  Divider,
  Grid,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import FeaturedJobDetails from './FeaturedJobDetails';

const StyledPaper = styled(Paper)({
  position: "relative",
  height: "auto",
  objectFit: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  verticalAlign: "bottom",
});

const StyledBoxContent = styled(Box)({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  margin: "1rem 0 0 0",
  padding: "1rem 2rem",
  height: "auto",
  borderLeft: "1px solid #e3e3e3",
});

export const StyledGlassPaper = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  position: "relative",
  border: "1px solid rgba(216, 216, 216, 0.5)",

  fontSize: "16px",
  fontWeight: "bold",
  padding: "0 20px 0 0",
  borderRadius: "6px",
  overflow: "hidden",

  background:
    "linear-gradient(135deg, hsla(360, 100%, 100%, 0.9), hsla(360, 100%, 100%, 0.9) 9.37%, hsla(360, 100%, 100%, 0.9) 54.69%, hsla(360, 100%, 100%, 0.9) 66.15%, hsla(360, 1000%, 100%, 0.9))",
  "&::after": {
    content: '""',
    position: "absolute",
    top: "0",
    left: "-200%",
    width: "200%",
    height: "100%",
    transform: "skewX(-20deg)",
    backgroundImage:
      "linear-gradient(90deg, transparent, rgba(98, 250, 255, 0.219), transparent)",
  },
  "&:hover::after": {
    animation: "shine 1s infinite alternate",
    animationTimingFunction: "cubic-bezier(0, 0.6, 0.5, 0.4)",
  },
  "@keyframes shine": {
    "0%": {
      left: "-200%",
    },
    "60%": {
      left: "100%",
    },
    "100%": {
      left: "100%",
    },
  },
  [theme.breakpoints.down("md")]: {
    margin: "0.5rem 0.5rem 0",
  },
  [theme.breakpoints.down("sm")]: {
    margin: "0.5rem 1rem 0",
  },
}));

const StyledContentGrid = styled(Box)({
  overflowY: "scroll",
  display: "flex",
  gap: "5px",
  margin: "0rem auto",
  flexDirection: "column",
  maxHeight: 360,
  pointerEvents: "auto",
  "&::-webkit-scrollbar": {
    width: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "transparent",
    borderRadius: "0px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#8b8b8d",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
    borderRadius: "0px",
  },
  "&:hover": {
    "&::-webkit-scrollbar-thumb": {
      background: "#b5b5b5",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      transition: "background 1s ease-in",
      background: "#8b8b8d",
    },
    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },
  },
});

// const StyledCardContent = styled(CardContent)(({ theme }) => ({
//   flex: "1 0 auto",
//   background: theme.palette.background.glass,
// }));

// const StyledDivider = styled(Divider)(({ theme }) => ({
//   color: "black",
//   position: "relative",
//   [theme.breakpoints.down("sm")]: {
//     display: "none",
//   },
// }));

const MainFeaturedJob = ({ jobs, isLoading }) => {
  const [selectedJob, setSelectedJob] = useState(jobs.length > 0 ?  jobs[0] : null);

  const selectJobHandler = (job) => {
    setSelectedJob(job);
    console.log("SELECTED JOB", job);
  };

  return (
    <>
      {/*featured post */}

      <StyledPaper
        sx={{
          borderRadius: "5px",
        }}
      >
        <Grid container>
          <Grid item xs={12} md={4.5} order={{ xs: 2, md: 1 }}>
            <Alert severity="info">Featured jobs</Alert>
            <StyledContentGrid item xs={12} md={4.5}>
              {jobs
                ?.filter((job) => job.jobType === "featured")
                ?.map((job, i) => (
                  <List key={job?._id}>
                    <ListItemButton
                      sx={{ paddingTop: 0, paddingBottom: 0 }}
                      component={Link}
                      key={job?._id}
                      onClick={() => selectJobHandler(job)}
                    >
                      <ListItemAvatar>
                        <Avatar
                          src={`${process.env.REACT_APP_IMAGE}${job?.image}`}
                          alt={`${job?.name}-${job?.title}`}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        component="div"
                        primary={
                          <>
                            <Stack
                              direction="row"
                              alignItems="flex-end"
                              spacing={1}
                            >
                              <Chip
                                sx={{ fontSize: 11 }}
                                size="small"
                                label={job?.location}
                              />
                              <Typography
                                variant="subtitle2"
                                sx={{ fontSize: 12 }}
                              >
                                {job?.datePosted?.split("T")[0]}
                              </Typography>
                            </Stack>
                          </>
                        }
                        secondary={
                          <>
                            <Typography
                              variant="body2"
                              component="span"
                              color="text.primary"
                              sx={{ fontSize: 12 }}
                            >
                              {job?.hours}
                              {" — " + job?.salary}
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              color="text.secondary"
                              sx={{ fontSize: 12 }}
                            >
                              {job?.description?.substring(0, 40) + "..."}
                            </Typography>
                          </>
                        }
                      />
                    </ListItemButton>
                    {i - jobs?.length - 1 && <Divider light />}
                  </List>
                ))}
              <Stack justifyContent="center" alignItems="center">
                <ListItemButton
                  sx={{ display: "flex", alignItems: "center" }}
                  component={Link}
                  to="/jobs/"
                >
                  View all jobs
                </ListItemButton>
              </Stack>
            </StyledContentGrid>
          </Grid>
          <Grid item xs={12} md={7.5} order={{ xs: 1, md: 2 }}>
            <StyledBoxContent>
              {selectedJob && <FeaturedJobDetails job={selectedJob} />}
            </StyledBoxContent>
          </Grid>
        </Grid>
      </StyledPaper>
    </>
  );
};

export default MainFeaturedJob;
