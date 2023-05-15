import React, { useContext, useState } from "react";

import { Link } from "react-router-dom";

import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import EmailIcon from "@mui/icons-material/Email";
import PlaceIcon from "@mui/icons-material/Place";
import PublicIcon from "@mui/icons-material/Public";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import CustomModal from "../../shared/components/UIElements/CustomModal";
import { AuthContext } from "../../shared/context/auth-context";

const StyledGlassCard = styled(Card)(({ theme }) => ({
  margin: "0 auto",
  minWidth: "100%",
  position: "relative",
  overflow: "hidden",
  background: "white",
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

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  let viewProfileButton;
  let contactTeacherButton;

  if (!auth.isLoggedIn || auth?.user?.credits === 0) {
    viewProfileButton = (
      <Button sx={{ margin: "0 auto" }} onClick={handleModalOpen}>
        View Profile
      </Button>
    );
    contactTeacherButton = (
      <Button sx={{ margin: "0 auto" }} onClick={handleModalOpen}>
        <EmailIcon color="primary" sx={{ fontSize: 16 }} /> Contact
      </Button>
    );
  } else {
    viewProfileButton = (
      <Button
        component={Link}
        to={`/teachers/${props.id}`}
        sx={{ margin: "0 auto" }}
      >
        View Profile
      </Button>
    );

    contactTeacherButton = (
      <Button
        sx={{ margin: "0 auto", paddingLeft: "0.5rem" }}
        onClick={() => console.log("MODAL")}
      >
        <EmailIcon color="primary" sx={{ fontSize: 16 }} /> Contact
      </Button>
    );
  }

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
      {openModal && (
        <CustomModal
          noCredits={errorReason}
          error={errorHeader}
          open={openModal}
          handleClose={handleCloseModal}
        />
      )}
      <Grid container direction="row" item>
        <StyledGlassCard>
          <CardContent sx={{ lineHeight: 1 }}>
            <CardMedia
              component="img"
              image={`${process.env.REACT_APP_IMAGE}/${props.image}`}
              alt={`${props.id}--${props.name}`}
              sx={{
                border: "1px solid #e5e5e5",

                height: 170,
                margin: "0 auto",
              }}
            />
            <Typography component="h2" variant="h6">
              {props.name}
            </Typography>
            {/*2 x 2 */}
            <Grid container spacing={2} direction="row">
              <Grid item>
                <Typography
                  component="h3"
                  color="text.secondary"
                  variant="subtitle2"
                >
                  <PublicIcon fontSize="inherit" /> {props.nationality}
                </Typography>
                <Typography
                  component="h3"
                  color="text.secondary"
                  variant="subtitle2"
                >
                  <AssuredWorkloadIcon fontSize="inherit" />{" "}
                  {props.workExperience}{" "}
                  {props.workExperience > 1 ? "Years" : "Year"}
                </Typography>
              </Grid>
              {/*2 x 2 */}
              <Grid item>
                <Typography
                  component="h3"
                  color="text.secondary"
                  variant="subtitle2"
                >
                  <PlaceIcon fontSize="inherit" /> {props.currentLocation}
                </Typography>
                <Typography
                  component="h3"
                  color="text.secondary"
                  variant="subtitle2"
                >
                  <WorkspacePremiumIcon fontSize="inherit" /> {props.degree}
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
                {props.about?.length > 50
                  ? props.about.substring(0, 50) + "..."
                  : props.about}
              </Typography>
            </Box>
          </CardContent>
          <Grid
            container
            direction="row"
            sx={{
              borderTop: "1px solid #e5e5e5",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {viewProfileButton}
            <Divider orientation="vertical" flexItem />
            {contactTeacherButton}
          </Grid>
        </StyledGlassCard>
      </Grid>
    </>
  );
};

export default TeacherItem;
