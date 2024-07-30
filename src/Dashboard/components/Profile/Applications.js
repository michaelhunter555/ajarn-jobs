import React, { useContext, useEffect, useState } from "react";

import { Link as RouterLink } from "react-router-dom";

import {
  Box,
  Button,
  Checkbox,
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

import { AuthContext } from "../../../shared/context/auth-context";
import CheckboxButtonActions, {
  useCheckboxSelection,
} from "../../../shared/hooks/checkbox-hook";
import { useInvalidateQuery } from "../../../shared/hooks/invalidate-query";
import { useUser } from "../../../shared/hooks/user-hook";

const Applications = ({ applications, isLoading, onApplicationPageChange }) => {
  const auth = useContext(AuthContext);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(applications?.page);
  const { invalidateQuery } = useInvalidateQuery();
  const [totalApplications, setTotalApplications] = useState(0);
  const {
    rowSelection,
    allRowsSelected,
    someRowsSelected,
    handleSelectedRow,
    handleParentCheckboxSelection,
  } = useCheckboxSelection(applications?.applications);
  const { removeApplicationFromJob, isPostLoading } = useUser();

  useEffect(() => {
    if (totalPages !== applications?.totalPages) {
      setTotalPages(applications?.totalPages);
    }
  }, [totalPages, applications?.totalPages]);

  useEffect(() => {
    if (
      totalApplications !== applications?.totalApplications &&
      applications?.totalApplications !== undefined
    ) {
      setTotalApplications(applications?.totalApplications);
    }
  }, [totalApplications, applications?.totalApplications]);

  //from current set of jobs, return jobs where the userId matches
  const userApplied = applications?.applications?.length === 0;

  let apps = totalApplications;

  const selectedKeys = Object.keys(rowSelection);
  const noKeys =
    Object.keys(rowSelection).length === 0 ||
    Object.values(rowSelection).every((val) => !val);

  const handleRemoveApplications = async () => {
    if (selectedKeys.length > 0) {
      await removeApplicationFromJob(selectedKeys, auth?.user?._id);
      onApplicationPageChange(1, 5);
      setPage(1);
      invalidateQuery("userApplications");
    }
  };

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
        <Typography variant="subtitle2">You have applications for:</Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          {apps} {apps > 0 && apps < 1 ? " job" : " jobs"}
        </Typography>
      </Box>
      <TableContainer component={Paper}>
        <CheckboxButtonActions
          handleRemoveIds={handleRemoveApplications}
          selectedKeys={selectedKeys}
          noKeys={noKeys}
        />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  size="small"
                  checked={
                    (allRowsSelected && selectedKeys.length > 0) ?? false
                  }
                  indeterminate={!allRowsSelected && someRowsSelected}
                  onChange={handleParentCheckboxSelection}
                />
              </TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Hours</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading || isPostLoading ? (
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
                <TableCell>
                  <Skeleton width="100%" />
                </TableCell>
              </TableRow>
            ) : (
              applications &&
              applications?.applications?.map((application, i) => (
                <TableRow key={application?._id}>
                  <TableCell>
                    <Checkbox
                      size="small"
                      checked={rowSelection[application?._id] ?? false}
                      onChange={() => handleSelectedRow(application?._id)}
                      value={!!rowSelection[application?._id]}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ fontSize: 10 }}
                    >
                      {application?.applicationDate?.split("T")[0]}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {application?.jobId ? (
                      <Link
                        component={RouterLink}
                        to={`/jobs/${
                          application?.jobId?._id
                        }/${application?.jobId?.title
                          ?.replace(/\s+/g, "-")
                          ?.toLowerCase()}`}
                      >
                        {application?.jobId?.title}
                      </Link>
                    ) : (
                      <Typography variant="subtitle2" color="text.secondary">
                        Job Removed or Expired
                      </Typography>
                    )}
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
