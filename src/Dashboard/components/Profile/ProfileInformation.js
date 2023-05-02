import React, { useState } from "react";

import { Avatar, Box, Chip, Divider, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import ProfileTabs from "./ProfileTabs";
import { CollapsibleTable } from "./Resume";

const StyledProfileContainer = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  marginBottom: theme.spacing(5),
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
    interests,
    name,
    about,
    skill,
    resume,
  } = user;

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
            {skill?.map((item, i) => (
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
      default:
        return <Typography paragraph>{about}</Typography>;
    }
  };

  return (
    <StyledProfileContainer>
      <StyledBackgroundBox>
        <StyledProfileAvatar src={image} alt={`${id}-${name}`} />
        <Typography variant="h5">{name}</Typography>
        <Typography variant="subtitle1">{location}</Typography>
        <Typography variant="subtitle2">{education}</Typography>
        <Typography variant="body1">{WorkExperience}</Typography>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          {interests?.map((interest, i) => {
            return <Chip key={i} label={interest} sx={{ margin: 0.5 }} />;
          })}
        </Box>
      </StyledBackgroundBox>

      <Divider flexItem sx={{ marginTop: "1rem" }} />
      <ProfileTabs onTabChange={handleMenuItemClick} />
      {renderComponent()}
    </StyledProfileContainer>
  );
};

export default ProfileInformation;
