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

import EmployerDashPromo from "../../../assets/employer-promo_dash.svg";

const PromotionSidebar = () => {
  const deadline = new Date();
  const n = deadline.getTime() + 7 * 24 * 60 * 60 * 1000;
  const endDate = new Date(n);
  const localizedEndDate = endDate.toLocaleString().split(",")[0];

  return (
    <Paper elevation={1}>
      <Stack alignItems="center">
        <Typography variant="h6" fontWeight={700}>
          Find Teachers Affordably
        </Typography>
        <CardMedia component="img" src={EmployerDashPromo} alt="promo_offer" />
        <Divider variant="middle" flexItem />
        <CardContent>
          <Typography variant="subtitle1">
            Save 500THB when you activate an Agency Promo.
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
