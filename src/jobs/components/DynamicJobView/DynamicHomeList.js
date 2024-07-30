import React, { useState } from "react";

import { Link as ScrollLink } from "react-scroll";
import sanitizeHtml from "sanitize-html";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
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

import { useThemeToggle } from "../../../shared/context/theme-context";
import { getTimeDifference } from "../../../shared/util/getTimeDifference";
import { StyledChip } from "./DynamicStyles";

const DynamicJobsList = ({ jobs, onSelectedJob }) => {
  const { isDarkMode } = useThemeToggle();
  const [selectedJobIndex, setSelectedJobIndex] = useState(0);
  const isMobile = useMediaQuery("(max-width:600px)");

  const selectJobHandler = (job, index) => {
    onSelectedJob(job);
    setSelectedJobIndex(index);
  };
  return (
    <>
      {jobs
        ?.filter((job) => job?.jobType === "featured")
        ?.map((job, i) => (
          <React.Fragment key={job?._id}>
            {/*Home Page featured jobs only */}
            <List>
              {isMobile && (
                <ScrollLink to="jobsTop" duration={500} smooth={true}>
                  <ListItemButton
                    sx={{ paddingTop: 0, paddingBottom: 0 }}
                    key={job?._id}
                    onClick={() => selectJobHandler(job, i)}
                    selected={i === selectedJobIndex}
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
                            <Typography
                              component="span"
                              sx={{
                                color: isDarkMode
                                  ? "#95e6ff"
                                  : (theme) => theme.palette.primary.main,
                                fontSize: 12,
                                textDecoration: "underline",
                              }}
                            >
                              read more
                            </Typography>
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
                  key={job?._id}
                  onClick={() => selectJobHandler(job, i)}
                  selected={i === selectedJobIndex}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={`${job?.image}`}
                      alt={`${job?.name}-${job?.title}`}
                      sx={{ height: 50, width: 50 }}
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
                          sx={{ fontSize: 14, fontWeight: 600 }}
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
                          })?.substring(0, 100) + "..."}
                          <Typography
                            component="span"
                            sx={{
                              color: isDarkMode
                                ? "#95e6ff"
                                : (theme) => theme.palette.primary.main,
                              fontSize: 12,
                              textDecoration: "underline",
                            }}
                          >
                            read more
                          </Typography>
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
    </>
  );
};

export default DynamicJobsList;
