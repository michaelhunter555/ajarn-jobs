import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";

export const StyledUserJobsDiv = styled("div")(({ theme }) => ({
  maxWidth: "100%",
  margin: "0 auto 3rem",
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "15px",
  [theme.breakpoints.down("md")]: {
    maxWidth: "100%",
    gridTemplateColumns: "100%",
    gridAutoColumns: "auto",
  },
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
    gridTemplateColumns: "100%",
    gridAutoColumns: "auto",
  },
}));

export const StyledAdJobDiv = styled("div")(({ theme }) => ({
  display: "grid",
  gridColumn: "2 /4",
  textalign: "center",
  margin: "0 auto",
  [theme.breakpoints.down("md")]: {
    gridColumn: 1,
    gridRow: 1,
  },
  [theme.breakpoints.down("sm")]: {
    gridColumn: 1,
    gridRow: 1,
  },
}));

export const UsersJobFilterDiv = styled("div")(({ theme }) => ({
  gridColumn: "1 / 2",
  [theme.breakpoints.down("md")]: {
    gridColumn: 1,
    gridRow: 2,
  },
  [theme.breakpoints.down("sm")]: {
    gridColumn: 1,
    gridRow: 2,
  },
}));

export const UserJobListDiv = styled("div")(({ theme }) => ({
  gridColumn: "2 / 4",
  [theme.breakpoints.down("md")]: {
    gridColumn: 1,
    gridRow: 4,
  },
  [theme.breakpoints.down("sm")]: {
    gridColumn: 1,
    gridRow: 4,
  },
}));

export const FeaturedJobListDiv = styled("div")(({ theme }) => ({
  gridColumn: "4 / 5",
  [theme.breakpoints.down("md")]: {
    gridColumn: 1,
    gridRow: 3,
  },
  [theme.breakpoints.down("sm")]: {
    gridColumn: 1,
    gridRow: 3,
  },
}));

export const StyledChip = styled(Chip)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    fontSize: 11,
    borderRadius: "15px",
  },
}));
