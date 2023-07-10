import React from "react";

import { Box, Tab, Tabs } from "@mui/material";

const creatorMenuItems = [
  {
    text: "Applicants",
    renderData: "applicants",
  },
  {
    text: "my Jobs",
    renderData: "jobs",
  },
  {
    text: "Get Credits",
    renderData: "credits",
  },
  {
    text: "Create Job",
    renderData: "createJob",
  },
];

const CreatorTabs = ({ onTabChange, addCredits }) => {
  const handleTabChange = (event, newValue) => {
    onTabChange(creatorMenuItems[newValue].renderData);
  };

  const selectedTab = creatorMenuItems.findIndex(
    (item) => item.renderData === addCredits
  );

  return (
    <Box
      sx={{ width: "100%", bgcolor: "background.paper", margin: "1rem auto" }}
    >
      <Tabs
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        value={selectedTab}
        onChange={handleTabChange}
      >
        {creatorMenuItems.map((item, i) => (
          <Tab key={i} label={item.text} />
        ))}
      </Tabs>
    </Box>
  );
};

export default CreatorTabs;
