import React, {
  useContext,
  useState,
} from 'react';

import { Link } from 'react-router-dom';

import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import EmailIcon from '@mui/icons-material/Email';
import PlaceIcon from '@mui/icons-material/Place';
import PublicIcon from '@mui/icons-material/Public';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from '@mui/material';

import CustomModal from '../../shared/components/UIElements/CustomModal';
import { AuthContext } from '../../shared/context/auth-context';

const TeacherItem = (props) => {
  const authCtx = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  let viewProfileButton;
  let contactTeacherButton;

  if (!authCtx.isLoggedIn) {
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
        Contact
      </Button>
    );
  }

  return (
    <>
      {openModal && (
        <CustomModal open={openModal} handleClose={handleCloseModal} />
      )}
      <Grid container direction="row" item>
        <Card sx={{ margin: "0 auto", minWidth: "100%" }}>
          <CardContent sx={{ lineHeight: 1 }}>
            <CardMedia
              component="img"
              image={props.image}
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
              <AssuredWorkloadIcon fontSize="inherit" /> {props.workExperience}{" "}
              {props.workExperience === 2 ? "Year" : "Years"}
            </Typography>
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
            <Divider orientation="vertical" flexItem /> {contactTeacherButton}
          </Grid>
        </Card>
      </Grid>
    </>
  );
};

export default TeacherItem;
