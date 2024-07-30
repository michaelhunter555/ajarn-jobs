import React, { useContext } from "react";

import { Link as RouterLink } from "react-router-dom";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Link,
  Skeleton,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { AuthContext } from "../../shared/context/auth-context";
import { useThemeToggle } from "../../shared/context/theme-context";

const StyledBoxWrapper = styled(Box)(({ theme }) => ({
  display: "flex",

  flexWrap: "nowrap",
  minWidth: 100,
  margin: "0 0 1rem 0",
  flexDirection: "row",
  justifyContent: "center",
  gap: "1rem",
  overflowX: "auto",
  whiteSpace: "nowrap",
  [theme.breakpoints.down("md")]: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
}));

const StyledCardBackground = styled(Card)(({ theme }) => ({
  margin: "0.2rem",
  display: "flex",

  flexDirection: "column",
  justifyContent: "flex-start",
  minWidth: 170,
  borderRadius: "6px",

  [theme.breakpoints.down("md")]: {
    minWidth: 120,
  },
  [theme.breakpoints.down("sm")]: {
    minWidth: 100,
  },
}));

const jobsImg =
  "https://res.cloudinary.com/dtqbxfe7r/image/upload/v1721613144/7_sbslrl.svg";
const contentImg =
  "https://res.cloudinary.com/dtqbxfe7r/image/upload/v1721613144/8_rlkoly.svg";
const incomeImg =
  "https://res.cloudinary.com/dtqbxfe7r/image/upload/v1721999250/baht-income_1_a7xuzd.svg";
const teachersImg =
  "https://res.cloudinary.com/dtqbxfe7r/image/upload/v1721613143/5_aceftu.svg";
const userDashImg =
  "https://res.cloudinary.com/dtqbxfe7r/image/upload/v1721613144/6_mulphe.svg";

const createItems = (auth) => {
  return [
    { label: "Jobs", img: jobsImg, link: `/jobs` },
    { label: "Content", img: contentImg, link: `/content` },
    { label: "Incomes", img: incomeImg, link: `/income-directory` },
    { label: "Teachers", img: teachersImg, link: `/teachers` },
    {
      label: "Dashboard",
      img: userDashImg,
      link: auth?.isLoggedIn ? `/users/${auth.user?._id}` : "/auth",
    },
  ];
};

const SiteFeatures = ({ isLoading }) => {
  const auth = useContext(AuthContext);
  const { isDarkMode } = useThemeToggle();
  //arrange items in array of objects
  const items = createItems(auth);

  return (
    <StyledBoxWrapper>
      {isLoading ? (
        Array.from({ length: 5 }).map((_, i) => (
          <StyledCardBackground raised={false} key={i}>
            <Skeleton variant="rectangular" height={100} />
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                align="center"
                component="h3"
                variant="button"
                color="text.secondary"
                sx={{ textDecoration: "none" }}
              >
                <Skeleton variant="text" width={100} />
              </Typography>
            </CardContent>
          </StyledCardBackground>
        ))
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
            gap: "1rem",
            width: { xs: "100%", md: "60%" },
          }}
        >
          {items.map(({ label, img, link }, i) => {
            return (
              <Link component={RouterLink} key={i} to={link}>
                <StyledCardBackground
                  raised={false}
                  sx={{
                    "&:hover": {
                      boxShadow: isDarkMode
                        ? "0 4px 30px rgb(36 211 223 / 20%)"
                        : "0 4px 30px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={img}
                    alt={`${label}-card#-${i}`}
                  />
                  <Divider />
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      align="center"
                      component="h3"
                      color="text.secondary"
                      sx={{ fontWeight: 600 }}
                    >
                      {label}
                    </Typography>
                  </CardContent>
                </StyledCardBackground>
              </Link>
            );
          })}
        </Box>
      )}
    </StyledBoxWrapper>
  );
};

export default SiteFeatures;
