import React from "react";

import {
  FaClipboardList,
  FaClock,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaMoneyBill,
} from "react-icons/fa";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const JobRequirements = ({ jobSpecs, isLoading }) => {
  const jobSpecifications = [
    { text: "Location", icon: <FaMapMarkerAlt />, data: jobSpecs?.location },
    {
      text: "Requirements",
      icon: <FaGraduationCap />,
      data: jobSpecs?.requirements,
    },
    { text: "Salary", icon: <FaMoneyBill />, data: jobSpecs?.salary },
    {
      text: "Work Permit",
      icon: <FaClipboardList />,
      data: jobSpecs?.workPermit ? "✅" : "⛔",
    },
    { text: "Hours", icon: <FaClock />, data: jobSpecs?.hours },
  ];

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: 12 }}>Location</TableCell>
            <TableCell sx={{ fontSize: 12 }}>Requirements</TableCell>
            <TableCell sx={{ fontSize: 12 }}>Salary</TableCell>
            <TableCell sx={{ fontSize: 12 }}>Visa</TableCell>
            <TableCell sx={{ fontSize: 12 }}>Hours</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {jobSpecifications?.map((item, i) => (
              <TableCell sx={{ fontSize: 12 }} key={i}>
                {item.data}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default JobRequirements;
