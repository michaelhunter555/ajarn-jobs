import React, { useContext, useEffect } from "react";

import { Link as RouterLink } from "react-router-dom";

import {
  Box,
  Button,
  ButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { AuthContext } from "../../../shared/context/auth-context";
import { useJob } from "../../../shared/hooks/jobs-hook";

const tableRows = [
  {
    text: "Posted",
    variant: "button",
    color: "text.secondary",
    style: { fontWeight: 700 },
  },
  {
    text: "View/Edit",
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
    text: "Salary",
    variant: "button",
    color: "text.secondary",
    style: { fontWeight: 700 },
  },
  {
    text: "Hours",
    variant: "button",
    color: "text.secondary",
    style: { fontWeight: 700 },
  },
  {
    text: "Applicants",
    variant: "button",
    color: "text.secondary",
    style: { fontWeight: 700 },
  },
];

const CreatorJobsTable = () => {
  const auth = useContext(AuthContext);
  const { user } = auth;
  const { getJobsByUserId, jobs, isLoading } = useJob();

  useEffect(() => {
    getJobsByUserId(user?._id);
  }, [getJobsByUserId, user]);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          {tableRows.map((item, i) => (
            <TableCell key={i}>
              <Typography
                sx={item.style}
                color={item.color}
                variant={item.variant}
              >
                {item.text}
              </Typography>
            </TableCell>
          ))}
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell>
                <Box sx={{ display: "flex", width: "100%" }}>Loading...</Box>
              </TableCell>
            </TableRow>
          ) : (
            jobs?.map((job, i) => (
              <TableRow key={job?._id}>
                <TableCell>{job?.datePosted.split("T")[0]}</TableCell>
                <TableCell>
                  <ButtonGroup
                    size="small"
                    variant="contained"
                    disableElevation
                  >
                    <Button to={`/jobs/${job?._id}`} component={RouterLink}>
                      View
                    </Button>
                    <Button
                      sx={{ backgroundColor: "#2c6399" }}
                      to={`/jobs/${job?._id}/update`}
                      component={RouterLink}
                    >
                      Edit
                    </Button>
                  </ButtonGroup>
                </TableCell>
                <TableCell>{job?.location}</TableCell>
                <TableCell>{job?.salary}</TableCell>
                <TableCell>{job?.hours}</TableCell>
                <TableCell>{job?.applicants?.length}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CreatorJobsTable;
