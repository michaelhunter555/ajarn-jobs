import React, { useContext } from "react";

import { Link as RouterLink } from "react-router-dom";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
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

const ModernFeatureCard = styled(Card)(({ theme }) => ({
  margin: "0.5rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  minWidth: 200,
  borderRadius: theme.spacing(3),
  background: theme.palette.mode === "dark"
    ? "rgba(255, 255, 255, 0.08)"
    : "rgba(255, 255, 255, 0.15)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: theme.palette.mode === "dark"
    ? "1px solid rgba(255, 255, 255, 0.2)"
    : "1px solid rgba(255, 255, 255, 0.3)",
  boxShadow: theme.palette.mode === "dark"
    ? `
        0 8px 32px rgba(0, 0, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.1),
        inset 0 -1px 0 rgba(255, 255, 255, 0.05)
      `
    : `
        0 8px 32px rgba(0, 0, 0, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.5),
        inset 0 -1px 0 rgba(255, 255, 255, 0.1)
      `,
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: theme.palette.mode === "dark"
      ? `
          0 12px 40px rgba(0, 0, 0, 0.4),
          inset 0 1px 0 rgba(255, 255, 255, 0.15)
        `
      : `
          0 12px 40px rgba(0, 0, 0, 0.15),
          inset 0 1px 0 rgba(255, 255, 255, 0.6)
        `,
  },
  [theme.breakpoints.down("md")]: {
    minWidth: 160,
  },
  [theme.breakpoints.down("sm")]: {
    minWidth: 140,
  },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 120,
  objectFit: "contain",
  padding: theme.spacing(2),
}));

const FeatureChip = styled(Chip)(({ theme }) => ({
  border: `2px solid ${theme.palette.primary.main}`,
  color: theme.palette.primary.main,
  backgroundColor: "transparent",
  fontWeight: 600,
  fontSize: "14px",
  height: 32,
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
    { 
      label: "Jobs", 
      emoji: "💼",
      description: "Find your dream job",
      img: jobsImg, 
      link: `/jobs` 
    },
    { 
      label: "Content", 
      emoji: "📝",
      description: "Read & share insights",
      img: contentImg, 
      link: `/content` 
    },
    { 
      label: "Incomes", 
      emoji: "💰",
      description: "Salary transparency",
      img: incomeImg, 
      link: `/income-directory` 
    },
    { 
      label: "Teachers", 
      emoji: "👨‍🏫",
      description: "Connect with educators",
      img: teachersImg, 
      link: `/teachers` 
    },
    {
      label: "Dashboard",
      emoji: "📊",
      description: "Manage your profile",
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
          <ModernFeatureCard key={i}>
            <Skeleton variant="rectangular" height={120} />
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                p: 2,
              }}
            >
              <Skeleton variant="text" width={100} height={24} />
              <Skeleton variant="text" width={80} height={20} />
            </CardContent>
          </ModernFeatureCard>
        ))
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: "1.5rem",
            width: "100%",
            overflowX: "auto",
            pb: 1,
          }}
        >
          {items.map(({ label, emoji, description, img, link }, i) => {
            return (
              <Link 
                component={RouterLink} 
                key={i} 
                to={link}
                sx={{ textDecoration: "none" }}
              >
                <ModernFeatureCard>
                  <StyledCardMedia
                    component="img"
                    image={img}
                    alt={`${label}-feature-card`}
                  />
                  <Divider sx={{ mx: 2 }} />
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      p: 2,
                      gap: 1,
                    }}
                  >
                    <FeatureChip
                      label={`${emoji} ${label}`}
                      size="small"
                    />
                    <Typography
                      align="center"
                      variant="body2"
                      color="text.secondary"
                      sx={{ 
                        fontWeight: 500,
                        fontSize: "12px",
                        opacity: 0.8
                      }}
                    >
                      {description}
                    </Typography>
                  </CardContent>
                </ModernFeatureCard>
              </Link>
            );
          })}
        </Box>
      )}
    </StyledBoxWrapper>
  );
};

export default SiteFeatures;
