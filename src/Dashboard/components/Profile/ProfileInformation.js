import React, { useState } from "react";

import {
  Avatar,
  Box,
  Chip,
  Divider,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import ProfileTabs from "./ProfileTabs";
import { CollapsibleTable } from "./Resume";

const StyledProfileContainer = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  marginBottom: theme.spacing(5),
  [theme.breakpoints.down("sm")]: {
    marginBottom: theme.spacing(1),
  },
}));

const StyledBackgroundBox = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  backgroundColor: "#f4fcff",
}));

const StyledProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(25),
  height: theme.spacing(25),
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

const ProfileInformation = ({ user }) => {
  const [teacherProfileTab, setTeacherProfileTab] = useState("bio");
  const {
    id,
    location,
    image,
    education,
    WorkExperience,
    highestCertification,
    interests,
    name,
    about,
    skill,
    resume,
  } = user;

  console.log("User interest:", interests);

  const handleMenuItemClick = (componentName) => {
    setTeacherProfileTab(componentName);
  };

  const renderComponent = () => {
    switch (teacherProfileTab) {
      case "bio":
        return (
          <Typography paragraph sx={{ margin: "1.5rem" }}>
            {about}
          </Typography>
        );
      case "skills":
        return (
          <Typography
            paragraph
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
              justifyContent: "center",
            }}
          >
            {skill?.split(",")?.map((item, i) => (
              <Chip
                key={i}
                label={item}
                sx={{ color: "white", backgroundColor: "green" }}
              />
            ))}
          </Typography>
        );
      case "resume":
        return <CollapsibleTable teacherResume={resume} />;
      case "education":
        return (
          <Stack alignItems="center">
            <Typography paragraph sx={{ margin: "1.5rem" }}>
              You have a {highestCertification} from{" "}
              {education?.slice(0, 1).toUpperCase() +
                education?.slice(1).split(".")[0]}
              .
            </Typography>
          </Stack>
        );
      default:
        return <Typography paragraph>{about}</Typography>;
    }
  };

  return (
    <>
      <StyledProfileContainer>
        <StyledBackgroundBox>
          <StyledProfileAvatar
            src={`${process.env.REACT_APP_IMAGE}${image}`}
            alt={`${id}-${name}`}
          />
          <Typography variant="h5">{name}</Typography>
          <Typography variant="subtitle1">{location}</Typography>
          {education && (
            <Chip
              sx={{ backgroundColor: "transparent" }}
              avatar={
                <Tooltip
                  title={`Degree from ${education?.split(".")[0]}`}
                  placement="top"
                >
                  <Avatar
                    alt={`${education}--${name}`}
                    src={`https://logo.clearbit.com/${education.toLowerCase()}`}
                  />
                </Tooltip>
              }
            />
          )}
          <Typography variant="body1">{WorkExperience}</Typography>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            {interests?.split(",").map((interest, i) => {
              return <Chip key={i} label={interest} sx={{ margin: 0.5 }} />;
            })}
          </Box>
        </StyledBackgroundBox>

        <Divider flexItem sx={{ marginTop: "1rem" }} />
        <ProfileTabs onTabChange={handleMenuItemClick} />
        {renderComponent()}
      </StyledProfileContainer>
    </>
  );
};

export default ProfileInformation;
