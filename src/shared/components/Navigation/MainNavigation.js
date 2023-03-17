import "./MainNavigation.css";

import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Backdrop from "../UIElements/Backdrop";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";

const MainNavigation = (props) => {
  const [navIsScrolled, setNavIsScrolled] = useState(false);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

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

  const styles = {
    glass: {
      background: "rgba(255, 255, 255, 0.24)",
      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
      backdropFilter: "blur(5px)",
      WebkitBackdropFilter: "blur(5px)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
    },
    normal: {
      background: "white",
    },
  };

  return (
    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>

      <MainHeader navScroll={!navIsScrolled ? styles.normal : styles.glass}>
        <button
          className="main-navigation__menu-btn"
          onClick={openDrawerHandler}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">Ajarn Jobs</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
