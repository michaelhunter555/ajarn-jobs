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
    minWidth: 100,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    },
  },
  box: {
    display: "flex",
    margin: "0 0 1rem 0",
    flexDirection: "row",
    justifyContent: "center",
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
  return (
    <Box sx={{ ...stylesSiteFeatures.box, ...stylesSiteFeatures.boxContainer }}>
      <Card
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
            <WorkIcon sx={{ ...stylesSiteFeatures.iconBox }} />
            Jobs
          </Typography>
        </CardContent>
      </Card>
      <Card
        sx={{ ...stylesSiteFeatures.background, ...stylesSiteFeatures.card }}
        raised={true}
      >
        <CardContent>
          <Typography
            sx={{ ...stylesSiteFeatures.text }}
            variant="subtitle1"
            color="text.secondary"
          >
            <SchoolIcon sx={{ ...stylesSiteFeatures.iconBox }} />
            Schools
          </Typography>
        </CardContent>
      </Card>
      <Card
        sx={{ ...stylesSiteFeatures.background, ...stylesSiteFeatures.card }}
        raised={true}
      >
        <CardContent>
          <Typography
            sx={{ ...stylesSiteFeatures.text }}
            variant="subtitle1"
            color="text.secondary"
          >
            <TempleBuddhistIcon sx={{ ...stylesSiteFeatures.iconBox }} />
            Thai Life
          </Typography>
        </CardContent>
      </Card>
      <Card
        sx={{ ...stylesSiteFeatures.background, ...stylesSiteFeatures.card }}
        raised={true}
      >
        <CardContent>
          <Typography
            sx={{ ...stylesSiteFeatures.text }}
            variant="subtitle1"
            color="text.secondary"
          >
            <QuizIcon sx={{ ...stylesSiteFeatures.iconBox }} />
            Skills Tests
          </Typography>
        </CardContent>
      </Card>
      <Card
        sx={{ ...stylesSiteFeatures.background, ...stylesSiteFeatures.card }}
        raised={true}
      >
        <CardContent>
          <Typography
            sx={{ ...stylesSiteFeatures.text }}
            variant="subtitle1"
            color="text.secondary"
          >
            <ChatIcon sx={{ ...stylesSiteFeatures.iconBox }} />
            Interviews
          </Typography>
        </CardContent>
      </Card>
      <Card
        sx={{ ...stylesSiteFeatures.background, ...stylesSiteFeatures.card }}
        raised={true}
      >
        <CardContent>
          <Typography
            sx={{ ...stylesSiteFeatures.text }}
            variant="subtitle1"
            color="text.secondary"
          >
            <VolunteerActivismIcon sx={{ ...stylesSiteFeatures.iconBox }} />
            Contribute
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SiteFeatures;
