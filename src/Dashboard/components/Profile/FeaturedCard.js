import React from 'react';

import { Link } from 'react-router-dom';

import {
  Avatar,
  Box,
  Button,
  Card,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import KidsInClassImg
  from '../../../assets/mario-heller-hXLkFpvKRys-unsplash.jpg';
import { dummy_jobs } from '../../../shared/util/DummyJobs';

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  alignItems: "start",
  justifyContent: "flex-start",
  flexDirection: "column",
  position: "relative",
}));

const StyledBoxOverlay = styled(Box)({
  position: "absolute",
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  backgroundColor: "rgba(0,0,0,.5)",
});

const StyledImageOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 2,
}));

const FeaturedCard = () => {
  const { id, title, location, salary, description, hours, creator } =
    dummy_jobs[0];

  return (
    <StyledCard>
      <Grid container direction="column">
        <Grid item>
          <Box sx={{ position: "relative" }}>
            <CardMedia
              sx={{ height: 140 }}
              component="img"
              alt={id}
              image={KidsInClassImg}
            />

            <StyledImageOverlay />
          </Box>
        </Grid>
        <Grid
          item
          sx={{ position: "absolute", top: "5%", left: "16px", zIndex: 10 }}
        >
          <Avatar
            sx={{
              width: 56,
              height: 56,
              border: "1px solid #e5e5e5",
              backgroundColor: "white",
            }}
            src={creator.logoUrl}
            variant="circular"
          />
          <Grid item>
            <Typography component="h1" variant="h6" color="white">
              {creator.company}
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Typography
            sx={{ margin: "0 0 0 0.5rem" }}
            component="h2"
            variant="h5"
            color="text.secondary"
          >
            {title}
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "5px",
            margin: "0 0 0 0.5rem",
          }}
        >
          <Grid item>
            <Chip clickable={true} size="medium" label={location} />
          </Grid>
          <Grid item>
            <Chip clickable={true} size="medium" label={salary} />
          </Grid>
          <Grid item>
            <Chip clickable={true} size="medium" label={hours} />
          </Grid>
        </Grid>
        <Typography
          sx={{ margin: "1rem 0 0 0.5rem", fontWeight: "bold" }}
          variant="body1"
          componet="h3"
        >
          Description:
        </Typography>
        <Grid item>
          <Typography
            sx={{ margin: "0 0 0 0.5rem" }}
            color="text.secondary"
            variant="subtitle2"
          >
            {description.substring(0, 100) + "..."}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        spacing={2}
        sx={{ justifyContent: "center", margin: "0 0 1rem 0" }}
      >
        <Grid item>
          <Button variant="contained" component={Link} to="/jobs">
            Apply Now
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" component={Link} to="/jobs">
            visit jobs
          </Button>
        </Grid>
      </Grid>
    </StyledCard>
  );
};

export default FeaturedCard;
