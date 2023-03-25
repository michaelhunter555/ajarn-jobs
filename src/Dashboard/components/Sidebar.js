import React from "react";

import { Link } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ListIcon from "@mui/icons-material/List";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const HorizontalSideBar = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  maxWidth: 250,
  background: "white",
}));

const menuItems = [
  {
    text: "Profile",
    icon: <DashboardIcon />,
    link: "",
  },
  {
    text: "Job Listings",
    icon: <ListIcon />,
    link: "",
  },
  {
    text: "Applications",
    icon: <DashboardIcon />,
    link: "",
  },
  {
    text: "Settings",
    icon: <DashboardIcon />,
    link: "",
  },
  {
    text: "Log out",
    icon: <DashboardIcon />,
    link: "",
  },
];

const Sidebar = (props) => {
  return (
    <HorizontalSideBar elevated={true}>
      <List>
        {menuItems.map((item, i) => (
          <ListItem key={i}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            {item.link !== "" && <Link to={item.link}>{item.text}</Link>}
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </HorizontalSideBar>
  );
};

export default Sidebar;
