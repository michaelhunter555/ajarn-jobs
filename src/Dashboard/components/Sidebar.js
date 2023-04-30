import React from "react";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ListIcon from "@mui/icons-material/List";
import {
  Divider,
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
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
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
    text: "My Resume",
    icon: <DashboardIcon />,
    componentName: "resume",
  },
  {
    text: "Settings",
    icon: <DashboardIcon />,
    componentName: "settings",
  },
  {
    text: "Creator Profile",
    icon: <DashboardIcon />,
    componentName: "creator",
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
          <React.Fragment key={i}>
            <ListItemButton
              onClick={() => handleSidebarClick(item.componentName)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
            {i - menuItems.length - 1 && <Divider light />}
          </React.Fragment>
        ))}
      </List>
    </HorizontalSideBar>
  );
};

export default Sidebar;
