import React, { useState } from "react";

import {
  Avatar,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

const ProfileInformation = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John",
    profilePicture:
      "https://images.unsplash.com/photo-1573166364524-d9dbfd8bbf83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
    bio: "I have 3 years of experience teaching in Thai international schools.",
  });

  const handleEditProfile = (event) => {
    setProfileData({
      name: event.target.value,
      profilePicture: event.target.value,
      bio: event.target.value,
    });

    setIsEditMode(!isEditMode);
  };

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar src={profileData.profilePicture} alt={profileData.name} />
          </Grid>
          <Grid item>
            <Typography variant="h5">
              {isEditMode ? (
                <TextField defaultValue={profileData.name} />
              ) : (
                profileData.name
              )}
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body1">
          {isEditMode ? (
            <TextField defaultValue={profileData.bio} multiline fullWidth />
          ) : (
            profileData.bio
          )}
        </Typography>
        <Button onClick={handleEditProfile}>
          {isEditMode ? "Save" : "Edit"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileInformation;
