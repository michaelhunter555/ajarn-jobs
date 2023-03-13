import React from "react";

import { Link as RouterLink } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import ThaiBanner from "../../assets/ThaiGuide.png";
import ThailandIncome from "../../assets/ThailandIncome.png";

const bottomFeaturedStyles = {
  container: {
    display: "grid",
    alignItems: "center",
    justifyContent: "center",
    gridTemplateColumns: " 35% 35%",
    gridAutoRows: "auto",
    gap: "3rem;",
    marginBottom: "2rem",
  },
  text: {
    padding: "1rem",
  },
  "@media(max-width: 900px)": {
    container: {
      gridTemplateColumns: "100%",
      gridAutoColumns: "auto",
    },
  },
  "@media(max-width: 600px)": {
    container: {
      gridTemplateColumns: "100%",
      gridAutoColumns: "auto",
    },
  },
};

const BottomFeatured = () => {
  return (
    <Box sx={{ ...bottomFeaturedStyles.container }}>
      <Card>
        <CardContent>
          <CardMedia component="img" alt="thai-guide" src={ThaiBanner} />
        </CardContent>
        <Typography sx={{ ...bottomFeaturedStyles.text }}>
          First Teaching Job? Learn about your rights as an employee in Kingdom
          and what you should look out for from employers.
        </Typography>
        <CardActions>
          <Button component={RouterLink} to="/">
            Read More
          </Button>
        </CardActions>
      </Card>

      <Card>
        <CardContent>
          <CardMedia component="img" alt="thai-guide" src={ThailandIncome} />
        </CardContent>
        <Typography sx={{ ...bottomFeaturedStyles.text }}>
          See what other teachers are making, where they are living and what
          their daily expenses are. Get a better idea...
        </Typography>
        <CardActions>
          <Button component={RouterLink} to="/">
            Read More
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default BottomFeatured;
