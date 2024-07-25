import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import {
  Box,
  Button,
  Checkbox,
  Link as RouterLink,
  Pagination,
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
import CheckboxButtonActions, {
  useCheckboxSelection,
} from "../../../shared/hooks/checkbox-hook";
import { useInvalidateQuery } from "../../../shared/hooks/invalidate-query";
import { useUser } from "../../../shared/hooks/user-hook";

const EmployerRecruitmentTable = () => {
  const auth = useContext(AuthContext);
  const [recruitsPage, setRecruitsPage] = useState({ page: 1, limit: 5 });
  const [totalPages, setTotalPages] = useState(1);
  const { invalidateQuery } = useInvalidateQuery();
  const { getEmployerRecruits, removeRecruitsById, isPostLoading } = useUser();
  const { data: employerRecruits, isLoading: recruitsIsLoading } = useQuery({
    queryKey: [
      "employerRecruits",
      auth?.user?._id,
      recruitsPage.page,
      recruitsPage.limit,
    ],
    queryFn: () =>
      getEmployerRecruits(
        auth?.user?._id,
        recruitsPage.page,
        recruitsPage.limit
      ),
  });

  const {
    rowSelection,
    allRowsSelected,
    someRowsSelected,
    handleSelectedRow,
    handleParentCheckboxSelection,
  } = useCheckboxSelection(employerRecruits?.recruitments);

  useEffect(() => {
    if (totalPages !== employerRecruits?.totalPages) {
      setTotalPages(employerRecruits?.totalPages);
    }
  }, [totalPages, employerRecruits?.totalPages]);

  const handleRecruitPageChange = (event, page) => {
    setRecruitsPage({ page: page, limit: recruitsPage.limit });
  };

  const selectedKeys = Object.keys(rowSelection);
  const noKeys =
    Object.keys(rowSelection).length === 0 ||
    Object.values(rowSelection).every((row) => !row);

  const handleRemoveRecruits = async () => {
    if (selectedKeys?.length > 0) {
      await removeRecruitsById(selectedKeys);
      setRecruitsPage({ page: 1, limit: 5 });
      await invalidateQuery("employerRecruits");
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <CheckboxButtonActions
          selectedKeys={selectedKeys}
          noKeys={noKeys}
          handleRemoveIds={handleRemoveRecruits}
        />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  size="small"
                  checked={
                    (allRowsSelected && selectedKeys?.length > 0) ?? false
                  }
                  indeterminate={!allRowsSelected && someRowsSelected}
                  onChange={handleParentCheckboxSelection}
                />
              </TableCell>
              <TableCell>User</TableCell>
              <TableCell>Nationality</TableCell>
              <TableCell>Job Location</TableCell>
              <TableCell>Job Link</TableCell>
              <TableCell>Response</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!recruitsIsLoading &&
              !isPostLoading &&
              employerRecruits?.recruitments?.map((recruitment, i) => (
                <TableRow key={recruitment?._id}>
                  <TableCell>
                    <Checkbox
                      size="small"
                      checked={rowSelection[recruitment?._id] ?? false}
                      onChange={() => handleSelectedRow(recruitment?._id)}
                      value={!!rowSelection[recruitment?._id]}
                    />
                  </TableCell>
                  <TableCell>
                    <RouterLink
                      component={Link}
                      to={`/teachers/${recruitment?.teacherId?._id}`}
                    >
                      {recruitment?.teacherId?.name}
                    </RouterLink>
                  </TableCell>
                  <TableCell>{recruitment?.teacherId?.nationality}</TableCell>
                  <TableCell>{recruitment?.teacherId?.location}</TableCell>
                  <TableCell>
                    <RouterLink
                      component={Link}
                      to={`/jobs/${recruitment?.jobId}/${recruitment?.jobTitle
                        ?.replace(/\s+/g, "-")
                        ?.toLowerCase()}`}
                    >
                      Job Link
                    </RouterLink>
                  </TableCell>
                  <TableCell>
                    <code>{recruitment?.response}</code>
                  </TableCell>
                  <TableCell>
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        backgroundColor:
                          recruitment?.response === "interested"
                            ? "green"
                            : recruitment?.response === "not interested"
                            ? "red"
                            : "gray",
                      }}
                    ></div>
                  </TableCell>
                </TableRow>
              ))}
            {(recruitsIsLoading || isPostLoading) &&
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
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
              ))}

            {!recruitsIsLoading &&
              employerRecruits?.recruitments?.length === 0 && (
                <Box sx={{ padding: "2rem" }}>
                  <Typography>No recruitments sent yet.</Typography>
                  {auth?.user?.buffetIsActive ? (
                    <Button component={Link} to={`/teachers`}>
                      Start Recruiting?
                    </Button>
                  ) : (
                    ""
                  )}
                </Box>
              )}
          </TableBody>
        </Table>
        {totalPages > 1 && (
          <Pagination
            page={recruitsPage.page}
            count={totalPages}
            onChange={handleRecruitPageChange}
          />
        )}
      </TableContainer>
    </>
  );
};

export default EmployerRecruitmentTable;
