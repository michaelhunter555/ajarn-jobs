import React from "react";

import ChatIcon from "@mui/icons-material/Chat";
import QuizIcon from "@mui/icons-material/Quiz";
import SchoolIcon from "@mui/icons-material/School";
import TempleBuddhistIcon from "@mui/icons-material/TempleBuddhist";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import WorkIcon from "@mui/icons-material/Work";
import { Box, Card, CardContent, Typography } from "@mui/material";

const stylesSiteFeatures = {
  background: {
    margin: "0.2rem",
    display: "flex",
    justifyContent: "center",
    "&:hover": {
      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    },
  },
  box: {
    minWidth: 100,
    display: "flex",
    margin: "0 0 1rem 0",
    flexDirection: "row",
    justifyContent: "center",
    gap: "1rem",
    overflowX: "auto",
  },
  text: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  iconBox: {
    border: "1px solid #e5e5e5",
    borderRadius: "5px",
    padding: "1rem",
    "&:hover": {
      transition: "all 0.3s ease-in",
      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    },
  },

  "@media(max-width: 959.95px)": {
    box: {
      display: "flex",
      flexDirection: "column",
    },
    card: {
      mindWidth: "unset",
    },
    cardFirst: {
      mindWidth: 100,
    },
  },
  "@media(max-width: 599.95px)": {
    cardFirst: {
      mindWidth: "unset",
    },
  },
};

const SiteFeatures = () => {
  let items = [
    "Jobs",
    "Schools",
    "Thai Life",
    "Skills Tests",
    "Interviews",
    "Contribute",
  ];
  return (
    <Box sx={{ ...stylesSiteFeatures.box }}>
      {items.map((item, i) => {
        let featuredIcons = [
          <WorkIcon sx={{ ...stylesSiteFeatures.iconBox }} />,
          <SchoolIcon sx={{ ...stylesSiteFeatures.iconBox }} />,
          <TempleBuddhistIcon sx={{ ...stylesSiteFeatures.iconBox }} />,
          <QuizIcon sx={{ ...stylesSiteFeatures.iconBox }} />,
          <ChatIcon sx={{ ...stylesSiteFeatures.iconBox }} />,
          <VolunteerActivismIcon sx={{ ...stylesSiteFeatures.iconBox }} />,
        ];
        return (
          <Card
            key={i}
            sx={{
              ...stylesSiteFeatures.background,
              ...stylesSiteFeatures.card,
              ...stylesSiteFeatures.cardFirst,
            }}
            raised={true}
          >
            <CardContent>
              <Typography
                sx={{ ...stylesSiteFeatures.text }}
                variant="subtitle1"
                color="text.secondary"
              >
                {featuredIcons[i]} {item}
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};

export default SiteFeatures;
