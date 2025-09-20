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
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2.5),
  background: theme.palette.mode === "dark"
    ? "rgba(255, 255, 255, 0.08)"
    : "rgba(255, 255, 255, 0.15)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: theme.palette.mode === "dark"
    ? "1px solid rgba(255, 255, 255, 0.2)"
    : "1px solid rgba(255, 255, 255, 0.3)",
  boxShadow: theme.palette.mode === "dark"
    ? `
        0 8px 32px rgba(0, 0, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.1),
        inset 0 -1px 0 rgba(255, 255, 255, 0.05),
        inset 0 0 20px 10px rgba(255, 255, 255, 0.02)
      `
    : `
        0 8px 32px rgba(0, 0, 0, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.5),
        inset 0 -1px 0 rgba(255, 255, 255, 0.1),
        inset 0 0 20px 10px rgba(255, 255, 255, 0.1)
      `,
  position: "relative",
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
    marginBottom: theme.spacing(1),
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "1px",
    background: theme.palette.mode === "dark"
      ? "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)"
      : "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "1px",
    height: "100%",
    background: theme.palette.mode === "dark"
      ? "linear-gradient(180deg, rgba(255, 255, 255, 0.3), transparent, rgba(255, 255, 255, 0.1))"
      : "linear-gradient(180deg, rgba(255, 255, 255, 0.8), transparent, rgba(255, 255, 255, 0.3))",
  },
}));

const StyledBackgroundBox = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  padding: theme.spacing(2, 2, 3),
  borderRadius: theme.spacing(2),
  background: "transparent",
}));

const StyledProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(15),
  height: theme.spacing(15),
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
        return userHasSkill ? (
          <Box sx={{ margin: "1.5rem" }}>
            <Typography variant="h6" gutterBottom sx={{ textAlign: "center", mb: 2 }}>
              Skills & Expertise
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              justifyContent="center"
              sx={{ 
                flexWrap: "wrap",
                gap: 1,
                justifyContent: "center"
              }}
            >
              {skill?.split(",")?.map((item, i) => (
                <Chip
                  key={i}
                  label={item.trim()}
                  color="primary"
                  variant="outlined"
                  sx={{ 
                    fontWeight: 500,
                    "&:hover": {
                      backgroundColor: "primary.main",
                      color: "white"
                    }
                  }}
                />
              ))}
            </Stack>
          </Box>
        ) : (
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ margin: "1.5rem", textAlign: "center" }}
          >
            No skills added yet. Visit settings to add your skills.
          </Typography>
        );
      case "resume":
        return <CollapsibleTable teacherResume={resume} />;
      case "education":
        return userHasEducation ? (
          <Box sx={{ margin: "1.5rem" }}>
            <Typography variant="h6" gutterBottom sx={{ textAlign: "center", mb: 2 }}>
              Education & Certifications
            </Typography>
            {highestCertification && (
              <Typography 
                variant="body1" 
                sx={{ textAlign: "center", mb: 3, color: "text.secondary" }}
              >
                Highest Certification: <strong>{highestCertification}</strong>
              </Typography>
            )}
            <Stack
              direction="row"
              spacing={1}
              justifyContent="center"
              sx={{ 
                flexWrap: "wrap",
                gap: 1,
                justifyContent: "center"
              }}
            >
              {education?.split(",")?.map((uni, i) => (
                <Chip
                  key={i}
                  label={uni.trim()}
                  color="secondary"
                  variant="outlined"
                  avatar={
                    <Avatar
                      alt={`${uni} logo`}
                      src={`https://logo.clearbit.com/${uni?.trim().toLowerCase()}`}
                      sx={{ width: 24, height: 24 }}
                    />
                  }
                  sx={{ 
                    fontWeight: 500,
                    "&:hover": {
                      backgroundColor: "secondary.main",
                      color: "white"
                    }
                  }}
                />
              ))}
            </Stack>
          </Box>
        ) : (
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ margin: "1.5rem", textAlign: "center" }}
          >
            No education information added yet. Visit settings to add your education.
          </Typography>
        );
      default:
        return <Typography paragraph>{about}</Typography>;
    }
  };

  return (
    <>
      <StyledProfileContainer>
        <StyledBackgroundBox>
          <StyledProfileAvatar src={`${image}`} alt={`${id}-${name}`} />
          <Typography variant="h5">{name}</Typography>
          <Stack direction="row" alignItems="center">
            <Stack>
              <LocationOnTwoToneIcon style={{ color: "#0f5250de" }} />
            </Stack>
            <Stack>
              <Typography variant="subtitle1">{location}</Typography>
            </Stack>
          </Stack>
          {education && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: 1,
                mb: 2
              }}
            >
              {education.split(",").map((uni, i) => (
                <Tooltip
                  key={i}
                  title={`Degree from ${uni?.trim()?.split(".")[0]}`}
                  placement="top"
                >
                  <Avatar
                    alt={`${uni} logo`}
                    src={`https://logo.clearbit.com/${uni?.trim().toLowerCase()}`}
                    sx={{ 
                      width: 40, 
                      height: 40,
                      border: "2px solid",
                      borderColor: "primary.main",
                      "&:hover": {
                        transform: "scale(1.1)",
                        transition: "transform 0.2s ease-in-out"
                      }
                    }}
                  />
                </Tooltip>
              ))}
            </Box>
          )}
          <Typography variant="body1" sx={{ mb: 2 }}>{WorkExperience}</Typography>
          {interests && (
            <Box sx={{ 
              display: "flex", 
              flexDirection: "row", 
              flexWrap: "wrap",
              gap: 0.5,
              justifyContent: "center",
              maxWidth: "80%"
            }}>
              {interests.split(",").map((interest, i) => {
                return (
                  <Chip 
                    key={i} 
                    label={interest.trim()} 
                    size="small"
                    color="info"
                    variant="outlined"
                    sx={{ 
                      margin: 0.25,
                      fontWeight: 500,
                      "&:hover": {
                        backgroundColor: "info.main",
                        color: "white"
                      }
                    }} 
                  />
                );
              })}
            </Box>
          )}
        </StyledBackgroundBox>

        <Divider flexItem sx={{ marginTop: "1rem" }} />
        <ProfileTabs onTabChange={handleMenuItemClick} />
        {renderComponent()}
      </StyledProfileContainer>
    </>
  );
};

export default ProfileInformation;
