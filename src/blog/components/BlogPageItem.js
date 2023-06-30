import React from "react";

import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  OutlinedInput,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

const BlogPageItem = ({ content }) => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="start"
      sx={{ maxWidth: "75%", margin: "0 auto" }}
      spacing={2}
    >
      <Grid item xs={12} sm={6} md={8}>
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: 2,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar
              sx={{ width: 100, height: 100, margin: "0 2rem" }}
              alt="dummy_image"
              src={`${process.env.REACT_APP_IMAGE}${content?.author?.image}`}
            />
            <Typography variant="h3" component="div">
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
            <Typography variant="body1">{content?.postContent}</Typography>
          </CardContent>
          <Grid container direction="row" justify="center" spacing={2}>
            <Grid item>
              <Stack direction="row" alignItems="center" spacing={1}>
                <CommentIcon color="action" sx={{ fontSize: 20 }} />
                <Typography
                  color="text.secondary"
                  variant="subtitle2"
                  sx={{ fontSize: 14, fontWeight: 550 }}
                >
                  {content?.comments?.length} comments
                </Typography>
              </Stack>
            </Grid>
            <Grid item>
              <Stack direction="row" alignItems="center" spacing={1}>
                <ThumbUpIcon color="action" sx={{ fontSize: 20 }} />
                <Typography
                  color="text.secondary"
                  variant="subtitle2"
                  sx={{ fontSize: 14, fontWeight: 550 }}
                >
                  0
                </Typography>
              </Stack>
            </Grid>
            <Grid item>
              <Stack direction="row" alignItems="center" spacing={1}>
                <ThumbDownIcon color="action" sx={{ fontSize: 20 }} />
                <Typography
                  color="text.secondary"
                  variant="subtitle2"
                  sx={{ fontSize: 14, fontWeight: 550 }}
                >
                  0
                </Typography>
              </Stack>
            </Grid>
            <Grid item>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography
                  color="text.secondary"
                  variant="subtitle2"
                  sx={{ fontSize: 14, fontWeight: 550 }}
                >
                  Share
                </Typography>
                <ShareIcon color="action" sx={{ fontSize: 20 }} />
              </Stack>
            </Grid>
          </Grid>
        </Paper>
        <Divider variant="inset" />
        <Paper
          elevation={0}
          sx={{
            padding: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "3px",
          }}
        >
          <OutlinedInput
            sx={{ borderRadius: 1, maxWidth: "80%" }}
            fullWidth
            multiline
            rows={4}
            id="comment"
            type="text"
          />
        </Paper>
      </Grid>
      {/**sidebar below */}
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <Button>Make a Post!</Button>
          <Typography variant="h5" component="h2" color="text.secondary">
            Other Posts
          </Typography>
        </Card>
      </Grid>
    </Grid>
  );
};

export default BlogPageItem;
