import React, { useState } from "react";

import PostAddIcon from "@mui/icons-material/PostAdd";
import { Box, Button, Divider, Paper, Typography } from "@mui/material";

import { FadeContentBox } from "../../users/components/TeacherDetailsItem";

export const JobDescription = (props) => {
  const [readMore, setReadMore] = useState(false);
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

      {job?.description?.length > 500 && !readMore ? (
        <FadeContentBox>
          <Typography
            variant="body1"
            dangerouslySetInnerHTML={{ __html: job?.description }}
          />
        </FadeContentBox>
      ) : (
        <Typography
          variant="body1"
          dangerouslySetInnerHTML={{ __html: job?.description }}
        />
      )}
      {job?.description?.length > 500 && (
        <Button
          endIcon={<PostAddIcon />}
          onClick={() => setReadMore((prev) => !prev)}
        >
          {!readMore ? "Read more" : "Read less"}
        </Button>
      )}
    </Paper>
  );
};

export default JobDescription;
