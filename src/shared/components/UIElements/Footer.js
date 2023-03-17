import React from "react";

// const footerStyles = {
//   root: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     width: "100%",
//     border: "1px solid #dddddd",
//     borderRadius: "6px 6px 0px 0px",
//     position: "fixed",
//     bottom: 0,
//   },
//   gridItem: {},
// };

const Copyright = (props) => {
  const date = new Date();

  return `AjarnJobs.com ©${date.getFullYear()}`;
};

const Footer = () => {
  return <Copyright />;
};

export default Footer;
