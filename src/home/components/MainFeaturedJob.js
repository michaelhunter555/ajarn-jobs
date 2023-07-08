import "animate.css";

import React, { useState } from "react";

import { Link } from "react-router-dom";
import sanitizeHtml from "sanitize-html";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
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
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { getTimeDifference } from "../../shared/util/getTimeDifference";
import FeaturedJobDetails from "./FeaturedJobDetails";

const StyledPaper = styled(Paper)({
  position: "relative",
  height: "auto",
  objectFit: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  verticalAlign: "bottom",
});

const StyledBoxContent = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  margin: "1rem 0 0 0",
  padding: "1rem 2rem",
  height: "auto",
  [theme.breakpoints.down("md")]: {
    padding: 0,
  },
  [theme.breakpoints.down("sm")]: {
    padding: 0,
  },
}));

const StyledContentGrid = styled(Box)({
  overflowY: "scroll",
  display: "flex",
  gap: "5px",
  margin: "0rem auto",
  flexDirection: "column",
  maxHeight: 400,
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

const StyledChip = styled(Chip)({
  border: "1px solid #e1e1e1",
  backgroundColor: "#f7f7f7",
});

const MainFeaturedJob = ({ jobs, isLoading }) => {
  const [selectedJob, setSelectedJob] = useState(
    jobs?.length > 0 ? jobs[0] : null
  );

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
                ?.filter((job) => job?.jobType === "featured")
                ?.map((job, i) => (
                  <React.Fragment key={job?._id}>
                    <List>
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
                          primary={
                            <>
                              <Stack
                                direction="row"
                                alignItems="flex-end"
                                spacing={1}
                              >
                                <StyledChip
                                  clickable
                                  icon={
                                    <LocationOnOutlinedIcon
                                      style={{ color: "#47acbb" }}
                                    />
                                  }
                                  sx={{
                                    fontSize: 11,
                                  }}
                                  size="small"
                                  label={job?.location}
                                />
                                <Typography
                                  variant="subtitle2"
                                  component="span"
                                  sx={{ fontSize: 12 }}
                                >
                                  {getTimeDifference(job?.datePosted)}
                                </Typography>
                              </Stack>
                            </>
                          }
                          secondary={
                            <Stack component="span" direction="column">
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
                                component="span"
                                sx={{ fontSize: 12 }}
                              >
                                {sanitizeHtml(job?.description, {
                                  allowedTags: [],
                                  allowedAttributes: {},
                                })?.substring(0, 40) + "..."}
                              </Typography>
                            </Stack>
                          }
                        />
                      </ListItemButton>
                      {i < jobs?.length - 1 && <Divider light />}
                    </List>
                  </React.Fragment>
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
