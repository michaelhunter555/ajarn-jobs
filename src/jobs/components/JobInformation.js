import React from "react";

import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import {
  Avatar,
  Box,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { OutlinedButton } from "./OutlinedButton";

const StyledGridContainer = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    justifyContent: "center",
  },
  [theme.breakpoints.down("sm")]: {
    justifyContent: "center",
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  height: 175,
  width: 175,
  border: "1px solid #e5e5e5",
  [theme.breakpoints.down("md")]: {
    height: 100,
    width: 100,
  },
  [theme.breakpoints.down("sm")]: {
    height: 100,
    width: 100,
  },
}));

export const JobInformation = (props) => {
  const {
    applyJobModalHandler,
    open,
    job,
    closeJob,
    applyToJobHandler,
    closeSuccess,
    onSuccess,
    appliedAlready,
    cantApply,
    isLoading,
    isPostLoading,
  } = props;

  const jobInformation = job && [
    { variant: "h5", component: "h2", text: job?.title },
    {
      variant: "subtitle1",
      component: "h3",
      text: <Chip color="primary" size="small" label={job?.creator?.company} />,
    },
    {
      variant: "subtitle1",
      component: "h3",
      icon: <LocationOnIcon size="inherit" />,
      text: job?.creator?.headquarters,
    },
    {
      variant: "subtitle1",
      component: "h3",
      icon: <BusinessIcon size="inherit" />,
      text: job?.creator?.companySize + " employees",
    },
    {
      variant: "subtitle1",
      component: "h3",
      icon: <VerifiedUserIcon size="inherit" />,
      text: "Established in " + job?.creator?.established,
    },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        padding: 1,
        borderRadius: "15px",
        border: "1px solid #bdbdbd",
      }}
    >
      <StyledGridContainer
        container
        direction="row"
        spacing={1}
        sx={{ marginTop: 0 }}
      >
        {/**grid item 1 */}
        <Grid item>
          <StyledAvatar
            variant="circular"
            src={`${process.env.REACT_APP_IMAGE}${job?.image}`}
            alt={`${job?.id}--${job?.creator?.company}`}
            sx={{ border: "1px solid #bdbdbd" }}
          />
        </Grid>
        {/**grid item 2 */}

        {!isLoading && !isPostLoading && (
          <Grid item sx={{ margin: "0 0 0 0.5rem" }}>
            {jobInformation?.map(({ variant, component, icon, text }, i) => (
              <Stack key={i} direction="row" alignItems="start">
                <Box>
                  <Typography
                    color="text.secondary"
                    variant={variant}
                    component={component}
                  >
                    {icon && <>{icon}</>}
                  </Typography>
                </Box>

                <Box>
                  <Typography color="text.secondary" variant={variant}>
                    {text}
                  </Typography>
                </Box>
              </Stack>
            ))}
            <Divider flexItem sx={{ margin: "0.5rem 0" }} />
          </Grid>
        )}

        {!isLoading && !isPostLoading && (
          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <OutlinedButton
              applyJobModalHandler={applyJobModalHandler}
              open={open}
              job={job}
              closeJob={closeJob}
              applyToJobHandler={applyToJobHandler}
              closeSuccess={closeSuccess}
              onSuccess={onSuccess}
              appliedAlready={appliedAlready}
              cantApply={cantApply}
            />
          </Grid>
        )}
      </StyledGridContainer>
    </Paper>
  );
};
