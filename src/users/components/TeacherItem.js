import React from 'react';

import { Link } from 'react-router-dom';

import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import PlaceIcon from '@mui/icons-material/Place';
import PublicIcon from '@mui/icons-material/Public';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';

const TeacherItem = (props) => {
  return (
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
          <Typography component="h3" color="text.secondary" variant="subtitle1">
            <PublicIcon fontSize="inherit" /> {props.nationality}
          </Typography>
          <Typography component="h3" color="text.secondary" variant="subtitle1">
            <AssuredWorkloadIcon fontSize="inherit" /> {props.workExperience}
          </Typography>
          <Typography component="h3" color="text.secondary" variant="subtitle1">
            <PlaceIcon fontSize="inherit" /> {props.currentLocation}
          </Typography>
          <Typography component="h3" color="text.secondary" variant="subtitle1">
            <WorkspacePremiumIcon fontSize="inherit" /> {props.degree}
          </Typography>
        </CardContent>
        <Button
          component={Link}
          to={`/teachers/${props.id}`}
          sx={{ margin: "0 auto" }}
        >
          View Profile
        </Button>
      </Card>
    </Grid>
  );
};

export default TeacherItem;
