import React, { useContext } from "react";

import { Link as RouterLink } from "react-router-dom";

import {
  Box,
  Link,
  Paper,
  Skeleton,
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

  const { data: jobs, isLoading } = useQuery(["userApplications"], () =>
    getAppliedUserJobs()
  );

  //from current set of jobs, return jobs where the userId matches
  const userApplied = jobs?.filter((job) =>
    job?.applicants?.some((applicant) => applicant?.userId === auth?.user?._id)
  );

  let apps = auth?.user?.applications?.length;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <Typography variant="subtitle2">You have applied to:</Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          {apps} {apps > 0 && apps < 1 ? " job" : " jobs"}
        </Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Hours</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell>
                  <Skeleton width="100%" />
                </TableCell>
                <TableCell>
                  <Skeleton width="100%" />
                </TableCell>
                <TableCell>
                  <Skeleton width="100%" />
                </TableCell>
                <TableCell>
                  <Skeleton width="100%" />
                </TableCell>
                <TableCell>
                  <Skeleton width="100%" />
                </TableCell>
                <TableCell>
                  <Skeleton width="100%" />
                </TableCell>
              </TableRow>
            ) : !isLoading && userApplied.length === 0 ? (
              <TableRow>
                <TableCell>
                  <Typography></Typography>
                </TableCell>
              </TableRow>
            ) : (
              userApplied?.map((job, i) => (
                <TableRow key={job?._id}>
                  <TableCell>
                    {
                      //loop through all applicants and make sure it only matches auth Id.
                      job?.applicants
                        ?.find((app) => app.userId === auth?.user?._id)
                        ?.applicationDate.split("T")[0]
                    }
                  </TableCell>
                  <TableCell>
                    <Link component={RouterLink} to={`/jobs/${job?._id}`}>
                      {job?.title}
                    </Link>
                  </TableCell>
                  <TableCell>{job?.creator?.company}</TableCell>
                  <TableCell>{job?.location}</TableCell>
                  <TableCell>{job?.salary}</TableCell>
                  <TableCell>{job?.hours}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Applications;
