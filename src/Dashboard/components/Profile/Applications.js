import React, { useState } from "react";

import { Link as RouterLink } from "react-router-dom";

import {
  Box,
  Button,
  Link,
  Pagination,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

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

const Applications = ({ applications, isLoading }) => {
  const [page, setPage] = useState(1);

  const itemsPerPage = 5;
  const [noOfPages] = useState(Math.ceil(applications?.length / itemsPerPage));

  const indexOfLastApplication = page * itemsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - itemsPerPage;
  const currentApplications = applications?.slice(
    indexOfFirstApplication,
    indexOfLastApplication
  );

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
            ) : (
              currentApplications &&
              currentApplications?.map((application, i) => (
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
        <Stack alignItems="end">
          <Pagination
            size="small"
            count={noOfPages}
            page={page}
            onChange={(event, val) => setPage(val)}
            defaultPage={1}
            showFirstButton
            showLastButton
          />
        </Stack>
      </TableContainer>
      {!isLoading && userApplied && (
        <Stack
          sx={{ width: "100%" }}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography> You haven't applied to any jobs yet</Typography>
          <Button variant="contained">view jobs</Button>
        </Stack>
      )}
    </>
  );
};

export default Applications;
