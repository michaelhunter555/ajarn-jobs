import React from "react";

import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { Button, Divider, Paper, Stack, Typography } from "@mui/material";

const FeedbackBox = () => {
  return (
    <Paper sx={{ padding: 2, maxWidth: "50%", margin: "0 auto" }}>
      <Stack>
        <Stack>
          <Typography varint="h6" color="text.secondary">
            Was this information helpful?
          </Typography>
        </Stack>
        <Divider />
        <Stack direction="row" alignItems="center" justifyContent="center">
          <Button startIcon={<ThumbDownIcon />} color="error">
            NO
          </Button>
          <Button endIcon={<ThumbUpAltIcon />} color="success">
            Yes
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default FeedbackBox;
