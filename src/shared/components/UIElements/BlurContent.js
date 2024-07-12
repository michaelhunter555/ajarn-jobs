import React from "react";

import { styled } from "@mui/material/styles";

const StyledBlur = styled("div")(({ theme }) => ({
  backdropFilter: "blur(10px)",
  backgroundColor: "rgba(255, 255, 255, 0.5)",
  borderRadius: "8px",
  padding: "10px",
}));

const ContentCardBlur = ({ children, shouldBlur }) => {
  return shouldBlur ? <StyledBlur>{children}</StyledBlur> : <>{children}</>;
};

export default ContentCardBlur;
