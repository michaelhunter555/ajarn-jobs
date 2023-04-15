import React from "react";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const JobDataTable = (props) => {
  const { jobSpecifications } = props;
  return (
    <TableContainer>
      <Table sx={{ minWidth: 600 }} size="small">
        <TableHead>
          <TableRow>
            <TableCell>Job Specifications:</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobSpecifications.map(({ text, icon, data }, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                <Box display="flex" flexDirection="row" alignItems="center">
                  {icon} {text}
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
