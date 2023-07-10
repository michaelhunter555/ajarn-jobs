import React, { useContext, useState } from "react";

import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import ArticleIcon from "@mui/icons-material/Article";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import SettingsIcon from "@mui/icons-material/Settings";
import WorkIcon from "@mui/icons-material/Work";
import {
  BottomNavigation,
  BottomNavigationAction,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { AuthContext } from "../../shared/context/auth-context";

const VerticalSideBar = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  maxHeight: 310,
  borderRadius: 10,
  maxWidth: 250,
  background: "white",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const StyledBottomNav = styled(BottomNavigation)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "1rem",
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
    text: "Cover Letter",
    icon: <WorkIcon />,
    componentName: "cover-letter",
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
  const userType = user?.userType;

  const handleSidebarClick = (componentName) => {
    onMenuItemClick(componentName);
  };

  //filter out what each userType needs and doesn't need
  //user can always switch userType, but if created creator account, must delete it first to go from employer to teacher.
  const filteredSidebar = menuItems.filter((val) => {
    if (val.componentName === "creator" && userType === "teacher") {
      return false;
    }

    if (val.componentName === "job-listings" && userType === "teacher") {
      return false;
    }

    if (val.componentName === "applications" && userType === "employer") {
      return false;
    }

    if (val.componentName === "cover-letter" && userType === "employer") {
      return false;
    }

    if (val.componentName === "resume" && userType === "employer") {
      return false;
    }
    return true;
  });

  return (
    <VerticalSideBar elevated="true">
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
    </VerticalSideBar>
  );
};

export default Sidebar;

export const BottomMobileNav = ({ onMenuItemClick }) => {
  const { user } = useContext(AuthContext);
  const userType = user?.userType;
  const [value, setValue] = useState(0); // Add a state for the selected tab

  const filteredSidebar = menuItems.filter((val) => {
    if (val.componentName === "creator" && userType === "teacher") {
      return false;
    }

    if (val.componentName === "job-listings" && userType === "teacher") {
      return false;
    }

    if (val.componentName === "applications" && userType === "employer") {
      return false;
    }

    if (val.componentName === "cover-letter" && userType === "employer") {
      return false;
    }

    if (val.componentName === "resume" && userType === "employer") {
      return false;
    }

    if (val.componentName === "logout") {
      return false;
    }
    return true;
  });

  const handleSidebarClick = (componentName, index) => {
    setValue(index); // Set the selected tab
    onMenuItemClick(componentName);
  };

  return (
    <StyledBottomNav
      value={value}
      onChange={(event, newValue) => setValue(newValue)}
    >
      {filteredSidebar.map((mobileItem, i) => (
        <BottomNavigationAction
          sx={{ opacity: 1 }}
          label={mobileItem.text}
          icon={mobileItem.icon}
          value={i}
          onClick={() => handleSidebarClick(mobileItem.componentName, i)}
          key={i}
        />
      ))}
    </StyledBottomNav>
  );
};
