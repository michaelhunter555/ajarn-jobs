import React, { useState } from "react";

import LocationOnTwoToneIcon from "@mui/icons-material/LocationOnTwoTone";
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

  const handleMenuItemClick = (componentName) => {
    setTeacherProfileTab(componentName);
  };

  const userHasAbout = !!about;
  const userHasSkill = !!skill;
  const userHasResume = resume.length > 0;
  const userHasEducation = !!education;

  const renderComponent = () => {
    switch (teacherProfileTab) {
      case "bio":
        return userHasAbout ? (
          <Typography paragraph sx={{ margin: "1.5rem" }}>
            {about}
          </Typography>
        ) : (
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ margin: "1.5rem" }}
          >
            Please visit settings to update basic info
          </Typography>
        );
      case "skills":
        return (
          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            sx={{ margin: "1rem" }}
          >
            {skill?.split(",")?.map((item, i) => (
              <Chip
                key={i}
                label={item}
                sx={{ color: "white", backgroundColor: "green" }}
              />
            ))}
          </Stack>
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
          <Stack direction="row" alignItems="center">
            <Stack>
              <LocationOnTwoToneIcon style={{ color: "#0f5250de" }} />
            </Stack>
            <Stack>
              <Typography variant="subtitle1">{location}</Typography>
            </Stack>
          </Stack>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {education &&
              education?.split(",").map((uni, i) => (
                <Chip
                  key={i}
                  sx={{ backgroundColor: "transparent" }}
                  avatar={
                    <Tooltip
                      title={`Degree from ${uni?.trim()?.split(".")[0]}`}
                      placement="top"
                    >
                      <Avatar
                        alt={`${uni}--${name}`}
                        src={`https://logo.clearbit.com/${uni
                          ?.trim()
                          .toLowerCase()}`}
                      />
                    </Tooltip>
                  }
                />
              ))}
          </Box>
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
