import React, { useState } from "react";

import CheckIcon from "@mui/icons-material/Check";
import LanguageIcon from "@mui/icons-material/Language";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SchoolIcon from "@mui/icons-material/School";
import SendIcon from "@mui/icons-material/Send";
import WorkIcon from "@mui/icons-material/Work";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  FormHelperText,
  Grid,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

// Dummy teacher data
const teacher = {
  _id: "123456",
  name: "Jane Doe",
  image:
    "https://res.cloudinary.com/dtqbxfe7r/image/upload/v1720863824/ei5uwp7ymwmxwehpruql.jpg",
  userType: "Teacher",
  location: "Bangkok",
  nationality: "American",
  highestCertification: "PhD in Education",
  education: "Harvard.edu, MIT.edu",
  workExperience: 5,
  skill: "Communication, Teaching, Public Speaking",
  email: "john.doe@example.com",
};

// Modal handling functions
const useModal = () => {
  const [open, setOpen] = useState(false);
  const openModalHandler = () => setOpen(true);
  const closeModalHandler = () => setOpen(false);
  return { open, openModalHandler, closeModalHandler };
};

const DummyPreviewComponent = () => {
  const { open, openModalHandler, closeModalHandler } = useModal();
  const recruitmentSentAlready = false; // Set to true to test the "Offer Sent" state
  const isPaidUser = true; // Set to true or false to test the button state

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "15px",
        padding: "1rem",
        border: "1px solid #bdbdbd",
      }}
    >
      <Grid container direction="column" spacing={1}>
        {/* Grid item 1 */}
        <Stack direction="row" spacing={2}>
          <Grid item>
            <Avatar
              variant="circular"
              src={teacher.image}
              sx={{ height: 175, width: 175 }}
              alt={`${teacher._id}--${teacher.name}`}
            />
          </Grid>
          {/* Grid item 2 */}
          <Grid item alignItems="center" sx={{ margin: "0 0 0 0.5rem" }}>
            <Typography color="text.secondary" variant="h5" component="h2">
              {teacher.name}
            </Typography>

            <Typography variant="subtitle2" component="div">
              <Chip label={teacher.userType} size="small" />
            </Typography>

            <Stack direction="row" alignItems="center">
              <Box>
                <LocationOnIcon size="inherit" sx={{ color: "#646464" }} />
              </Box>
              <Box>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  component="div"
                >
                  lives in {teacher.location}
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" alignItems="center">
              <Box>
                <LanguageIcon size="inherit" sx={{ color: "#646464" }} />
              </Box>
              <Box>
                <Typography
                  color="text.secondary"
                  variant="subtitle2"
                  component="div"
                >
                  Nationality: {teacher.nationality}
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" alignItems="center">
              <Box>
                <SchoolIcon size="inherit" sx={{ color: "#646464" }} />
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Typography
                  color="text.secondary"
                  variant="subtitle2"
                  component="div"
                >
                  Education: {teacher.highestCertification}
                </Typography>
              </Box>
              <Box>
                {teacher.education &&
                  teacher.education.split(",").map((uni, i) => (
                    <Chip
                      key={i}
                      sx={{ backgroundColor: "transparent" }}
                      avatar={
                        <Tooltip
                          title={`Degree from ${uni.trim().split(".")[0]}`}
                          placement="top"
                        >
                          <Avatar
                            alt={`${uni.trim()}--${teacher.name}`}
                            src={`https://logo.clearbit.com/${uni
                              .trim()
                              .toLowerCase()}`}
                          />
                        </Tooltip>
                      }
                    />
                  ))}
              </Box>
            </Stack>

            <Stack direction="row" alignItems="center">
              <Box>
                <WorkIcon size="inherit" sx={{ color: "#646464" }} />
              </Box>
              <Box>
                <Typography
                  color="text.secondary"
                  variant="subtitle2"
                  component="div"
                >
                  {teacher.workExperience}
                  {teacher.workExperience > 1 ? " years" : " year"} of
                  experience
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Stack>
        <Divider flexItem sx={{ margin: "0.5rem 0" }} />
        <Stack sx={{ marginLeft: "1rem" }}>
          <Typography
            color="text.secondary"
            variant="subtitle2"
            component="div"
          >
            Skills:
          </Typography>
          <Stack spacing={2} direction="row" alignItems="center">
            {teacher.skill.split(",").map((skills, i) => (
              <Chip
                sx={{ margin: "0.3rem 0" }}
                clickable
                key={i}
                label={skills}
              />
            ))}
          </Stack>
        </Stack>
      </Grid>
      <Divider flexItem sx={{ margin: "0.5rem 0" }} />
      <Stack direction="column" sx={{ width: "100%" }} alignItems="center">
        <Button
          disabled={recruitmentSentAlready || !isPaidUser}
          variant="outlined"
          endIcon={
            recruitmentSentAlready ? (
              <CheckIcon color="success" />
            ) : (
              <SendIcon />
            )
          }
          sx={{ borderRadius: "17px" }}
        >
          {recruitmentSentAlready ? "Offer Sent" : `Recruit ${teacher.name}`}
        </Button>
        {recruitmentSentAlready && (
          <FormHelperText>Please wait for the user to reply.</FormHelperText>
        )}
      </Stack>
    </Paper>
  );
};

export default DummyPreviewComponent;
