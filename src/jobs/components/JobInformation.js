import React from "react";

import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import {
  Avatar,
  Box,
  Card,
  CardContent,
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
  height: 170,
  width: 170,
  border: "3px solid",
  borderColor: theme.palette.primary.main,
  boxShadow: theme.shadows[4],
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: theme.shadows[8],
  },
  [theme.breakpoints.down("md")]: {
    height: 150,
    width: 150,
  },
  [theme.breakpoints.down("sm")]: {
    height: 170,
    width: 170,
  },
}));

const ModernCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  background: theme.palette.mode === "dark"
    ? "rgba(255, 255, 255, 0.08)"
    : "rgb(255, 255, 255)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: theme.palette.mode === "dark"
    ? "1px solid rgba(255, 255, 255, 0.2)"
    : "1px solid rgba(255, 255, 255, 0.3)",
  boxShadow: theme.palette.mode === "dark"
    ? `
        0 8px 32px rgba(0, 0, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.1),
        inset 0 -1px 0 rgba(255, 255, 255, 0.05)
      `
    : `
        0 8px 32px rgba(0, 0, 0, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.5),
        inset 0 -1px 0 rgba(255, 255, 255, 0.1)
      `,
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    boxShadow: theme.palette.mode === "dark"
      ? `
          0 12px 40px rgba(0, 0, 0, 0.4),
          inset 0 1px 0 rgba(255, 255, 255, 0.15)
        `
      : `
          0 12px 40px rgba(0, 0, 0, 0.15),
          inset 0 1px 0 rgba(255, 255, 255, 0.6)
        `,
  },
}));

const GradientCompanyChip = styled(Chip)(({ theme }) => ({
  background: "transparent",
  color: theme.palette.text.primary,
  border: `1px solid ${theme.palette.divider}`,
  fontWeight: 600,
  height: "auto",
  fontSize: "16px",
  padding: theme.spacing(1),
  maxWidth: "100%",
  marginBottom: "1rem",
  '& .MuiChip-label': {
    whiteSpace: 'normal',
    wordBreak: 'break-word',
    overflowWrap: 'anywhere',
    lineHeight: 1.2,
  },
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  transition: "all 0.3s ease-in-out",
}));

const createJobInfo = (job) => {
  return job
    ? [
        { variant: "h5", component: "h2", text: job?.title },
        {
          variant: "subtitle1",
          component: "h3",

          text: (
            <GradientCompanyChip
              label={job?.creator?.company}
            />
          ),
        },
        {
          variant: "subtitle1",
          component: "h3",
          note: `${job?.creator?.company} is located in ${job?.creator?.headquarters}, Thailand`,
          icon: <LocationOnIcon fontSize="small" />,
          text: job?.creator?.headquarters + ", Thailand",
        },
        {
          variant: "subtitle1",
          component: "h3",
          note: `${job?.creator?.company} current company size.`,
          icon: <BusinessIcon fontSize="small" />,
          text: job?.creator?.companySize + " employees",
        },
        {
          variant: "subtitle1",
          component: "h3",
          note: `${job?.creator?.company} launched in ${job?.creator?.established}`,
          icon: <VerifiedUserIcon fontSize="small" />,
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
    <ModernCard>
      <CardContent sx={{ p: 3 }}>
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
              variant="h4"
              fontWeight={700}
              align="center"
              component="h2"
              color="text.primary"
              sx={{ 
                fontSize: { xs: 24, md: 28 },
                mb: 2,
                //background: "linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)",
                backgroundClip: "text",
                // WebkitBackgroundClip: "text",
                // WebkitTextFillColor: "transparent",
                textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                whiteSpace: 'normal',
                wordBreak: 'break-word',
                overflowWrap: 'anywhere',
              }}
            >
               {jobInformation[0]?.text}
            </Typography>
            <Divider flexItem sx={{ margin: "0.5rem 0", width: "100%" }} />
           
            <GradientCompanyChip
              label={job?.creator?.company}
            />
       
            <Stack
              sx={{
                flexDirection: { xs: "column", md: "column", lg: "row" },
                gap: 2,
                flexWrap: "wrap",
              }}
              alignItems="center"
            >
              <StyledAvatar
                variant="rounded"
                src={`${job?.image}`}
                alt={`${job?.id}--${job?.creator?.company}`}
                sx={{ border: "1px solid #bdbdbd" }}
              />
              <Stack spacing={2} alignItems="start">
                {jobInformation
                  ?.slice(2)
                  ?.map(({ variant, component, icon, text, note }, i) => (
                    <Stack key={i} direction="row" alignItems="center" spacing={2}>
                      {icon &&<Box>
                        <Tooltip title={note ? note : ""}>
                          <Box sx={{ 
                            p: 1, 
                            borderRadius: "50%", 
                            backgroundColor: "primary.main",
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}>
                            {icon}
                          </Box>
                        </Tooltip>
                      </Box>}

                      <Box>
                        <Typography 
                          color="text.primary" 
                          variant="body2"
                          sx={{ fontWeight: 500, fontSize: 13 }}
                        >
                          {text}
                        </Typography>
                      </Box>
                    </Stack>
                  ))}
              </Stack>
            </Stack>
          </Stack>
        </Grid>

        <Divider flexItem sx={{ margin: "1.5rem 0", width: "100%" }} />

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
      </CardContent>
    </ModernCard>
  );
};
