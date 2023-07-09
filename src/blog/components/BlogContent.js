import React from "react";

import {
  Avatar,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

const BlogContent = ({ content }) => {
  return (
    <>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Avatar
          sx={{ width: 100, height: 100, margin: "0 2rem" }}
          alt={`${content?.title}--${content?._id}`}
          src={`${process.env.REACT_APP_IMAGE}${content?.author?.image}`}
        />
        <Typography variant="h4" component="div">
          {content?.title}
        </Typography>
        <Divider orientation="vertical" flexItem />
        <Stack
          sx={{
            border: "2px solid #e7e4e4",
            borderRadius: "5px",
            padding: 2,
          }}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="subtitle2" color="text.secondary">
            {content?.postDate?.split("T")[0]}
          </Typography>
          <Chip label={content?.category} size="small" />
        </Stack>
      </Stack>
      <CardContent>
        <Typography
          variant="body1"
          dangerouslySetInnerHTML={{ __html: content?.postContent }}
        />
      </CardContent>
    </>
  );
};

export default BlogContent;
