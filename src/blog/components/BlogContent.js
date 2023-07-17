import React, { useEffect, useState } from "react";

import {
  Avatar,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import CategoryChip from "../../shared/components/UIElements/CategoryIconChip";
import { getTimeDifference } from "../../shared/util/getTimeDifference";

const StyledStackContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing(1),
  [theme.breakpoints.down("md")]: {
    display: "flex",
    flexDirection: "column",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
}));

const StyledStackWrapper = styled(Stack)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  [theme.breakpoints.down("md")]: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const BlogContent = ({ content }) => {
  const [wasEdited, setWasEdited] = useState(false);

  useEffect(() => {
    if (content?.editedAt && !isNaN(content?.editedAt)) {
      setWasEdited(true);
    }
  }, [content]);

  const isEmployer = content?.author?.userType === "employer";

  return (
    <>
      <StyledStackContainer>
        <Avatar
          sx={{ width: 100, height: 100, margin: "0 2rem" }}
          alt={`${content?.title}--${content?._id}`}
          src={`${process.env.REACT_APP_IMAGE}${content?.author?.image}`}
        />
        <StyledStackWrapper>
          <Typography
            variant="h4"
            component="span"
            sx={{ textAlign: "center" }}
          >
            {content?.title}
          </Typography>
          <Typography variant="subtitle2" component="span">
            By {content?.author?.name}
          </Typography>
          <Stack>
            <Chip
              sx={{ flexShrink: 1 }}
              variant="outlined"
              size="small"
              component="span"
              label={`posting as ${isEmployer ? "an" : "a"} ${
                content?.author?.userType
              }`}
            />
            {wasEdited && (
              <Typography variant="subtitle2" color="text.secondary">
                Edited: {getTimeDifference(content?.editedAt)} at{" "}
                {content?.editedAt?.split("T")[1].substring(0, 8)}
              </Typography>
            )}
          </Stack>
        </StyledStackWrapper>
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
      </StyledStackContainer>
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
