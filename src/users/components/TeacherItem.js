import React from 'react';

import { Link } from 'react-router-dom';

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
      <Card sx={{ margin: "0 auto" }}>
        <CardContent sx={{ lineHeight: "5px" }}>
          <CardMedia
            component="img"
            image={props.image}
            alt={`${props.id}--${props.name}`}
            sx={{
              border: "1px solid #e5e5e5",
              borderRadius: "20px",
              height: 170,
              width: 170,
              margin: "0 auto",
            }}
          />
          <Typography component="h2" variant="h6">
            {props.name}
          </Typography>
          <Typography component="h3" color="text.secondary" paragraph>
            {props.nationality}
          </Typography>
          <Typography component="h3" color="text.secondary" paragraph>
            {props.workExperience}
          </Typography>
          <Typography component="h3" color="text.secondary" paragraph>
            {props.currentLocation}
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
