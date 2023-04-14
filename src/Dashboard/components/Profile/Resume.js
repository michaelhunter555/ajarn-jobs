import React, { useState } from 'react';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
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
} from '@mui/material';

import {
  DUMMY_USERS_LIST,
  SINGLE_DUMMY_USERS,
} from '../../../shared/util/DummyUsers';

//create data
const createData = (
  company,
  schoolName,
  location,
  from,
  to,
  jobTitle,
  role
) => {
  return {
    company,
    schoolName,
    location,
    from,
    to,
    jobTitle,
    role,
  };
};

export const Row = (props) => {
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
                Role - {row.jobTitle}
              </Typography>
              <Table size="small" aria-label="role">
                <TableHead>
                  <TableRow>
                    <TableCell>{row.role}</TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export const CollapsibleTable = (props) => {
  const { isSingleUser, teacherResume } = props;
  const { resume } = SINGLE_DUMMY_USERS[0];

  const singleResume = resume.map((item, i) =>
    createData(
      item.company,
      item.schoolName,
      item.location,
      item.from,
      item.to,
      item.jobTitle,
      item.role
    )
  );

  const resumeData =
    teacherResume || (isSingleUser ? singleResume : DUMMY_USERS_LIST);

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
          {resumeData.map((row, i) => (
            <Row key={i} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
