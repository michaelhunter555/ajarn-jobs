import React, { useState } from "react";

import { Avatar, Box, Chip, Divider, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { SINGLE_DUMMY_USERS } from "../../../shared/util/DummyUsers";
import ProfileTabs from "./ProfileTabs";

const StyledProfileContainer = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: theme.spacing(5),
}));

const StyledProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(15),
  height: theme.spacing(15),
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

const ProfileInformation = () => {
  const [teacherProfileTab, setTeacherProfileTab] = useState("bio");
  const {
    id,
    location,
    education,
    WorkExperience,
    interests,
    name,
    bio,
    skill,
    resume,
  } = SINGLE_DUMMY_USERS[0];

  const handleMenuItemClick = (componentName) => {
    setTeacherProfileTab(componentName);
  };

  const renderComponent = () => {
    switch (teacherProfileTab) {
      case "bio":
        return <Typography paragraph>{bio}</Typography>;
      case "skills":
        return (
          <Typography paragraph>
            {skill.map((item, i) => (
              <Chip key={i} label={item} />
            ))}
          </Typography>
        );
      case "resume":
        return (
          <table>
            <thead>
              <tr>
                <th>School Name</th>
                <th>Role</th>
                <th>Job Title</th>
                <th>From:</th>
                <th>To:</th>
              </tr>
            </thead>
            <tbody>
              {resume.map((item, i) => (
                <tr key={i}>
                  <td>{item.schoolName}</td>
                  <td>{item.role}</td>
                  <td>{item.jobTitle}</td>
                  <td>{item.from}</td>
                  <td>{item.to}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      default:
        return <Typography paragraph>{bio}</Typography>;
    }
  };

  return (
    <StyledProfileContainer>
      <StyledProfileAvatar
        src="https://via.placeholder.com/150"
        alt={`${id}-${name}`}
      />
      <Typography variant="h5">{name}</Typography>
      <Typography variant="subtitle1">{location}</Typography>
      <Typography variant="subtitle2">{education}</Typography>
      <Typography variant="body1">{WorkExperience}</Typography>
      <Box>
        {interests.map((interest, i) => {
          return <Chip key={i} label={interest} sx={{ margin: 0.5 }} />;
        })}
      </Box>

      <Divider flexItem sx={{ marginTop: "1rem" }} />
      <ProfileTabs onTabChange={handleMenuItemClick} />
      {renderComponent()}
    </StyledProfileContainer>
  );
};

export default ProfileInformation;
