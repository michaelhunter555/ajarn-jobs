import React, { useContext } from "react";

import { Link } from "react-router-dom";

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
  const auth = useContext(AuthContext);
  const { jobSpecifications, appliedAlready } = props;

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Chip
                icon={<ArrowCircleDownIcon sx={{ width: "15px" }} />}
                label="Job Specifications"
                size="small"
              />
            </TableCell>
            <TableCell
              sx={{
                borderBottom: "0",
                textAlign: "right",
              }}
            >
              {auth.isLoggedIn && (
                // <Button
                //   sx={{ margin: "0 auto" }}
                //   onClick={props.modal}
                //   variant="contained"
                // >
                //   Apply Now
                // </Button>
                <Chip
                  disabled={appliedAlready}
                  color="primary"
                  clickable={true}
                  component={Button}
                  sx={{ margin: "0 auto" }}
                  onClick={props.modal}
                  label="Apply Now"
                />
              )}
              {!auth.isLoggedIn && (
                <Chip
                  color="primary"
                  clickable={true}
                  component={Link}
                  sx={{ margin: "0 auto" }}
                  to="/auth"
                  label="Login/Sign-up"
                  variant="outlined"
                />
                // <Button
                //   component={Link}
                //   sx={{ margin: "0 auto" }}
                //   to="/auth"
                //   variant="contained"
                // >
                //   Login/Sign-up
                // </Button>
              )}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobSpecifications?.map(({ text, icon, data }, i) => (
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
