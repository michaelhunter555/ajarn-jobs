import React from "react";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme, featured }) => ({
  backgroundColor: featured ? "#fffef9" : "#fafafa",
  border: featured ? "1px solid #faea92" : "1px solid #e5e5e5",
  borderRadius: "18px",
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
    <StyledCard featured={props?.featured}>
      <StyledMediaImage
        component="img"
        image={props?.image}
        alt={props?.school}
      />
      <StyledBox>
        <StyledCardContent>
          <Typography
            component="div"
            variant="h5"
            sx={{ fontSize: 15, fontWeight: 600 }}
          >
            {props?.title.trim().length > 20
              ? props.title.substring(0, 20) + "..."
              : props.title}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="div"
          >
            {props?.location}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="div"
          >
            {props?.salary} - {props?.hours}
          </Typography>
        </StyledCardContent>
        <CardActions sx={{ display: "flex", alignItems: "flex-end" }}>
          <Button
            sx={{
              borderRadius: "18px",
            }}
            variant="outlined"
          >
            view
          </Button>
        </CardActions>
      </StyledBox>
    </StyledCard>
  );
};

export default BottomFeaturedAds;
