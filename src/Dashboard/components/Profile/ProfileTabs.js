import React, { useState } from "react";

import { Box, Tab, Tabs } from "@mui/material";

const ProfileTabs = (props) => {
  const [value, setValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box
      sx={{ width: "100%", bgcolor: "background.paper", margin: "1rem auto" }}
    >
      <Tabs value={value} onChange={handleTabChange} centered>
        <Tab label="Bio" />
        <Tab label="Skills" />
        <Tab label="Resume" />
      </Tabs>
    </Box>
  );
};

export default ProfileTabs;
