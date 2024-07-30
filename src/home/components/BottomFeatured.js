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

import { useThemeToggle } from "../../shared/context/theme-context";

const userContentImg =
  "https://res.cloudinary.com/dtqbxfe7r/image/upload/v1721613274/user-conts_1_lktbt3.svg";
const userIncomeImg =
  "https://res.cloudinary.com/dtqbxfe7r/image/upload/v1721613273/user-incom_afqbxr.svg";

const StyledBoxContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  alignItems: "center",
  justifyContent: "center",
  gridTemplateColumns: "50% 50%",
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
  const { isDarkMode } = useThemeToggle();
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
            <CardMedia
              sx={{
                backgroundColor: isDarkMode ? "#404040" : "#0b5e6712",
                borderRadius: "10px",
              }}
              component="img"
              alt="thai-guide"
              src={userContentImg}
            />
          </CardContent>
          <StyledText color="text.secondary" variant="subtitle2">
            A discussion for anyone who wants to ask a question, share advice or
            give their professional take on a topic.
          </StyledText>
          <CardActions>
            <Button
              sx={{ borderRadius: "18px" }}
              variant="outlined"
              component={RouterLink}
              to="/content"
            >
              View Posts
            </Button>
          </CardActions>
        </Card>
      )}

      {!isLoading && (
        <Card sx={{ borderRadius: "18px" }}>
          <CardContent>
            <CardMedia
              sx={{
                backgroundColor: isDarkMode ? "#404040" : "#0b5e6712",
                borderRadius: "10px",
              }}
              component="img"
              alt="thai-guide"
              src={userIncomeImg}
            />
          </CardContent>
          <StyledText color="text.secondary" variant="subtitle2">
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
              Read Incomes
            </Button>
          </CardActions>
        </Card>
      )}
    </StyledBoxContainer>
  );
};

export default BottomFeatured;
