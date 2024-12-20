import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import { CardMedia } from "@mui/material";
import { styled } from "@mui/material/styles";

import { useThemeToggle } from "../../context/theme-context";
import Backdrop from "../UIElements/Backdrop";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";

const ajarnJobsDark =
  "https://res.cloudinary.com/dtqbxfe7r/image/upload/v1721613414/Aharnaroi-dark_ca4sso.svg";
const ajarnJobsLight =
  "https://res.cloudinary.com/dtqbxfe7r/image/upload/v1721613414/Aharnaroi_hrx5qw.svg";

const MainNavigation = (props) => {
  const [navIsScrolled, setNavIsScrolled] = useState(false);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const { isDarkMode } = useThemeToggle();

  const navScrollHandler = () => {
    if (window.scrollY >= 100) {
      setNavIsScrolled(true);
    } else {
      setNavIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", navScrollHandler);
    return () => {
      window.removeEventListener("scroll", navScrollHandler);
    };
  }, []);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer
        onKeyDown={closeDrawerHandler}
        show={drawerIsOpen}
        onClick={closeDrawerHandler}
      >
        <MainNavigationDrawer>
          <NavLinks />
        </MainNavigationDrawer>
      </SideDrawer>

      <MainHeader navIsScrolled={navIsScrolled}>
        <MainNavigationButtonStyles onClick={openDrawerHandler}>
          <MenuIcon style={{ fontSize: "2rem", color: "#128cb1" }} />
        </MainNavigationButtonStyles>
        <MainNavTitleStyle>
          <MainNavigationTitleStyle to="/">
            <CardMedia
              sx={{
                height: navIsScrolled ? 25 : 45,
                width: navIsScrolled ? 125 : 200,
                margin: "0 5rem",
              }}
              component="img"
              image={isDarkMode ? ajarnJobsDark : ajarnJobsLight}
              alt="Ajarn-jobs"
            />
          </MainNavigationTitleStyle>
        </MainNavTitleStyle>
        <MainNavigationHeader>
          <NavLinks />
        </MainNavigationHeader>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;

const MainNavigationButtonStyles = styled("button")`
  width: 3rem;
  height: 3rem;
  background-color: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-right: 2rem;
  cursor: pointer;

  span {
    display: block;
    width: 3rem;
    height: 2.5px;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

const MainNavigationTitleStyle = styled(Link)`
  text-decoration: none;
  color: rgb(0, 0, 0);
  padding: 0 2rem;
`;

const MainNavTitleStyle = styled("h1")`
  color: rgb(132, 86, 86);
`;

const MainNavigationHeader = styled("nav")`
  display: none;

  @media (min-width: 768px) {
    display: block;
    margin: 0 7rem 0 0;
  }
`;
const MainNavigationDrawer = styled("nav")`
  height: 100%;
  margin: 1rem auto;
`;
