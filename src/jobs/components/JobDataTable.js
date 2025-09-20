import React, { useContext } from "react";

import { Link } from "react-router-dom";

import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { AuthContext } from "../../shared/context/auth-context";

const ModernCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  background: theme.palette.mode === "dark"
    ? "rgba(255, 255, 255, 0.08)"
    : "rgba(255, 255, 255, 0.15)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: theme.palette.mode === "dark"
    ? "1px solid rgba(255, 255, 255, 0.2)"
    : "1px solid rgba(255, 255, 255, 0.3)",
  boxShadow: theme.palette.mode === "dark"
    ? `
        0 8px 32px rgba(0, 0, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.1),
        inset 0 -1px 0 rgba(255, 255, 255, 0.05)
      `
    : `
        0 8px 32px rgba(0, 0, 0, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.5),
        inset 0 -1px 0 rgba(255, 255, 255, 0.1)
      `,
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.palette.mode === "dark"
      ? `
          0 12px 40px rgba(0, 0, 0, 0.4),
          inset 0 1px 0 rgba(255, 255, 255, 0.15)
        `
      : `
          0 12px 40px rgba(0, 0, 0, 0.15),
          inset 0 1px 0 rgba(255, 255, 255, 0.6)
        `,
  },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: "transparent",
  borderRadius: theme.spacing(2),
  "& .MuiTable-root": {
    background: "transparent",
  },
  "& .MuiTableCell-root": {
    borderBottom: `1px solid ${theme.palette.divider}`,
    background: "transparent",
  },
}));

const ApplyChip = styled(Chip)(({ theme }) => ({
  background: "linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)",
  color: "white",
  fontWeight: 600,
  "&:hover": {
    background: "linear-gradient(45deg, #1976d2 30%, #2196f3 90%)",
    transform: "scale(1.05)",
  },
  transition: "all 0.3s ease-in-out",
}));

const JobDataTable = (props) => {
  const auth = useContext(AuthContext);
  const { jobSpecifications, appliedAlready } = props;

  return (
    <ModernCard>
      <CardContent sx={{ p: 0 }}>
        <StyledTableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    borderBottom: "none",
                  }}
                >
                  <Chip
                    icon={<ArrowCircleDownIcon sx={{ width: "15px" }} />}
                    label="📋 Job Specifications"
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell
                  sx={{
                    borderBottom: "none",
                    textAlign: "right",
                  }}
                >
                  {auth.isLoggedIn && (
                    <ApplyChip
                      disabled={appliedAlready}
                      clickable={true}
                      component={Button}
                      sx={{ margin: "0 auto" }}
                      onClick={props.modal}
                      label={appliedAlready ? "✅ Applied" : "🚀 Apply Now"}
                    />
                  )}
                  {!auth.isLoggedIn && (
                    <Chip
                      color="primary"
                      clickable={true}
                      component={Link}
                      sx={{ margin: "0 auto" }}
                      to="/auth"
                      label="🔐 Login/Sign-up"
                      variant="outlined"
                    />
                  )}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobSpecifications?.map(({ text, icon, data }, i) => (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
                      <Box sx={{ 
                        p: 0.5, 
                        borderRadius: "50%", 
                        backgroundColor: "primary.main",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}>
                        {icon}
                      </Box>
                      <Typography variant="body2" color="text.primary" sx={{ fontWeight: 500 }}>
                        {text}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                      {data}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </CardContent>
    </ModernCard>
  );
};

export default JobDataTable;
