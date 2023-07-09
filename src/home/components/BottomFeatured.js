import React from "react";

import { Link as RouterLink } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Skeleton,
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

const StyledText = styled(Typography)(({ theme }) => ({
  padding: "1rem",
}));

const BottomFeatured = ({ isLoading }) => {
  return (
    <StyledBoxContainer>
      {isLoading &&
        Array.from({ length: 1 }).map((_, i) => (
          <Card key={i} sx={{ borderRadius: "18px" }}>
            <CardContent>
              <Skeleton width="100%" height={30} />
            </CardContent>
            <StyledText sx={{ display: "flex", flexDirection: "row-reverse" }}>
              <Skeleton width="80%" />
            </StyledText>
            <CardActions sx={{ display: "flex", flexDirection: "row-reverse" }}>
              <Skeleton width="80%" />
            </CardActions>
          </Card>
        ))}
      {isLoading &&
        Array.from({ length: 1 }).map((_, i) => (
          <Card key={i} sx={{ borderRadius: "18px" }}>
            <CardContent>
              <Skeleton width="100%" height={30} />
            </CardContent>
            <StyledText sx={{ display: "flex", flexDirection: "row-reverse" }}>
              <Skeleton width="80%" />
            </StyledText>
            <CardActions sx={{ display: "flex", flexDirection: "row-reverse" }}>
              <Skeleton width="80%" />
            </CardActions>
          </Card>
        ))}
      {!isLoading && (
        <Card sx={{ borderRadius: "18px" }}>
          <CardContent>
            <CardMedia component="img" alt="thai-guide" src={ThaiBanner} />
          </CardContent>
          <StyledText>
            First Teaching Job? Learn about your rights as an employee in
            Kingdom and what you should look out for from employers.
          </StyledText>
          <CardActions>
            <Button
              sx={{ borderRadius: "18px" }}
              variant="outlined"
              component={RouterLink}
              to="/content"
            >
              Read More
            </Button>
          </CardActions>
        </Card>
      )}

      {!isLoading && (
        <Card sx={{ borderRadius: "18px" }}>
          <CardContent>
            <CardMedia component="img" alt="thai-guide" src={ThailandIncome} />
          </CardContent>
          <StyledText>
            See what other teachers are making, where they are living and what
            their daily expenses are. Get a better idea...
          </StyledText>
          <CardActions>
            <Button
              sx={{ borderRadius: "18px" }}
              variant="outlined"
              component={RouterLink}
              to="/income-directory"
            >
              Read More
            </Button>
          </CardActions>
        </Card>
      )}
    </StyledBoxContainer>
  );
};

export default BottomFeatured;
