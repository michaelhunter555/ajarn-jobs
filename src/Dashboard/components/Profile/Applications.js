import React from "react";

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

const Applications = ({ applications, isLoading }) => {
  // const auth = useContext(AuthContext);

  //GET all jobs
  // const userId = auth?.user?._id;
  // const getAppliedUserJobs = async () => {
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_USERS}/${userId}`);
  //     const data = await response.json();
  //     return data.user;
  //   } catch (err) {
  //     console.log("there was an error in the applications component", err);
  //   }
  // };

  // const { data: user, isLoading } = useQuery(["userApplications", userId], () =>
  //   getAppliedUserJobs()
  // );

  //from current set of jobs, return jobs where the userId matches
  const userApplied = applications?.length === 0;

  let apps = applications?.length;

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
            ) : !isLoading && userApplied ? (
              <TableRow>
                <TableCell>
                  <Typography></Typography>
                </TableCell>
              </TableRow>
            ) : (
              applications &&
              applications?.map((application, i) => (
                <TableRow key={application?._id}>
                  <TableCell>
                    {application?.applicationDate?.split("T")[0]}
                  </TableCell>
                  <TableCell>
                    <Link
                      component={RouterLink}
                      to={`/jobs/${application?.jobId?._id}`}
                    >
                      {application?.jobId?.title}
                    </Link>
                  </TableCell>
                  <TableCell>{application?.jobId?.creator?.company}</TableCell>
                  <TableCell>{application?.jobId?.location}</TableCell>
                  <TableCell>{application?.jobId?.salary}</TableCell>
                  <TableCell>{application?.jobId?.hours}</TableCell>
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
