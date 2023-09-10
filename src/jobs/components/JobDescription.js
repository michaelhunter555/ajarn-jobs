import React from "react";

import { Box, Divider, Paper, Typography } from "@mui/material";

export const JobDescription = (props) => {
  const { job } = props;

  return (
    <Paper
      elevation={0}
      sx={{
        padding: "2rem",
        borderRadius: "17px",
        border: "1px solid #bdbdbd",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <Typography variant="h5" component="h4">
          {job?.title}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" paragraph>
          date posted: {job?.datePosted?.split("T")[0]}
        </Typography>
      </Box>

      <Divider />
      <Typography
        variant="body1"
        dangerouslySetInnerHTML={{ __html: job?.description }}
      />
    </Paper>
  );
};

export default JobDescription;
