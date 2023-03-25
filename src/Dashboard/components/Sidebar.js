import React from "react";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ListIcon from "@mui/icons-material/List";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const HorizontalSideBar = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  minHeight: "50vh",
  maxHeight: "50vh",
  maxWidth: 250,
  background: "white",
}));

const menuItems = [
  {
    text: "Profile",
    icon: <DashboardIcon />,
    componentName: "profile",
  },
  {
    text: "Job Listings",
    icon: <ListIcon />,
    componentName: "job-listings",
  },
  {
    text: "Applications",
    icon: <DashboardIcon />,
    componentName: "applications",
  },
  {
    text: "Settings",
    icon: <DashboardIcon />,
    componentName: "settings",
  },
  {
    text: "Log out",
    icon: <DashboardIcon />,
    componentName: "logout",
  },
];

const Sidebar = ({ onMenuItemClick }) => {
  const handleSidebarClick = (componentName) => {
    onMenuItemClick(componentName);
    console.log(componentName);
  };

  return (
    <HorizontalSideBar elevated="true">
      <List>
        {menuItems.map((item, i) => (
          <ListItemButton
            key={i}
            onClick={() => handleSidebarClick(item.componentName)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </HorizontalSideBar>
  );
};

export default Sidebar;
