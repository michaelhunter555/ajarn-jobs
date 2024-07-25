import * as React from "react";

import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

function createData(name, location, nationality, email, appliedFor) {
  return { name, location, nationality, email, appliedFor };
}

const rows = [
  createData(
    "Tiffany Thompson",
    "Bangkok",
    "American",
    "user@emailprovider.com",
    "Native English Teacher Position"
  ),
  createData(
    "John Doe",
    "New York",
    "American",
    "johndoe@email.com",
    "Your Language School"
  ),
  createData(
    "Jane Smith",
    "London",
    "British",
    "janesmith@email.com",
    "m1-m6 Native ESL Teacher"
  ),
  createData(
    "Carlos Rodriguez",
    "Madrid",
    "Spanish",
    "carlosr@email.com",
    "Curriculum Creation Specialist"
  ),
  createData(
    "Marie Curie",
    "Paris",
    "French",
    "mariecurie@email.com",
    "French Teacher for Highschool"
  ),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox size="small" />
            </TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Nationality</TableCell>
            <TableCell align="right">email</TableCell>
            <TableCell align="right">Applied For</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                <Checkbox size="small" />
              </TableCell>
              <TableCell component="th" scope="row">
                <Link sx={{ cursor: "pointer" }}>{row.name}</Link>
              </TableCell>
              <TableCell align="right">{row.location}</TableCell>
              <TableCell align="right">{row.nationality}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">
                <Link sx={{ cursor: "pointer" }}>{row.appliedFor}</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
