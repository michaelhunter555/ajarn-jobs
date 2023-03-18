import React from "react";

import ChatIcon from "@mui/icons-material/Chat";
import QuizIcon from "@mui/icons-material/Quiz";
import SchoolIcon from "@mui/icons-material/School";
import TempleBuddhistIcon from "@mui/icons-material/TempleBuddhist";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import WorkIcon from "@mui/icons-material/Work";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

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
    minWidth: "unset",
    paddingLeft: "7.5rem",
  },
  [theme.breakpoints.down("sm")]: {
    minWidth: "unset",
    paddingLeft: "22.5rem",
  },
}));

const StyledCardBackground = styled(Card)(({ theme }) => ({
  margin: "0.2rem",
  display: "flex",
  justifyContent: "center",
  minWidth: 150,
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

const IconBox = styled(Box)({
  border: "1px solid #e5e5e5",
  borderRadius: "5px",
  padding: "1rem",
  "&:hover": {
    transition: "all 0.3s ease-in",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  },
});

const SiteFeatures = () => {
  const items = [
    { label: "Jobs", icon: <WorkIcon /> },
    { label: "Schools", icon: <SchoolIcon /> },
    { label: "Thai Life", icon: <TempleBuddhistIcon /> },
    { label: "Skills Tests", icon: <QuizIcon /> },
    { label: "Interviews", icon: <ChatIcon /> },
    { label: "Contribute", icon: <VolunteerActivismIcon /> },
  ];

  return (
    <StyledBoxWrapper>
      {items.map(({ label, icon }, i) => {
        return (
          <StyledCardBackground key={i} raised={true}>
            <CardContent>
              <Typography
                align="center"
                variant="subtitle1"
                color="text.secondary"
              >
                <IconBox>{icon}</IconBox>
                {label}
              </Typography>
            </CardContent>
          </StyledCardBackground>
        );
      })}
    </StyledBoxWrapper>
  );
};

export default SiteFeatures;
