import React, { useState } from "react";

import { Box, Tab, Tabs } from "@mui/material";

const menuItems = [
  {
    text: "Bio",
    renderData: "bio",
  },
  {
    text: "Skills",
    renderData: "skills",
  },
  {
    text: "Resume",
    renderData: "resume",
  },
  {
    text: "Education",
    renderData: "education",
  },
];

const ProfileTabs = ({ onTabChange }) => {
  const [value, setValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    onTabChange(menuItems[newValue].renderData);
  };

  return (
    <Box
      sx={{ width: "100%", bgcolor: "background.paper", margin: "1rem auto" }}
    >
      <Tabs value={value} onChange={handleTabChange} centered>
        {menuItems.map((item, i) => (
          <Tab key={i} label={item.renderData} />
        ))}
      </Tabs>
    </Box>
  );
};

export default ProfileTabs;
