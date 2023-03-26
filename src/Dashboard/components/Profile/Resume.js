import React, { useState } from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

//create data
const createData = (company, schoolName, location, from, to, role) => {
  return {
    company,
    schoolName,
    location,
    from,
    to,
    role,
  };
};

const Row = (props) => {
  const [open, setOpen] = useState(false);
  const { row } = props;

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left">{row.company}</TableCell>
        <TableCell align="left">{row.schoolName}</TableCell>
        <TableCell align="left">{row.location}</TableCell>
        <TableCell align="left">{row.from}</TableCell>
        <TableCell align="left">{row.to}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Role
              </Typography>
              <Table size="small" aria-label="role">
                <TableHead>
                  <TableRow>
                    <TableCell>{row.role}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{row.role}</TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const rows = [
  createData(
    "Sine Education",
    "SKR",
    "Bangkok",
    "2006",
    "2008",
    "teach conversational English to young adults 17-23"
  ),
  createData(
    "Bright Future Int",
    "Biggs Academy",
    "Bangkok",
    "2006",
    "2008",
    "teach conversational English to young adults 17-23"
  ),
  createData(
    "Stamford University",
    "ECC",
    "Bangkok",
    "2006",
    "2008",
    "teach conversational English to young adults 17-23"
  ),
];

export const CollapsibleTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible-table">
        <TableHead sx={{ backgroundColor: "#e8f0f7" }}>
          <TableRow>
            <TableCell align="left">View Role</TableCell>
            <TableCell align="left">Company</TableCell>
            <TableCell align="left">School Name</TableCell>
            <TableCell align="left">Location</TableCell>
            <TableCell align="left">from</TableCell>
            <TableCell align="left">To</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
