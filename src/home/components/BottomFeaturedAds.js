import React from "react";

import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

/**
 *
 * @returns return a dynamic object of current jobs being featured//
 * -horizontal list (3);
 * -job title, logo, salary, location and hours
 *
 */

const BottomFeaturedAds = (props) => {
  return (
    <Card sx={{ display: "flex" }}>
      <CardMedia
        component="img"
        sx={{ width: 100 }}
        image={props.image}
        alt={props.school}
      />
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {props.title.trim().length > 20
              ? props.title.substring(0, 20) + "..."
              : props.title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {props.location}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {props.salary} - {props.hours}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default BottomFeaturedAds;
