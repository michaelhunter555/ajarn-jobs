import React from "react";

import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  minWidth: "auto",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const StyledBox = styled(Box)({
  display: "flex",
  flexDirection: "row",
});

const StyledMediaImage = styled(CardMedia)({
  width: 100,
});

const StyledCardContent = styled(CardContent)({
  flex: "1 0 auto",
});

const BottomFeaturedAds = (props) => {
  return (
    <StyledCard>
      <StyledMediaImage
        component="img"
        image={props.image}
        alt={props.school}
      />
      <StyledBox>
        <StyledCardContent>
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
        </StyledCardContent>
      </StyledBox>
    </StyledCard>
  );
};

export default BottomFeaturedAds;
