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
import { styled } from "@mui/material/styles";

import ThaiBanner from "../../assets/ThaiGuide.png";
import ThailandIncome from "../../assets/ThailandIncome.png";

const StyledBoxContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  alignItems: "center",
  justifyContent: "center",
  gridTemplateColumns: " 35% 35%",
  gridAutoRows: "auto",
  gap: "3rem;",
  marginBottom: "2rem",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "100%",
    gridAutoColumns: "auto",
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "100%",
    gridAutoColumns: "auto",
  },
}));

const StyledText = styled(Typography)({
  padding: "1rem",
});

const BottomFeatured = () => {
  return (
    <StyledBoxContainer>
      <Card>
        <CardContent>
          <CardMedia component="img" alt="thai-guide" src={ThaiBanner} />
        </CardContent>
        <StyledText>
          First Teaching Job? Learn about your rights as an employee in Kingdom
          and what you should look out for from employers.
        </StyledText>
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
        <StyledText>
          See what other teachers are making, where they are living and what
          their daily expenses are. Get a better idea...
        </StyledText>
        <CardActions>
          <Button component={RouterLink} to="/income-directory">
            Read More
          </Button>
        </CardActions>
      </Card>
    </StyledBoxContainer>
  );
};

export default BottomFeatured;
