import React from "react";

import {
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

const image =
  "https://res.cloudinary.com/dtqbxfe7r/image/upload/v1720807846/employer-promo_dash_ldjhct.svg";

const PromotionSidebar = () => {
  const deadline = new Date();
  const n = deadline.getTime() + 7 * 24 * 60 * 60 * 1000;
  const endDate = new Date(n);
  const localizedEndDate = endDate.toLocaleString().split(",")[0];

  return (
    <Paper elevation={1}>
      <Stack alignItems="center">
        <Typography align="center" variant="h6" fontWeight={700}>
          Find Teachers Affordably
        </Typography>
        <CardMedia component="img" src={image} alt="promo_offer" />
        <Divider variant="middle" flexItem />
        <CardContent>
          <Typography variant="subtitle2">
            Save 500THB whenever you purchase Agency or Enterprise packages.
          </Typography>
        </CardContent>
        <CardActions>
          <Chip label="Code: EARLYBIRD" />
        </CardActions>
        <Typography variant="caption">
          offer ends: {localizedEndDate}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default PromotionSidebar;
