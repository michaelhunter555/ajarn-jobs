import React, { useContext } from "react";

import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import {
  Box,
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { AuthContext } from "../../shared/context/auth-context";

const JobDataTable = (props) => {
  const authCtx = useContext(AuthContext);
  const { jobSpecifications } = props;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 600 }} size="small">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Chip label="Job Specifications" size="small" />
              <ArrowCircleDownIcon sx={{ width: "15px" }} />
            </TableCell>
            <TableCell
              sx={{
                borderBottom: "0",
                textAlign: "right",
              }}
            >
              {authCtx.isLoggedIn && (
                <Button
                  sx={{ margin: "0 auto" }}
                  onClick={() => console.log("modal")}
                  variant="contained"
                >
                  Apply Now
                </Button>
              )}
              {!authCtx.isLoggedIn && (
                <Button
                  sx={{ margin: "0 auto" }}
                  onClick={() => console.log("modal")}
                  variant="contained"
                >
                  Login/Sign-up
                </Button>
              )}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobSpecifications.map(({ text, icon, data }, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                <Box display="flex" flexDirection="row" alignItems="center">
                  <Typography variant="text" color="text.secondary">
                    {icon} {text}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>{data}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default JobDataTable;
