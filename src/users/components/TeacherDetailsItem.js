import React, { useState } from "react";

import LanguageIcon from "@mui/icons-material/Language";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Modal,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { CollapsibleTable } from "../../Dashboard/components/Profile/Resume";
import MessageTeacher from "./MessageTeacher";

const StyledBoxModal = styled(Paper)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  height: 400,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  borderRadius: "15px",
  boxShadow: 24,
  p: 4,
});

const TeacherDetailsItem = ({ teacher, isLoading }) => {
  const [open, setOpen] = useState(false);
  const openModalHandler = () => setOpen(true);
  const closeModalHandler = () => setOpen(false);

  return (
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
          {isLoading && (
            <Skeleton
              variant="rectangular"
              sx={{
                borderRadius: "15px",
                marginTop: 4,
                height: 260,
                width: 692,
              }}
            />
          )}
          {!isLoading && (
            <Grid container direction="row" spacing={1} sx={{ marginTop: 4 }}>
              {/**grid item 1 */}
              <Grid item>
                <Avatar
                  variant="circular"
                  src={`${process.env.REACT_APP_IMAGE}${teacher?.image}`}
                  sx={{ height: 175, width: 175 }}
                  alt={`${teacher?._id}--${teacher?.name}`}
                />
              </Grid>
              {/**grid item 2 */}
              <Grid item alignItems="center" sx={{ margin: "0 0 0 0.5rem" }}>
                <Typography color="text.secondary" variant="h5" component="h2">
                  {teacher?.name}
                </Typography>
                <Typography variant="subtitle2" component="div">
                  <Chip label={teacher?.userType} size="small" />
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  component="div"
                >
                  <LocationOnIcon size="inherit" /> lives in {teacher?.location}
                </Typography>
                <Typography
                  color="text.secondary"
                  variant="subtitle2"
                  component="div"
                >
                  <LanguageIcon size="inherit" />
                  Nationality: {teacher?.nationality}
                </Typography>
                <Typography
                  color="text.secondary"
                  variant="subtitle2"
                  component="div"
                >
                  <SchoolIcon size="inherit" />
                  Education: {teacher?.highestCertification}
                </Typography>

                <Typography
                  color="text.secondary"
                  variant="subtitle2"
                  component="div"
                >
                  <WorkIcon size="inherit" /> Teaching for{" "}
                  {teacher?.workExperience}-
                  {teacher?.workExperience > 1 ? "years" : "year"}
                </Typography>
                <Divider flexItem sx={{ margin: "0.5rem 0" }} />
                <Typography variant="subtitle2" component="div">
                  <Typography
                    color="text.secondary"
                    variant="subtitle2"
                    component="div"
                  >
                    Skills:
                  </Typography>
                  <Stack spacing={1} direction="row">
                    {teacher?.skill?.split(",").map((skills, i) => (
                      <Chip clickable key={i} label={skills} />
                    ))}
                  </Stack>
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  onClick={openModalHandler}
                  variant="outlined"
                  sx={{ borderRadius: "17px" }}
                >
                  Message
                </Button>
                <Modal open={open} onClose={closeModalHandler}>
                  <StyledBoxModal>
                    <MessageTeacher
                      closeModal={closeModalHandler}
                      userName={teacher?.name}
                      userEmail={teacher?.email}
                    />
                  </StyledBoxModal>
                </Modal>
              </Grid>
            </Grid>
          )}

          {isLoading && (
            <Skeleton
              variant="rectangular"
              sx={{
                borderRadius: "15px",
                marginTop: 2,
                height: 177,
                width: 692,
              }}
            />
          )}
          {!isLoading && (
            <Grid item>
              <Paper sx={{ padding: 2, borderRadius: "15px" }} elevation={0}>
                <Typography variant="h6" component="h4">
                  A little about {teacher?.name}:
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  {teacher?.about}
                </Typography>
                <Divider
                  flexItem
                  variant="left"
                  sx={{ margin: "0 0 0.5rem 0" }}
                />
                <Typography variant="subtitle2" component="h3">
                  {teacher?.interests?.split(",").map((interest, i) => (
                    <Chip
                      clickable
                      key={i}
                      label={interest}
                      variant="outlined"
                    />
                  ))}
                </Typography>
              </Paper>
            </Grid>
          )}
        </Grid>

        <Grid item xs={12} sm={6} md={6} sx={{ marginTop: 4 }}>
          {/*cover letter */}
          {isLoading && (
            <Skeleton
              variant="rectangular"
              sx={{
                borderRadius: "15px",
                marginTop: 2,
                height: 177,
                width: 692,
              }}
            />
          )}
          {!isLoading && (
            <Paper
              elevation={0}
              sx={{
                padding: "2rem",
                borderRadius: "17px",
                margin: "1rem auto",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <Typography variant="h5" component="h4">
                  {teacher?.name} - CoverLetter
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {teacher?.name} | {teacher?.email}
                </Typography>
              </Box>

              <Divider />
              <Typography color="text.secondary" variant="subtitle2" paragraph>
                {teacher?.coverLetter}
              </Typography>
            </Paper>
          )}
          {isLoading && (
            <Skeleton
              variant="rectangular"
              sx={{
                borderRadius: "15px",
                marginTop: 2,
                height: 177,
                width: 692,
              }}
            />
          )}
          {!isLoading && <CollapsibleTable teacherResume={teacher?.resume} />}
        </Grid>
      </Grid>
    </Box>
  );
};

export default TeacherDetailsItem;
