import React, { useContext } from "react";

import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import ArticleIcon from "@mui/icons-material/Article";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import SettingsIcon from "@mui/icons-material/Settings";
import WorkIcon from "@mui/icons-material/Work";
import {
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { AuthContext } from "../../shared/context/auth-context";

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
    icon: <WorkIcon />,
    componentName: "job-listings",
  },
  {
    text: "Applications",
    icon: <HistoryEduIcon />,
    componentName: "applications",
  },
  {
    text: "My Resume",
    icon: <ArticleIcon />,
    componentName: "resume",
  },
  {
    text: "Settings",
    icon: <SettingsIcon />,
    componentName: "settings",
  },
  {
    text: "Creator Profile",
    icon: <AddBusinessIcon />,
    componentName: "creator",
  },
  {
    text: "Log out",
    icon: <DashboardIcon />,
    componentName: "logout",
  },
];

const Sidebar = ({ onMenuItemClick }) => {
  const { user } = useContext(AuthContext);
  const userType = user.userType;

  const handleSidebarClick = (componentName) => {
    onMenuItemClick(componentName);
    console.log(componentName);
  };

  const filteredSidebar = menuItems.filter((val) => {
    if (val.componentName === "creator" && userType === "teacher") {
      return false;
    }

    if (val.componentName === "applications" && userType === "employer") {
      return false;
    }
    return true;
  });

  return (
    <HorizontalSideBar elevated="true">
      <List>
        {filteredSidebar.map((item, i) => (
          <React.Fragment key={i}>
            <ListItemButton
              onClick={() => handleSidebarClick(item.componentName)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
            {i - filteredSidebar.length - 1 && <Divider light />}
          </React.Fragment>
        ))}
      </List>
    </HorizontalSideBar>
  );
};

export default Sidebar;
