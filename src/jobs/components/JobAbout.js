import React from "react";

import { Box, Chip, Divider, Paper, Typography } from "@mui/material";

export const JobAbout = (props) => {
  const { job } = props;

  return (
    <Paper
      sx={{
        padding: 2,
        borderRadius: "15px",
        border: "1px solid #bdbdbd",
        marginTop: "1rem",
      }}
      elevation={0}
    >
      <Typography variant="h6" component="h4">
        A little about {job?.creator?.company}:
      </Typography>
      <Divider variant="middle" sx={{ margin: "0 0 0.5rem 0" }} />
      <Typography variant="subtitle1" paragraph>
        {job?.creator?.about}
      </Typography>
      <Divider />

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        {job?.creator?.presence?.map((item, i) => (
          <Chip
            key={i}
            clickable
            label={item}
            variant="outlined"
            sx={{ margin: "1rem 8px 8px 0" }}
          />
        ))}
      </Box>
    </Paper>
  );
};
