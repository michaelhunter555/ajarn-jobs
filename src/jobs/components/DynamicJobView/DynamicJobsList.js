import React, { useState } from "react";

import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import sanitizeHtml from "sanitize-html";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import StarIcon from "@mui/icons-material/Star";
import {
  Avatar,
  Divider,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { DynamicLoadingSkeleton } from "../../../shared/components/UIElements/LoadingSkeletons";
import { useThemeToggle } from "../../../shared/context/theme-context";
import { getTimeDifference } from "../../../shared/util/getTimeDifference";
import { StyledChip } from "./DynamicStyles";

const DynamicJobsList = ({ jobs, onSelectedJob, isLoading }) => {
  const { isDarkMode } = useThemeToggle();
  const [selectedJobIndex, setSelectedJobIndex] = useState(0);
  const isMobile = useMediaQuery("(max-width:600px)");

  const selectJobHandler = (job, index) => {
    onSelectedJob(job);
    setSelectedJobIndex(index);
  };

  return (
    <>
      {jobs?.length > 0 ? (
        jobs?.map((job, i) => (
          <React.Fragment key={job?._id}>
            <List>
              {!isMobile && (
                <ListItemButton
                  sx={{
                    paddingTop: 0,
                    paddingBottom: 0,

                    backgroundColor:
                      isDarkMode && job?.jobType === "featured"
                        ? "#303f42"
                        : !isDarkMode && job?.jobType === "featured"
                        ? "#f5f2e4"
                        : "",
                    ...(isDarkMode && job?.jobType === "featured"
                      ? { boxShadow: "0 0 20px rgba(112, 180, 247, 0.5)" }
                      : {}),
                    ...(!isDarkMode && job?.jobType === "featured"
                      ? { boxShadow: "0 0 20px rgb(255 245 202)" }
                      : {}),
                  }}
                  component={Link}
                  key={job?._id}
                  onClick={() => selectJobHandler(job, i)}
                  selected={i === selectedJobIndex}
                >
                  <ListItemAvatar>
                    <DynamicLoadingSkeleton isLoading={isLoading}>
                      <Avatar
                        src={`${job?.image}`}
                        alt={`${job?.name}-${job?.title}`}
                      />
                    </DynamicLoadingSkeleton>
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
                                border: "1px solid #a2d5dd",
                                borderRadius: "6px",
                                fontSize: 11,
                                padding: "0 0.5rem",
                              }}
                            >
                              Featured{" "}
                              <StarIcon
                                sx={{
                                  fontSize: 11,
                                  color: isDarkMode ? "yellow" : "#3a97a7",
                                }}
                              />
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
                    selected={i === selectedJobIndex}
                    sx={{
                      paddingTop: 0,
                      paddingBottom: 0,
                      backgroundColor:
                        job?.jobType === "featured" &&
                        "rgba(198, 226, 234, 0.15)",
                    }}
                    component={Link}
                    key={job?._id}
                    onClick={() => selectJobHandler(job, i)}
                  >
                    <ListItemAvatar>
                      <Avatar
                        src={`${job?.image}`}
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
        ))
      ) : (
        <Stack direction="row" justifyContent="center">
          <Typography
            color="text.seconary"
            sx={{ opacity: "0.2" }}
            variant="h5"
          >
            No jobs found for your query.
          </Typography>
        </Stack>
      )}
    </>
  );
};

export default DynamicJobsList;
