import React from "react";

import {
  Avatar,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import CategoryChip from "../../shared/components/UIElements/CategoryIconChip";

const BlogContent = ({ content }) => {
  const isEmployer = content?.author?.userType === "employer";

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Avatar
          sx={{ width: 100, height: 100, margin: "0 2rem" }}
          alt={`${content?.title}--${content?._id}`}
          src={`${process.env.REACT_APP_IMAGE}${content?.author?.image}`}
        />
        <Stack
          direction="column"
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <Typography variant="h4" component="div">
            {content?.title}
          </Typography>
          <Typography variant="subtitle2" component="span">
            By {content?.author?.name}
          </Typography>
          <Chip
            sx={{ flexShrink: 1 }}
            variant="outlined"
            size="small"
            component="span"
            label={`posting as ${isEmployer ? "an" : "a"} ${
              content?.author?.userType
            }`}
          />
        </Stack>
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
          <CategoryChip category={content?.category} />
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
