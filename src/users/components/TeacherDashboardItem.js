import React from "react";

import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import LocalPoliceTwoToneIcon from "@mui/icons-material/LocalPoliceTwoTone";
import PlaceIcon from "@mui/icons-material/Place";
import PublicIcon from "@mui/icons-material/Public";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import {
  Avatar,
  Box,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { CustomModalBlur } from "../../shared/util/CustomerBlurStyle";

const StyledNameTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: "0.5rem auto",
  minWidth: "100%",
  position: "relative",
  overflow: "hidden",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "18px",
  maxWidth: 300,
  "&:hover": {
    // boxShadow:
    //   theme.palette.mode === "light"
    //     ? "3px 3px 3px 3px rgba(0,0,0,0.9)"
    //     : "1px 1px 1px 1px rgba(255,255,255,0.9)",
    backgroundColor: theme.palette.mode === "light" ? "#fbfbfb" : "#0a0a0a",
  },

  [theme.breakpoints.down("md")]: {
    margin: "0.5rem 0.5rem 0",
  },
  [theme.breakpoints.down("sm")]: {
    margin: "0.5rem 1rem 0",
  },
}));

const BlurImage = styled("span")(({ theme }) => ({
  ...CustomModalBlur,
}));

const BlurContainer = styled("div")({
  position: "relative",
  overflow: "hidden",
  borderRadius: "16px",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
});

const BlurBackground = styled("div")({
  background: "rgba(255, 255, 255, 0.02)",
  backdropFilter: "blur(5.1px)",
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1,
});

const BlurContent = styled("div")({
  position: "relative",
});

const BlurContentWraper = ({ children, buffetIsActive }) => {
  return buffetIsActive ? (
    <>{children}</>
  ) : (
    <BlurContainer>
      <BlurBackground />
      <BlurContent>{children}</BlurContent>
    </BlurContainer>
  );
};

const ActiveTeachersDashboardList = (props) => {
  let nameText;
  if (props?.name?.length > 20) {
    nameText = (
      <StyledNameTypography longName={true}>{props?.name}</StyledNameTypography>
    );
  } else {
    nameText = (
      <Typography
        component="h3"
        sx={{ fontSize: { xs: 12, md: 14 }, fontWeight: { xs: 700, md: 600 } }}
      >
        {props?.name}
      </Typography>
    );
  }

  // Education summary
  const firstUniversity = props?.education
    ? props.education
        ?.split(",")
        ?.map((s) => s.trim())
        ?.filter(Boolean)?.[0]
        ?.split(".")[0]
    : "";
  const highestAchievement = props?.highestCertification || props?.degree || "";

  return (
    <BlurContentWraper buffetIsActive={props?.buffetIsActive}>
      <StyledPaper
        elevation={0}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minWidth: "100%",
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={3} md={3}>
            {/* image and button on top of eachother */}
            <Stack justifyContent="center" alignItems="center" spacing={1}>
              <CardMedia
                component="img"
                image={props?.image}
                alt={`${props?.id}--${props?.name}`}
                sx={{
                  borderRadius: "15px",
                  border: "1px solid #e5e5e5",
                  height: 55,
                  width: 55,
                  margin: "0 auto",
                }}
              />
            </Stack>
          </Grid>

          <Grid item xs={8} md={8}>
            <CardContent sx={{ lineHeight: 1, padding: "16px 16px 0 16px" }}>
              <Stack
                direction="row"
                spacing={props?.education ? 0 : "3px"}
                alignItems="center"
                justifyContent="flex-start"
              >
                {nameText}

                {/* Education chip list removed; summarized next to icon below */}
                {/**add stuff here */}
                {props?.workExperience > 5 && (
                  <Tooltip
                    title={`Has over 5 years experience.`}
                    placement="top"
                  >
                    <Box
                      sx={{
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "flex-end",
                      }}
                    >
                      <LocalPoliceTwoToneIcon
                        style={{ color: "#128cb1", fontSize: 18 }}
                      />{" "}
                      {/*#128cb1 */}
                    </Box>
                  </Tooltip>
                )}
              </Stack>
              {/*2 x 2 */}
              <Grid container spacing={2} direction="row">
                <Grid item>
                  <Typography
                    component="h3"
                    color="text.secondary"
                    variant="subtitle2"
                    sx={{ fontSize: '11px'}}
                  >
                    <PublicIcon fontSize="inherit" />
                    {props?.nationality}
                  </Typography>

                  <Typography
                    component="h3"
                    color="text.secondary"
                    variant="subtitle2"
                    sx={{ fontSize: '11px'}}
                  >
                    <AssuredWorkloadIcon fontSize="inherit" />{" "}
                    {props?.workExperience}
                  </Typography>
                </Grid>
                {/*2 x 2 */}
                <Grid item>
                  <Typography
                    component="h3"
                    color="text.secondary"
                    variant="subtitle2"
                    sx={{ fontSize: '11px'}}
                  >
                    <PlaceIcon fontSize="inherit" /> {props?.currentLocation}
                  </Typography>

                  <Typography
                    component="h3"
                    color="text.secondary"
                    variant="subtitle2"
                    sx={{ fontSize: '11px'}}
                  >
                    <WorkspacePremiumIcon fontSize="inherit" /> {(
                      firstUniversity || highestAchievement
                    )
                      ? firstUniversity && highestAchievement
                        ? `${highestAchievement} from ${firstUniversity}`
                        : highestAchievement || firstUniversity
                      : ''}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        </Grid>
      </StyledPaper>
    </BlurContentWraper>
  );
};

export default ActiveTeachersDashboardList;
