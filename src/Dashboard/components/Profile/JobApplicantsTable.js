import React, { useContext } from "react";

import { Link } from "react-router-dom";

import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";

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
  const { isLoading, error, clearError, client } = useJob();

  const { data: jobsByUser } = useQuery(["jobsByUser", user?._id], async () => {
    const response = await client.query(
      `${process.env.REACT_APP_JOBS}/user/${user?._id}`
    );
    return response.jobs;
  });

  const hasApplicants = jobsByUser?.some((job) => job?.applicants?.length > 0);

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
              jobsByUser?.map((job) =>
                job?.applicants?.map((teacher, i) => (
                  <TableRow key={teacher?.userId?._id}>
                    <TableCell>{teacher?.userId?.name}</TableCell>
                    <TableCell>{teacher?.userId?.nationality}</TableCell>
                    <TableCell>{teacher?.userId?.location}</TableCell>
                    <TableCell>{teacher?.userId?.email}</TableCell>
                    <TableCell>
                      <Button
                        component={Link}
                        to={`/teachers/${teacher.userId._id}`}
                        variant="contained"
                      >
                        profile
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default JobApplicantsTable;
