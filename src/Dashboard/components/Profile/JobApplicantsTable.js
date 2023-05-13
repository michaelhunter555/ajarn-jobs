import React, { useContext, useEffect } from "react";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import ErrorModal from "../../../shared/components/UIElements/ErrorModal";
import { AuthContext } from "../../../shared/context/auth-context";
import { useJob } from "../../../shared/hooks/jobs-hook";

const tableRows = [
  {
    text: "Name",
    variant: "button",
    color: "text.secondary",
    style: { fontWeight: 700 },
  },
  {
    text: "Nationality",
    variant: "button",
    color: "text.secondary",
    style: { fontWeight: 700 },
  },
  {
    text: "Location",
    variant: "button",
    color: "text.secondary",
    style: { fontWeight: 700 },
  },
  {
    text: "Work Exp.",
    variant: "button",
    color: "text.secondary",
    style: { fontWeight: 700 },
  },
  {
    text: "Resume",
    variant: "button",
    color: "text.secondary",
    style: { fontWeight: 700 },
  },
];

const JobApplicantsTable = () => {
  const auth = useContext(AuthContext);
  const { user } = auth;
  const { jobs, getJobsByUserId, isLoading, error, clearError } = useJob();

  useEffect(() => {
    getJobsByUserId(user?._id);
  }, [getJobsByUserId, user]);

  const hasApplicants = jobs?.some((job) => job?.applicants?.length > 0);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <TableContainer>
        <Table>
          <TableHead>
            {tableRows?.map((item, i) => (
              <TableCell key={i}>
                <Typography
                  color={item.color}
                  variant={item.variant}
                  sx={item.style}
                >
                  {item.text}
                </Typography>
              </TableCell>
            ))}
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <Box sx={{ display: "flex", width: "100%" }}>Loading...</Box>
                </TableCell>
              </TableRow>
            ) : !isLoading && !hasApplicants ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <Typography>No applicants yet! Check back later.</Typography>
                </TableCell>
              </TableRow>
            ) : (
              jobs?.applicants?.map((teacher, i) => (
                <TableRow key={teacher?._id}>
                  <TableCell>{teacher?.name}</TableCell>
                  <TableCell>{teacher?.location}</TableCell>
                  <TableCell>{teacher?.salary}</TableCell>
                  <TableCell>{teacher?.hours}</TableCell>
                  <TableCell>{teacher?.applicants?.length}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default JobApplicantsTable;
