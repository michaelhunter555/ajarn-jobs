import React, { useContext } from "react";

import { useNavigate } from "react-router-dom";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Divider, Link, Paper, Popper, Stack, Switch } from "@mui/material";

import { AuthContext } from "../../context/auth-context";
import { useThemeToggle } from "../../context/theme-context";

const UserSettingsPopper = ({ anchorEl, id, open }) => {
  const { isDarkMode, toggleTheme } = useThemeToggle();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout();
    navigate("/auth");
  };

  return (
    <Popper id={id} open={open} anchorEl={anchorEl}>
      <Paper elevation={2} sx={{ padding: "2rem" }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Stack>
            <Switch onChange={toggleTheme} />
          </Stack>
          <Stack>{isDarkMode ? <Brightness4Icon /> : <LightModeIcon />}</Stack>
        </Stack>
        <Divider />
        {auth.isLoggedIn && (
          <Link
            onClick={handleLogout}
            sx={{ textDecoration: "none", "&:hover": { cursor: "pointer" } }}
          >
            Logout
          </Link>
        )}
      </Paper>
    </Popper>
  );
};

export default UserSettingsPopper;
