import React, { useContext } from "react";

import { NavLink, useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";

import { AuthContext } from "../../context/auth-context";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  //const userId = useParams().uid

  const logoutHandler = () => {
    auth.logout();
    navigate("/");
  };

  return (
    <StyledNavLinks>
      <li>
        <NavLink to="/" exact="true">
          Home
        </NavLink>
      </li>

      <li>
        <NavLink to="/jobs">Jobs</NavLink>
      </li>

      <li>
        <NavLink to="/teachers">Teachers</NavLink>
      </li>

      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/users/${auth.user}`}>Dashboard</NavLink>
        </li>
      )}

      {auth.isLoggedIn && (
        <li>
          <NavLink to="/job/new">Add Job</NavLink>
        </li>
      )}

      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">Login</NavLink>
        </li>
      )}

      {auth.isLoggedIn && (
        <li>
          <button onClick={logoutHandler}>Logout</button>
        </li>
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
    border-color: #e4e4e4;
    border-radius: 6px;
    color: #292929;
  }
  button {
    cursor: pointer;
    border: 1px solid #292929;
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
    border: 1px solid black;
    color: black;
    background: white;
  }
  button:hover,
  button:active {
    background: #f8df00;
    color: #292929;
  }
`;
