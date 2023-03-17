import "./NavLinks.css";

import React, { useContext } from "react";

import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact="true">
          Home
        </NavLink>
      </li>

      <li>
        <NavLink to="/jobs">Jobs</NavLink>
      </li>

      <li>
        <NavLink to="/users">Users</NavLink>
      </li>

      <li>
        <NavLink to="/job/new">Add Job</NavLink>
      </li>

      <li>
        <NavLink to="/auth">Login</NavLink>
      </li>

      <li>
        <button onClick={auth.logout}>Logout</button>
      </li>
    </ul>
  );
};

export default NavLinks;
