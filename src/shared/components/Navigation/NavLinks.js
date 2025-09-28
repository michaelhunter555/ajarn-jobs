import React, { useContext } from "react";

import { NavLink, useLocation, useNavigate } from "react-router-dom";

import LightModeIcon from "@mui/icons-material/LightMode";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import {
  Avatar,
  Box,
  Link,
  ListItem,
  ListItemIcon,
  Tooltip,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { AuthContext } from "../../context/auth-context";
import { useThemeToggle } from "../../context/theme-context";

const NavLinks = (props) => {
  const { isDarkMode, toggleTheme } = useThemeToggle();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  //const userId = useParams().uid

  const logoutHandler = () => {
    auth.logout();
    navigate("/auth");
  };

  return (
    <StyledNavLinks>
      <ListItem>
        <NavLink to="/" exact="true">
          <Typography
            sx={{ fontWeight: location.pathname === "/" ? 700 : "inherit" }}
            variant="button"
          >
            Home
          </Typography>
        </NavLink>
      </ListItem>

      <ListItem>
        <NavLink to="/jobs">
          <Typography
            sx={{ fontWeight: location.pathname === "/jobs" ? 700 : "inherit" }}
            variant="button"
          >
            Jobs
          </Typography>
        </NavLink>
      </ListItem>

     {auth?.user?.userType === "employer" && <ListItem>
        <NavLink to="/teachers">
          <Typography
            sx={{
              fontWeight: location.pathname === "/teachers" ? 700 : "inherit",
            }}
            variant="button"
          >
            Teachers
          </Typography>
        </NavLink>
      </ListItem>}

      <ListItem>
        <NavLink to="/content">
          <Typography
            sx={{
              fontWeight: location.pathname === "/content" ? 700 : "inherit",
            }}
            variant="button"
          >
            Content
          </Typography>
        </NavLink>
      </ListItem>

      {auth.isLoggedIn && (
        <ListItem>
          <NavLink to={`/users/${auth.user?._id}`}>
            <Typography
              sx={{
                fontWeight:
                  location.pathname === `/users/${auth.user?._id}`
                    ? 700
                    : "inherit",
              }}
              variant="button"
            >
              Dashboard
            </Typography>
          </NavLink>
        </ListItem>
      )}

      {auth?.isLoggedIn && (
        <Box sx={{ marginRight: "15px" }}>
          <Avatar
            alt={`${auth.user?._id}--${auth.user?.name}`}
            src={`${auth.user?.image}`}
          />
        </Box>
      )}

      {auth.isLoggedIn && (
        <>
          <ListItem>
            <Tooltip title={`${isDarkMode ? "dark" : "light"} mode`}>
              <ListItemIcon
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  toggleTheme();
                }}
              >
                {isDarkMode ? (
                  <ModeNightIcon sx={{ color: "rgb(229 189 35 / 85%)" }} />
                ) : (
                  <LightModeIcon sx={{ color: "rgb(229 189 35 / 85%)" }} />
                )}
              </ListItemIcon>
            </Tooltip>
            <Link
              onClick={logoutHandler}
              sx={{
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
              }}
            >
              <Typography
                sx={{ fontSize: "11px" }}
                variant="subtitle2"
                fontWeight={700}
              >
                Logout
              </Typography>
            </Link>
          </ListItem>
        </>
      )}
      {!auth.isLoggedIn && (
        <ListItem>
          <Tooltip title={`${isDarkMode ? "dark" : "light"} mode`}>
            <ListItemIcon
              sx={{ cursor: "pointer" }}
              onClick={() => {
                toggleTheme();
              }}
            >
              {isDarkMode ? (
                <ModeNightIcon sx={{ color: "rgb(229 189 35 / 85%)" }} />
              ) : (
                <LightModeIcon sx={{ color: "rgb(229 189 35 / 85%)" }} />
              )}
            </ListItemIcon>
          </Tooltip>
          <NavLink to="/auth">
            <Typography
              sx={{
                fontWeight: location.pathname === "/auth" ? 700 : "inherit",
                fontSize: "11px",
              }}
              variant="subtitle2"
            >
              Login
            </Typography>
          </NavLink>

          <ListItemIcon>
            <MeetingRoomIcon />
          </ListItemIcon>
        </ListItem>
      )}
    </StyledNavLinks>
  );
};

export default NavLinks;

const StyledNavLinks = styled("ul")`
  list-style: none;
  margin: 0 auto;
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span:hover {
    cursor: pointer;
  }

  li {
    margin: 1rem;
  }

  li a {
    color: ${({ theme }) => theme.palette.text.primary};
  }

  a {
    border: 1px solid transparent;
    text-decoration: none;
    padding: 0.5rem;
    color: ${({ theme }) => theme.palette.text.primary};
  }

  a:hover,
  a:active {
    background: ${({ theme }) => theme.palette.background.paper};
    color: ${({ theme }) => theme.palette.text.secondary};
    border-radius: 10px;
  }

  button {
    cursor: pointer;
    color: ${({ theme }) => theme.palette.text.primary};
    background: ${({ theme }) => theme.palette.background.default};
    padding: 0.5rem;
    font: inherit;
  }

  button:focus {
    outline: none;
  }

  button:hover,
  button:active {
    background: ${({ theme }) => theme.palette.text.secondary};
    color: ${({ theme }) => theme.palette.text.primary};
  }

  @media (min-width: 768px) {
    flex-direction: row;
  }

  li {
    margin: 1rem 0.2rem;
  }

  button {
    color: ${({ theme }) => theme.palette.text.primary};
    background: ${({ theme }) => theme.palette.background.default};
  }
  button:hover,
  button:active {
    background: ${({ theme }) => theme.palette.text.secondary};
    color: ${({ theme }) => theme.palette.text.primary};
  }
`;
