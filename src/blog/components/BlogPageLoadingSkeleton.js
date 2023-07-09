import React from "react";

import {
  Box,
  CardContent,
  Divider,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

const BlogPageLoadingSkeleton = () => {
  return (
    <>
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 2,
          borderRadius: "18px",
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Skeleton
            variant="circular"
            width={100}
            height={100}
            sx={{ marginRight: "2rem" }}
          />
          <Skeleton variant="h4" width={200} />
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
              <Skeleton width={50} />
            </Typography>
            <Skeleton width={50} />
          </Stack>
        </Stack>
        <CardContent>
          <Skeleton variant="rectangular" />
        </CardContent>
        <Grid container direction="row" justify="center" spacing={2}>
          <Grid item>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Skeleton width={120} height={40} />
            </Stack>
          </Grid>
          <Grid item>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Skeleton width={120} height={40} />
            </Stack>
          </Grid>
          <Grid item>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Skeleton width={120} height={40} />
            </Stack>
          </Grid>
          <Grid item>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Skeleton width={120} height={40} />
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
          flexDirection: "column",
          gap: "3px",
        }}
      >
        <Skeleton variant="rectangular" height={200} />
      </Paper>
      <Divider flexItem light variant="inset" />
      <Paper
        elevation={0}
        sx={{
          height: 200,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: 4,
          boxSizing: "border-box",
          margin: "0 0 5rem 0",
        }}
      >
        {Array.from({ length: 1 }).map((_, i) => (
          <Box
            key={i}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Skeleton
                  variant="circular"
                  width={70}
                  height={70}
                  sx={{ borderRadius: "50%" }}
                />
              </Stack>
              <Stack alignItems="flex-start">
                <Stack direction="column" alignItems="center">
                  <Typography variant="body1" color="text.primary">
                    <Skeleton width={200} />
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    <Skeleton width={250} />
                  </Typography>
                </Stack>
                <Skeleton width={250} />
              </Stack>
            </Stack>
          </Box>
        ))}
      </Paper>
    </>
  );
};

export default BlogPageLoadingSkeleton;
