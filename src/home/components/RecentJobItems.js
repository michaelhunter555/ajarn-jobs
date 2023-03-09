import React from "react";

import { Card, CardMedia, Grid, Typography } from "@mui/material";

const RecentJobItems = (props) => {
  return (
    <Card sx={{ margin: "0.7rem" }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <CardMedia
            component="img"
            src={props.logo}
            alt={props.id}
            sx={{
              height: "auto",
              width: "50px",
              borderRight: "1px solid #cecece",
            }}
          />
        </Grid>

        <Grid item xs={8}>
          <Grid conainer direction="column" spacing={1}>
            <Grid item>
              <Typography color="primary">{props.salary}</Typography>
            </Grid>
            <Grid item>
              <Typography color="text.secondary">
                {props.location}
                {props.hours}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default RecentJobItems;
