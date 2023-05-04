import React, { useState } from "react";

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

const CreatorTabs = ({ onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    onTabChange(creatorMenuItems[newValue].renderData);
  };
  return (
    <Box
      sx={{ width: "100%", bgcolor: "background.paper", margin: "1rem auto" }}
    >
      <Tabs value={selectedTab} onChange={handleTabChange} centered>
        {creatorMenuItems.map((item, i) => (
          <Tab key={i} label={item.text} />
        ))}
      </Tabs>
    </Box>
  );
};

export default CreatorTabs;
