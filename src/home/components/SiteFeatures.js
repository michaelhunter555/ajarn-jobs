import React, { useContext } from "react";

import { Link as RouterLink } from "react-router-dom";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Link,
  Skeleton,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import Content from "../../assets/content.png";
import Incomes from "../../assets/incomes.png";
import Jobs from "../../assets/jobs.png";
import Teachers from "../../assets/teachers.png";
import UserDash from "../../assets/userdash.png";
import { AuthContext } from "../../shared/context/auth-context";

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
  gap: "1rem",
  flexDirection: "column",
  justifyContent: "flex-start",
  minWidth: 170,
  borderRadius: "6px",
  "&:hover": {
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  },
  [theme.breakpoints.down("md")]: {
    minWidth: 120,
  },
  [theme.breakpoints.down("sm")]: {
    minWidth: 100,
  },
}));

const SiteFeatures = ({ isLoading }) => {
  const auth = useContext(AuthContext);
  //arrange items in array of objects
  const items = [
    { label: "Jobs", img: Jobs, link: `/jobs` },
    { label: "Content", img: Content, link: `/content` },
    { label: "Incomes", img: Incomes, link: `/income-directory` },
    { label: "Teachers", img: Teachers, link: `/teachers` },
    {
      label: "Dashboard",
      img: UserDash,
      link: auth.isLoggedIn ? `/users/${auth.user?._id}` : "/auth",
    },
  ];
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
            flexDirection: "row",
            gap: "1rem",
          }}
        >
          {items.map(({ label, img, link }, i) => {
            return (
              <Link component={RouterLink} key={i} to={link}>
                <StyledCardBackground raised={false}>
                  <CardMedia
                    component="img"
                    image={img}
                    alt={`${label}-card#-${i}`}
                    sx={{ height: 105 }}
                  />
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
