import React from "react";

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
  const { id, location, education, WorkExperience, interests, name, bio } =
    SINGLE_DUMMY_USERS[0];

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
      <ProfileTabs />
      <Typography paragraph>{bio}</Typography>
    </StyledProfileContainer>
  );
};

export default ProfileInformation;
