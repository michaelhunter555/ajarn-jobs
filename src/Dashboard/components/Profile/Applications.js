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

const Applications = ({ applications, isLoading, onApplicationPageChange }) => {
  const [page, setPage] = useState(applications?.page);
  const [totalPages, setTotalPages] = useState(applications?.totalPages);
  const [totalApplications, setTotalApplications] = useState(
    applications?.totalApplications
  );
  //from current set of jobs, return jobs where the userId matches
  const userApplied = applications?.applications?.length === 0;

  let apps = totalApplications;

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
              applications &&
              applications?.applications?.map((application, i) => (
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
            count={totalPages}
            page={page}
            onChange={(event, val) => {
              onApplicationPageChange(val, 5);
              setPage(val);
            }}
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
