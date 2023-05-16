import React, { useContext } from "react";

import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { Avatar, Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { AuthContext } from "../../context/auth-context";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  //const userId = useParams().uid

  const logoutHandler = () => {
    auth.logout();
    navigate("/");
  };

  return (
    <StyledNavLinks>
      <li>
        <NavLink to="/" exact="true">
          <Typography
            sx={{ fontWeight: location.pathname === "/" ? 700 : "inherit" }}
            variant="button"
            color="text.secondary"
          >
            Home
          </Typography>
        </NavLink>
      </li>

      <li>
        <NavLink to="/jobs">
          <Typography
            sx={{ fontWeight: location.pathname === "/jobs" ? 700 : "inherit" }}
            variant="button"
            color="text.secondary"
          >
            Jobs
          </Typography>
        </NavLink>
      </li>

      <li>
        <NavLink to="/teachers">
          <Typography
            sx={{
              fontWeight: location.pathname === "/teachers" ? 700 : "inherit",
            }}
            variant="button"
            color="text.secondary"
          >
            Teachers
          </Typography>
        </NavLink>
      </li>

      <li>
        <NavLink to="/blog">
          <Typography
            sx={{ fontWeight: location.pathname === "/blog" ? 700 : "inherit" }}
            variant="button"
            color="text.secondary"
          >
            Blog
          </Typography>
        </NavLink>
      </li>

      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/users/${auth.user?._id}`}>
            <Typography
              sx={{
                fontWeight:
                  location.pathname === `/users/${auth.user?._id}`
                    ? 700
                    : "inherit",
              }}
              variant="button"
              color="text.secondary"
            >
              Dashboard
            </Typography>
          </NavLink>
        </li>
      )}

      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">
            <Typography
              sx={{
                fontWeight: location.pathname === "/auth" ? 700 : "inherit",
              }}
              variant="button"
              color="text.secondary"
            >
              Login
            </Typography>
          </NavLink>
        </li>
      )}

      {auth.isLoggedIn && (
        <li>
          <Button onClick={logoutHandler}>
            <Typography variant="button" color="text.secondary">
              Logout
            </Typography>
          </Button>
        </li>
      )}
      {auth.isLoggedIn && (
        <Box>
          <Avatar
            alt={`${auth.user?._id}--${auth.user?.name}`}
            src={`${process.env.REACT_APP_IMAGE}${auth.user?.image}`}
          />
        </Box>
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

  li {
    margin: 1rem;
  }

  li a {
    color: rgb(0, 0, 0);
  }

  a {
    border: 1px solid transparent;
    color: #000;
    text-decoration: none;
    padding: 0.5rem;
  }

  a:hover,
  a:active,
  a:active {
    background: #f5f5f5;
    color: #292929;
  }

  button {
    cursor: pointer;
    color: #000;
    background: white;
    padding: 0.5rem;
    font: inherit;
  }

  button:focus {
    outline: none;
  }

  button:hover,
  button:active {
    background: #292929;
    color: white;
  }

  @media (min-width: 768px) {
    flex-direction: row;
  }

  li {
    margin: 0 0.5rem;
  }

  a {
    color: white;
    text-decoration: none;
  }

  button {
    color: black;
    background: white;
  }
  button:hover,
  button:active {
    background: #f8df00;
    color: #292929;
  }
`;
