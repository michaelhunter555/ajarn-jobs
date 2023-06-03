import React, { useContext } from "react";

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { AuthContext } from "../../../shared/context/auth-context";

const Applications = () => {
  const auth = useContext(AuthContext);

  //GET all jobs

  const getAppliedUserJobs = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_JOBS}`);
      const data = await response.json();
      return data.jobs;
    } catch (err) {
      console.log("there was an error in the applications component", err);
    }
  };

  const { data: jobs } = useQuery(["userApplications"], () =>
    getAppliedUserJobs()
  );

  //from current set of jobs, return jobs where the userId matches
  const userApplied = jobs?.filter((job) =>
    job?.applicants?.some((applicant) => applicant?.userId === auth?.user?._id)
  );

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        Total Applications:
        <Typography variant="h2">{auth.user?.applications?.length}</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableCell>Date</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Salary</TableCell>
            <TableCell>Hours</TableCell>
          </TableHead>
          <TableBody>
            {userApplied?.map((job, i) => (
              <TableRow key={job?._id}>
                <TableCell>
                  {
                    //loop through all applicants and make sure it only matches auth Id.
                    job?.applicants
                      ?.find((app) => app.userId === auth?.user?._id)
                      ?.applicationDate.split("T")[0]
                  }
                </TableCell>
                <TableCell>{job?.creator?.company}</TableCell>
                <TableCell>{job?.title}</TableCell>
                <TableCell>{job?.location}</TableCell>
                <TableCell>{job?.salary}</TableCell>
                <TableCell>{job?.hours}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Applications;
