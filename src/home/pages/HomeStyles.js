import { styled } from "@mui/material/styles";

export const StyledGridContainer = styled("div")(({ theme }) => ({
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  margin: "1.5rem auto",
  alignItems: "center",
  width: "85%",
  gap: "15px",

  [theme.breakpoints.down("md")]: {
    // gridTemplateColumns: "1fr",
    // gridAutoColumns: "auto",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  [theme.breakpoints.down("sm")]: {
    // gridTemplateColumns: "1fr",
    // gridAutoColumns: "auto",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
}));

export const StyledHomeFeaturedTop = styled("div")(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.down("md")]: {
    // gridColumn: 1,
    // gridRow: 1,
    width: "100%",
  },
  [theme.breakpoints.down("sm")]: {
    // gridColumn: 1,
    // gridRow: 1,
    width: "100%",
  },
}));

export const StyledHomeFeaturedContent = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  gridColumn: "2/3",
  borderRadius: "15px",
  gap: "1rem",
  overflow: "auto",
  width: "100%",
  [theme.breakpoints.down("md")]: {
    // gridColumn: 1,
    // gridRow: 2,
    width: "100%",
  },
  [theme.breakpoints.down("sm")]: {
    // gridColumn: 1,
    // gridrow: 2,
    width: "100%",
  },
}));

export const StyledHomeFeaturedJobs = styled("div")(({ theme }) => ({
  textAlign: "center",
  boxShadow: "0 0 5px rgba(112, 180, 247, 0.5)",
  overflow: "auto",
  borderRadius: "5px",
  background: theme.palette.background.paper,
  [theme.breakpoints.down("md")]: {
    // gridColumn: 1,
    // gridRow: 3,
    width: "100%",
  },
  [theme.breakpoints.down("sm")]: {
    // gridColumn: 1,
    // gridRow: 3,
    width: "100%",
  },
}));

export const StyledHomeFeaturedContentList = styled("div")(({ theme }) => ({
  textAlign: "center",
  boxShadow: "0 0 5px rgba(112, 180, 247, 0.5)",
  overflow: "auto",
  borderRadius: "5px",
  background: theme.palette.background.paper,
  [theme.breakpoints.down("md")]: {
    // gridcolumn: 1,
    // gridRow: 4,
    width: "100%",
  },
  [theme.breakpoints.down("sm")]: {
    // gridColumn: 1,
    // gridRow: 4,
    width: "100%",
  },
}));

export const StyledUrgentJobsWrapper = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    // gridColumn: 1,
    // gridRow: 5,
    width: "100%",
  },
  [theme.breakpoints.down("sm")]: {
    // gridColumn: 1,
    // gridRow: 5,
    width: "100%",
  },
}));

export const StyledTeflWrapper = styled("div")(({ theme }) => ({
  height: "100%",
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  alignItems: "stretch",

  [theme.breakpoints.down("md")]: {
    // gridColumn: 1,
    // gridRow: 6,
    width: "100%",
  },
  [theme.breakpoints.down("sm")]: {
    // gridColumn: 1,
    // gridRow: 6,
    width: "100%",
  },
}));
