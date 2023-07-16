import React from "react";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Grid, Paper, Stack, Typography } from "@mui/material";

const ProfileProgress = ({ user }) => {
  return (
    <Paper elevation={1} sx={{ borderRadius: "15px", marginTop: "2rem" }}>
      <Grid container spacing={2} direction="column" sx={{ padding: "1rem" }}>
        <Stack justifyContent="center" alignItems="center">
          <Typography sx={{ fontWeight: 550 }}>
            Profile Completion Checklist
          </Typography>
        </Stack>
        <Grid item sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
          <Stack>
            <CheckCircleIcon color={user?.about ? "success" : "action"} />
          </Stack>
          <Stack>
            <Typography>Added an About</Typography>
          </Stack>
        </Grid>
        <Grid item sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
          <Stack>
            <CheckCircleIcon color={user?.skill ? "success" : "action"} />
          </Stack>
          <Stack>
            <Typography>Added skills</Typography>
          </Stack>
        </Grid>
        <Grid item sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
          <Stack>
            <CheckCircleIcon color={user?.education ? "success" : "action"} />
          </Stack>
          <Stack>Added Education</Stack>
        </Grid>
        <Grid item sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
          <Stack>
            <CheckCircleIcon
              color={user?.resume.length > 0 ? "success" : "action"}
            />
          </Stack>
          <Stack>Added a resume</Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProfileProgress;
