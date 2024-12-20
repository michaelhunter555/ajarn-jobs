import React, { useContext, useState } from "react";

import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import LocalPoliceTwoToneIcon from "@mui/icons-material/LocalPoliceTwoTone";
import PlaceIcon from "@mui/icons-material/Place";
import PublicIcon from "@mui/icons-material/Public";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import {
  Avatar,
  Box,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { AuthContext } from "../../shared/context/auth-context";

const StyledNameTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
}));

const StyledGlassCard = styled(Paper)(({ theme }) => ({
  margin: "0 auto",
  minWidth: "100%",
  position: "relative",
  overflow: "hidden",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "18px",
  maxWidth: 300,

  [theme.breakpoints.down("md")]: {
    margin: "0.5rem 0.5rem 0",
  },
  [theme.breakpoints.down("sm")]: {
    margin: "0.5rem 1rem 0",
  },
}));

const TeacherItem = (props) => {
  const auth = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  /**
   * TODO: blur details of users if buffetIsNotActive (leave first user STOCK)
   */

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  let nameText;
  if (props?.name?.length > 20) {
    nameText = (
      <StyledNameTypography longName={true}>{props?.name}</StyledNameTypography>
    );
  } else {
    nameText = (
      <Typography component="h3" variant="h6">
        {props?.name}
      </Typography>
    );
  }

  return (
    <>
      <Grid container direction="row" justifyContent="center">
        <StyledGlassCard
          onClick={handleModalOpen}
          sx={{ maxWidth: props?.width }}
        >
          <CardContent sx={{ lineHeight: 1, padding: "16px 16px 0 16px" }}>
            <CardMedia
              component="img"
              image={props?.image}
              alt={`${props?.id}--${props?.name}`}
              sx={{
                border: "1px solid #e5e5e5",
                height: 170,
                margin: "0 auto",
              }}
            />
            <Stack
              direction="row"
              spacing={props?.education ? 0 : "3px"}
              alignItems="center"
              justifyContent="flex-start"
            >
              {nameText}
              {/*new Result should be mapped over */}
              {props?.education &&
                props?.education
                  ?.split(",")
                  ?.slice(0, 2)
                  ?.map((uni, i) => (
                    <Chip
                      size="small"
                      key={i}
                      sx={{ backgroundColor: "transparent" }}
                      avatar={
                        <Tooltip
                          title={`Degree from ${uni?.trim()?.split(".")[0]}`}
                          placement="top"
                        >
                          <Avatar
                            alt={`${uni?.trim()}--${props?.name}`}
                            src={`https://logo.clearbit.com/${uni
                              ?.trim()
                              ?.toLowerCase()}`}
                          />
                        </Tooltip>
                      }
                    />
                  ))}
              {/**add stuff here */}
              {props?.workExperience > 5 && (
                <Tooltip title={`Has over 5 years experience.`} placement="top">
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
                >
                  <PublicIcon fontSize="inherit" /> {props?.nationality}
                </Typography>
                <Typography
                  component="h3"
                  color="text.secondary"
                  variant="subtitle2"
                >
                  <AssuredWorkloadIcon fontSize="inherit" />{" "}
                  {props?.workExperience}{" "}
                  {props?.workExperience > 1 ? "Years" : "Year"}
                </Typography>
              </Grid>
              {/*2 x 2 */}
              <Grid item>
                <Typography
                  component="h3"
                  color="text.secondary"
                  variant="subtitle2"
                >
                  <PlaceIcon fontSize="inherit" /> {props?.currentLocation}
                </Typography>

                <Typography
                  component="h3"
                  color="text.secondary"
                  variant="subtitle2"
                >
                  <WorkspacePremiumIcon fontSize="inherit" /> {props?.degree}
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={{ width: "75%" }} variant="left" />
          </CardContent>

          <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              sx={{
                color: "#128cb1",
                borderRadius: "18px",
                "&:hover": { color: "#128cb1" },
              }}
            >
              View
            </Button>
          </CardActions>
        </StyledGlassCard>
      </Grid>
    </>
  );
};

export default TeacherItem;
