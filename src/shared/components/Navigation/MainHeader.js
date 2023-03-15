import "./MainHeader.css";

import React from "react";

const MainHeader = (props) => {
  return (
    <header className={`main-header`} style={props.navScroll}>
      {props.children}
    </header>
  );
};

export default MainHeader;
