import React, { useContext, useState } from "react";

import { Link } from "react-router-dom";

import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import PlaceIcon from "@mui/icons-material/Place";
import PublicIcon from "@mui/icons-material/Public";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Grid,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

//import CustomModal from "../../shared/components/UIElements/CustomModal";
import { AuthContext } from "../../shared/context/auth-context";

//import { useUniversityLogo } from "../../shared/hooks/use-university";

const StyledGlassCard = styled(Card)(({ theme }) => ({
  margin: "0 auto",
  minWidth: "100%",
  position: "relative",
  overflow: "hidden",
  background: "white",
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
  // const { universityLogo, getUniversityLogo } = useUniversityLogo(
  //   props?.education
  // );

  // useEffect(() => {
  //   if (props.education === "") {
  //     return;
  //   }
  //   getUniversityLogo();
  // }, [getUniversityLogo, props.education]);

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const errorHeader = !auth.isLoggedIn
    ? "Please Login"
    : auth.isLoggedIn && auth.user?.credits === 0
    ? "Please Purchase Credits"
    : "Please Login and/or purchase credits.";

  const errorReason = !auth.isLoggedIn
    ? "Please login & have credits on balance"
    : auth.isLoggedIn && auth.user?.credits === 0
    ? "Please purchase credits to view teacher profiles"
    : "Please login and purchase credits to view teachers.";

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
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography component="h2" variant="h6">
                {props?.name}
              </Typography>
              {props?.education && (
                <Chip
                  sx={{ backgroundColor: "transparent" }}
                  avatar={
                    <Tooltip
                      title={`Degree from ${props?.education?.split(".")[0]}`}
                      placement="top"
                    >
                      <Avatar
                        alt={`${props?.education}--${props?.name}`}
                        src={`https://logo.clearbit.com/${props?.education.toLowerCase()}`}
                      />
                    </Tooltip>
                  }
                />
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
            <Box>
              <Typography
                sx={{ paddingTop: "3px" }}
                variant="subtitle2"
                color="text.secondary"
              >
                {props?.about?.length > 50
                  ? props?.about.substring(0, 50) + "..."
                  : props?.about}
              </Typography>
            </Box>
          </CardContent>
          <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              component={Link}
              to={`/teachers/${props?.id}`}
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
