import "animate.css";

import React, { useState } from "react";

import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import sanitizeHtml from "sanitize-html";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ViewListIcon from "@mui/icons-material/ViewList";
import {
  Alert,
  Avatar,
  Box,
  Button,
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
  useMediaQuery,
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
  alignItems: "center",
  flexDirection: "column",
  margin: "1rem 0 0 0",
  padding: "1rem 1rem",
  height: "auto",
  [theme.breakpoints.down("md")]: {
    padding: 0,
  },
  [theme.breakpoints.down("sm")]: {
    padding: 0,
  },
}));

const StyledContentGrid = styled(Box)(({ theme }) => ({
  overflowY: "scroll",
  display: "flex",
  gap: "5px",
  margin: "0rem auto",
  flexDirection: "column",
  borderRight: "1px solid #dedede",

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
}));

const StyledChip = styled(Chip)({
  border: "1px solid #e1e1e1",
  backgroundColor: "#f7f7f7",
});

const MainFeaturedJob = ({ jobs, featured, height, fontSize }) => {
  const [selectedJob, setSelectedJob] = useState(
    jobs?.length > 0 ? jobs[0] : null
  );
  const isMobile = useMediaQuery("(max-width:600px)");

  const selectJobHandler = (job) => {
    setSelectedJob(job);
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
            <Alert severity="info">
              {featured ? "Featured jobs |" : "All Jobs"}

              {featured && (
                <Button
                  startIcon={<ViewListIcon />}
                  size="small"
                  component={Link}
                  to="/modern-view/jobs"
                  sx={{ fontSize: 10 }}
                >
                  All Jobs
                </Button>
              )}
            </Alert>
            <StyledContentGrid xs={12} md={4.5} sx={{ maxHeight: height }}>
              {featured &&
                jobs
                  ?.filter((job) => job?.jobType === "featured")
                  ?.map((job, i) => (
                    <React.Fragment key={job?._id}>
                      <List>
                        {isMobile && (
                          <ScrollLink to="jobsTop" duration={500} smooth={true}>
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
                                      sx={{ fontSize: 12, fontWeight: 600 }}
                                    >
                                      {job?.title}
                                    </Typography>
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
                          </ScrollLink>
                        )}
                        {!isMobile && (
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
                                    sx={{ fontSize: 12, fontWeight: 600 }}
                                  >
                                    {job?.title}
                                  </Typography>
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
                        )}
                        {i < jobs?.length - 1 && <Divider light />}
                      </List>
                    </React.Fragment>
                  ))}

              {/**TEMP SPLIT - DO NOT REMOVE */}

              {!featured &&
                jobs?.map((job, i) => (
                  <React.Fragment key={job?._id}>
                    <List>
                      {!isMobile && (
                        <ListItemButton
                          sx={{
                            paddingTop: 0,
                            paddingBottom: 0,
                            backgroundColor:
                              job?.jobType === "featured" &&
                              "rgba(198, 226, 234, 0.15)",
                          }}
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
                                      fontSize: 14,
                                    }}
                                    size="small"
                                    label={job?.location}
                                  />
                                  <Typography
                                    variant="subtitle2"
                                    component="span"
                                    sx={{ fontSize: 14 }}
                                  >
                                    {getTimeDifference(job?.datePosted)}
                                  </Typography>
                                  {job?.jobType === "featured" && (
                                    <Typography
                                      sx={{
                                        backgroundColor: "#edfdff",
                                        border: "1px solid #a2d5dd",
                                        borderRadius: "6px",
                                        fontSize: 11,
                                        padding: "0 0.5rem",
                                      }}
                                    >
                                      Featured
                                    </Typography>
                                  )}
                                </Stack>
                              </>
                            }
                            secondary={
                              <Stack component="span" direction="column">
                                <Typography
                                  variant="body2"
                                  component="span"
                                  color="text.primary"
                                  sx={{ fontSize: 14, fontWeight: 600 }}
                                >
                                  {job?.title}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  component="span"
                                  color="text.primary"
                                  sx={{ fontSize: 14 }}
                                >
                                  {job?.hours}
                                  {" — " + job?.salary}
                                </Typography>

                                <Typography
                                  variant="subtitle2"
                                  color="text.secondary"
                                  component="span"
                                  sx={{ fontSize: 14 }}
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
                      )}
                      {isMobile && (
                        <ScrollLink to="dynaJobs">
                          <ListItemButton
                            sx={{
                              paddingTop: 0,
                              paddingBottom: 0,
                              backgroundColor:
                                job?.jobType === "featured" &&
                                "rgba(198, 226, 234, 0.15)",
                            }}
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
                                        fontSize: 14,
                                      }}
                                      size="small"
                                      label={job?.location}
                                    />
                                    <Typography
                                      variant="subtitle2"
                                      component="span"
                                      sx={{ fontSize: 14 }}
                                    >
                                      {getTimeDifference(job?.datePosted)}
                                    </Typography>
                                    {job?.jobType === "featured" && (
                                      <Typography
                                        sx={{
                                          backgroundColor: "#edfdff",
                                          border: "1px solid #a2d5dd",
                                          borderRadius: "6px",
                                          fontSize: 11,
                                          padding: "0 0.5rem",
                                        }}
                                      >
                                        Featured
                                      </Typography>
                                    )}
                                  </Stack>
                                </>
                              }
                              secondary={
                                <Stack component="span" direction="column">
                                  <Typography
                                    variant="body2"
                                    component="span"
                                    color="text.primary"
                                    sx={{ fontSize: 14, fontWeight: 600 }}
                                  >
                                    {job?.title}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    component="span"
                                    color="text.primary"
                                    sx={{ fontSize: 14 }}
                                  >
                                    {job?.hours}
                                    {" — " + job?.salary}
                                  </Typography>

                                  <Typography
                                    variant="subtitle2"
                                    color="text.secondary"
                                    component="span"
                                    sx={{ fontSize: 14 }}
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
                        </ScrollLink>
                      )}
                      {i < jobs?.length - 1 && <Divider light />}
                    </List>
                  </React.Fragment>
                ))}
              <Stack
                justifyContent="center"
                alignItems="center"
                sx={{ backgroundColor: "#f9f9f9" }}
              >
                <Button
                  sx={{ display: "flex", alignItems: "center" }}
                  component={Link}
                  to="/jobs/"
                >
                  Back to classic
                </Button>
              </Stack>
            </StyledContentGrid>
          </Grid>
          <Grid item xs={12} md={7.5} order={{ xs: 1, md: 2 }}>
            <StyledBoxContent>
              {selectedJob && (
                <FeaturedJobDetails
                  fontSize={fontSize}
                  featured={featured}
                  job={selectedJob}
                  height={height}
                />
              )}
            </StyledBoxContent>
          </Grid>
        </Grid>
      </StyledPaper>
    </>
  );
};

export default MainFeaturedJob;
