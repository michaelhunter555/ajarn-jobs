import React from "react";

const mainHeaderStyles = {
  mainHeader: {
    width: "100%",
    height: "4rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "fixed",
    top: "0",
    left: "0",
    background: "#ffffff",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.26)",
    padding: "0 1rem",
    zIndex: "5",
    border: "1px solid transparent",
  },

  main: {
    marginTop: "5rem",
  },

  "@media (min-width: 768px)": {
    mainHeader: {
      justifyContent: "space-between",
    },
  },
};

const MainHeader = (props) => {
  return (
    <header
      style={{
        ...mainHeaderStyles.mainHeader,
        ...props.navScroll,
      }}
    >
      {props.children}
    </header>
  );
};

export default MainHeader;
