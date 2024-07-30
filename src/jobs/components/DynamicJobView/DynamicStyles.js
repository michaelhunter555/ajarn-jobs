import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

export const StyledPaper = styled(Paper)(({ theme }) => ({
  position: "relative",
  height: "auto",
  objectFit: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  verticalAlign: "bottom",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

export const StyledBoxContent = styled(Box)(({ theme }) => ({
  // display: "flex",
  // justifyContent: "center",
  // alignItems: "center",
  // flexDirection: "column",
  margin: "0",
  padding: "0 1rem",
  height: "auto",
  [theme.breakpoints.down("md")]: {
    padding: 0,
  },
  [theme.breakpoints.down("sm")]: {
    padding: 0,
  },
}));

export const StyledContentGrid = styled(Box)(({ theme }) => ({
  overflowY: "scroll",
  display: "flex",
  gap: "5px",
  margin: "0rem auto",
  flexDirection: "column",
  borderRight: "1px solid #dedede",

  pointerEvents: "auto",
  "&::-webkit-scrollbar": {
    width: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "transparent",
    borderRadius: "0px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#8b8b8d",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
    borderRadius: "0px",
  },
  "&:hover": {
    "&::-webkit-scrollbar-thumb": {
      background: "#b5b5b5",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      transition: "background 1s ease-in",
      background: "#8b8b8d",
    },
    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },
  },
}));

export const StyledChip = styled(Chip)(({ theme }) => ({
  border: theme.palette.primary.main,
  backgroundColor: theme.palette.background.default,
}));
