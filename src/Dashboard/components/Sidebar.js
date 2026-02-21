import React, { useContext, useState } from "react";

import ArticleIcon from "@mui/icons-material/Article";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import MoreIcon from "@mui/icons-material/MoreVert";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SettingsIcon from "@mui/icons-material/Settings";
import WorkIcon from "@mui/icons-material/Work";
import {
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Divider,
  Fade,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { AuthContext } from "../../shared/context/auth-context";
import { useThemeToggle } from "../../shared/context/theme-context";

const VerticalSideBar = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  borderRadius: 10,
  maxWidth: "100%",
  background: theme.palette.background.paper,
  border: "1px solid rgb(88, 88, 88)",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const StyledBottomNav = styled(BottomNavigation)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    alignItems: "center",
    position: "fixed",
    justifyContent: "center",
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    zIndex: 11,
    marginTop: "1rem",
    padding: "0.5rem 0",
  },
}));

const menuItems = [
  {
    text: "Dash",
    icon: <DashboardIcon />,
    componentName: "profile",
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
    text: "My Content",
    icon: <NewspaperIcon />,
    componentName: "content",
  },
  {
    text: "Billing History",
    icon: <ReceiptLongIcon />,
    componentName: "invoices",
  },
  {
    text: "Recruit Offers",
    icon: <AutoAwesomeIcon />,
    componentName: "recruitment-offers",
  },
  {
    text: "Recruits",
    icon: <PersonSearchIcon />,
    componentName: "recruitment-sent",
  },
  {
    text: "Settings",
    icon: <SettingsIcon />,
    componentName: "settings",
  },
];

const Sidebar = ({ onMenuItemClick, notifications }) => {
  const { isDarkMode } = useThemeToggle();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { user } = useContext(AuthContext);
  const userType = user?.userType;

  const handleSidebarClick = (componentName, i) => {
    onMenuItemClick(componentName);
    setSelectedIndex(i);
  };

  //filter out what each userType needs and doesn't need
  //user can always switch userType, but if created creator account, must delete it first to go from employer to teacher.
  const filteredSidebar = menuItems.filter((val) => {
    if (val.componentName === "creator" && userType === "teacher") {
      return false;
    }

    if (val.componentName === "recruitment-offers" && userType === "employer") {
      return false;
    }

    if (val.componentName === "recruitment-sent" && userType === "teacher") {
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
    if (val.componentName === "invoices" && userType === "teacher") {
      return false;
    }
    return true;
  });

  return (
    <VerticalSideBar elevated="true">
      <Stack alignItems="center">
        <Typography sx={{ fontWeight: 600 }} color="text.secondary">
          Menu
        </Typography>
      </Stack>
      <List>
        {filteredSidebar.map((item, i) => (
          <React.Fragment key={i}>
            <ListItemButton
              selected={i === selectedIndex}
              onClick={() => handleSidebarClick(item.componentName, i)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={
                  item.text === "Recruit Offers" ? (
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography>{item.text}</Typography>
                      <IconButton
                        sx={{
                          fontSize: 12,
                          backgroundColor: isDarkMode ? "#b93c3c" : "#ffa2a2",
                        }}
                        size="small"
                      >
                        {notifications}
                      </IconButton>
                    </Stack>
                  ) : (
                    item.text
                  )
                }
              />
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
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const userType = user?.userType;
  const [value, setValue] = useState(0); // Add a state for the selected tab

  const filteredSidebar = menuItems.filter((val) => {
    if (val.componentName === "creator" && userType === "teacher") {
      return false;
    }
    if (val.componentName === "recruitment-offers" && userType === "employer") {
      return false;
    }

    if (val.componentName === "recruitment-sent" && userType === "teacher") {
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
    if (val.componentName === "invoices" && userType === "teacher") {
      return false;
    }
    return true;
  });

  const toggleMobileMoreHandler = (e) => {
    setOpen((prev) => !prev);
    setAnchorEl(e.currentTarget);
  };

  const visibleSidebarItems = filteredSidebar.slice(0, -4);
  const moreSidebarItems = filteredSidebar.slice(-4);

  const handleSidebarClick = (componentName, index) => {
    setValue(index); // Set the selected tab
    onMenuItemClick(componentName);
    setOpen(false);
  };

  return (
    <StyledBottomNav
      value={value}
      onChange={(event, newValue) => setValue(newValue)}
    >
      {userType === "employer" &&
        filteredSidebar.map((mobileItem, i) => (
          <BottomNavigationAction
            sx={{ opacity: 1 }}
            label={mobileItem.text}
            icon={mobileItem.icon}
            value={i}
            onClick={() => handleSidebarClick(mobileItem.componentName, i)}
            key={i}
          />
        ))}
      {userType === "teacher" &&
        visibleSidebarItems.map((mobileItem, i) => (
          <BottomNavigationAction
            sx={{ opacity: 1 }}
            label={mobileItem.text}
            icon={mobileItem.icon}
            value={i}
            onClick={() => handleSidebarClick(mobileItem.componentName, i)}
            key={i}
          />
        ))}
      {userType === "teacher" && (
        <Stack>
          <Button size="small" onClick={toggleMobileMoreHandler}>
            <MoreIcon />
          </Button>
          <Popper open={open} placement="top-start" anchorEl={anchorEl}>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper style={{ opacity: 1, visibility: "visible" }}>
                  <Stack direction="column">
                    {moreSidebarItems.map((mobileItem, i) => (
                      <ListItemButton
                        sx={{ zIndex: 11 }}
                        selected={i === value}
                        onClick={() =>
                          handleSidebarClick(mobileItem.componentName, i)
                        }
                        key={i}
                      >
                        <ListItemIcon>{mobileItem.icon}</ListItemIcon>
                        <ListItemText primary={mobileItem.text} />
                      </ListItemButton>
                    ))}
                  </Stack>
                </Paper>
              </Fade>
            )}
          </Popper>
        </Stack>
      )}
    </StyledBottomNav>
  );
};
