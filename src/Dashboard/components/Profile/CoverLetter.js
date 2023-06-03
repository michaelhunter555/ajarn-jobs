import React, { useContext, useState } from "react";

import {
  Button,
  Divider,
  Grid,
  Paper,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { AuthContext } from "../../../shared/context/auth-context";
import { useForm } from "../../../shared/hooks/form-hook";
import { useUser } from "../../../shared/hooks/user-hook";

const CoverLetter = () => {
  const auth = useContext(AuthContext);
  const { user } = auth;
  const [isEditing, setIsEditing] = useState(user?.coverLetter === "");
  const { updateUserProfile, isPostLoading } = useUser();
  const [formState, inputHandler] = useForm(
    {
      coverLetter: {
        value: user.coverLetter || "",
        isValid: true,
      },
    },
    true
  );

  const updateCoverLetterHandler = () => {
    const updatedCoverLetter = {
      ...user,
      coverLetter: formState.inputs.coverLetter.value,
    };
    updateUserProfile(user?._id, updatedCoverLetter);
    setIsEditing(false);
  };

  return (
    <>
      {isPostLoading && <Skeleton sx={{ width: 753, height: 382 }} />}
      {!isPostLoading && !isEditing && (
        <>
          <Grid
            component={Paper}
            container
            direction="column"
            sx={{ padding: "1rem" }}
          >
            <Grid item sx={12}>
              <Stack justifyContent="center" alignItems="center">
                <Grid>
                  <Typography variant="body1" component="h2">
                    {auth.user?.name}
                  </Typography>
                </Grid>
              </Stack>
              <Divider sx={{ margin: "1rem" }} />
              <Grid direction="row" spacing={2}>
                <Stack justifyContent="center" direction="row" spacing={2}>
                  <Typography color="text.secondary" variant="subtitle2">
                    {auth.user?.name}
                  </Typography>
                  <Divider orientation="vertical" flexItem />
                  <Typography color="text.secondary" variant="subtitle2">
                    {auth.user?.location}
                  </Typography>
                  <Divider orientation="vertical" flexItem />
                  <Typography color="text.secondary" variant="subtitle2">
                    {auth.user?.email}
                  </Typography>
                </Stack>
                <Grid item sx={{ margin: "1rem auto" }}>
                  <Typography
                    color="text.secondary"
                    variant="h5"
                    component="h2"
                  >
                    Cover Letter:
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {auth.user?.coverLetter}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Stack direction="row">
              <Button onClick={() => setIsEditing(true)}>
                {auth.user?.coverLetter ? "Edit" : "Add cover letter"}
              </Button>
            </Stack>
          </Grid>
        </>
      )}
      {!isPostLoading && isEditing && (
        <Grid
          component={Paper}
          container
          direction="column"
          sx={{ padding: "1rem" }}
        >
          <Grid item sx={12}>
            <Stack justifyContent="center" alignItems="center">
              <Grid>
                <Typography variant="body1" component="h2">
                  {auth.user?.name}
                </Typography>
              </Grid>
            </Stack>
            <Divider sx={{ margin: "1rem" }} />
            <Grid direction="row" spacing={2}>
              <Stack justifyContent="center" direction="row" spacing={2}>
                <Typography color="text.secondary" variant="subtitle2">
                  {auth.user?.name}
                </Typography>
                <Divider orientation="vertical" flexItem />
                <Typography color="text.secondary" variant="subtitle2">
                  {auth.user?.location}
                </Typography>
                <Divider orientation="vertical" flexItem />
                <Typography color="text.secondary" variant="subtitle2">
                  {auth.user?.email}
                </Typography>
              </Stack>
              <Grid item sx={{ margin: "1rem auto" }}>
                <Typography color="text.secondary" variant="h5" component="h2">
                  Cover Letter:
                </Typography>
                <TextField
                  helperText="Write a compelling cover letter for employers to view"
                  multiline={true}
                  fullWidth
                  rows={5}
                  id="coverLetter"
                  defaultValue={formState.inputs.coverLetter.value}
                  onChange={(event) =>
                    inputHandler(
                      "coverLetter",
                      event.target.value,
                      event.target.value !== ""
                    )
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          <Stack direction="row">
            <Button onClick={updateCoverLetterHandler}>
              {auth.user?.coverLetter ? "Update" : "Save"}
            </Button>
            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          </Stack>
        </Grid>
      )}
    </>
  );
};

export default CoverLetter;
