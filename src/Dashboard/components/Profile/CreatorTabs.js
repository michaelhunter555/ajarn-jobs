import React from "react";

import { Box, Tab, Tabs } from "@mui/material";
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AddIcon from '@mui/icons-material/Add';

const creatorMenuItems = [
  {
    text: "Applicants",
    renderData: "applicants",
    icon: <PeopleIcon />,
  },
  {
    text: "my Jobs",
    renderData: "jobs",
    icon: <WorkIcon />,
  },
  {
    text: "Get Credits",
    renderData: "credits",
    icon: <MonetizationOnIcon />,
  },
  {
    text: "Create Job",
    renderData: "createJob",
    icon: <AddIcon />,
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
          <Tab key={i} label={item.text} iconPosition="start" icon={item.icon} />
        ))}
      </Tabs>
    </Box>
  );
};

export default CreatorTabs;
