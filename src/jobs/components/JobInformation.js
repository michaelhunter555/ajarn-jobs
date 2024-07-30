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
  Tooltip,
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
    height: 150,
    width: 150,
  },
  [theme.breakpoints.down("sm")]: {
    height: 170,
    width: 170,
  },
}));

const createJobInfo = (job) => {
  return job
    ? [
        { variant: "h5", component: "h2", text: job?.title },
        {
          variant: "subtitle1",
          component: "h3",

          text: (
            <Chip
              color="primary"
              sx={{ fontSize: 15 }}
              label={job?.creator?.company}
            />
          ),
        },
        {
          variant: "subtitle1",
          component: "h3",
          note: `${job?.creator?.company} is located in ${job?.creator?.headquarters}, Thailand`,
          icon: <LocationOnIcon color="primary" />,
          text: job?.creator?.headquarters + ", Thailand",
        },
        {
          variant: "subtitle1",
          component: "h3",
          note: `${job?.creator?.company} current company size.`,
          icon: <BusinessIcon color="primary" />,
          text: job?.creator?.companySize + " employees",
        },
        {
          variant: "subtitle1",
          component: "h3",
          note: `${job?.creator?.company} launched in ${job?.creator?.established}`,
          icon: <VerifiedUserIcon color="primary" />,
          text: "Established in " + job?.creator?.established,
        },
      ]
    : [];
};

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

  const jobInformation = createJobInfo(job);

  return (
    <Paper
      elevation={0}
      sx={{
        padding: { xs: 1, md: "5px 25px" },
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
          <Stack>
            <Typography
              variant="subtitle1"
              fontWeight={700}
              align="center"
              component="h5"
              color="text.secondary"
              sx={{ fontSize: 20 }}
            >
              {jobInformation[0]?.text}
            </Typography>
            <Stack
              sx={{
                flexDirection: { xs: "column", md: "column", lg: "row" },
                gap: 2,
                flexWrap: "wrap",
              }}
              alignItems="center"
            >
              <StyledAvatar
                variant="circular"
                src={`${job?.image}`}
                alt={`${job?.id}--${job?.creator?.company}`}
                sx={{ border: "1px solid #bdbdbd" }}
              />
              <Stack spacing={1} alignItems="start">
                {jobInformation
                  ?.slice(1)
                  ?.map(({ variant, component, icon, text, note }, i) => (
                    <Stack key={i} direction="row" alignItems="start">
                      <Box>
                        <Tooltip title={note ? note : ""}>
                          <Typography
                            color="text.secondary"
                            variant={variant}
                            component={component}
                            sx={{ cursor: "pointer" }}
                          >
                            {icon && <>{icon}</>}
                          </Typography>
                        </Tooltip>
                      </Box>

                      <Box>
                        <Typography color="text.secondary" variant={variant}>
                          {text}
                        </Typography>
                      </Box>
                    </Stack>
                  ))}
              </Stack>
            </Stack>
          </Stack>
        </Grid>

        <Divider flexItem sx={{ margin: "0.5rem 0", width: "100%" }} />

        <Stack alignItems="center" sx={{ width: "100%" }}>
          {!isLoading && !isPostLoading && (
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
          )}
        </Stack>
      </StyledGridContainer>
    </Paper>
  );
};
