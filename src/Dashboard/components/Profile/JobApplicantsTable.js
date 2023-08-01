import React, { useState } from "react";

import { Link } from "react-router-dom";

import {
  Button,
  Pagination,
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
    text: "E-mail",
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

const JobApplicantsTable = ({ applicants, isLoading }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const flatApplicants = applicants?.reduce((acc, val) => acc.concat(val), []);

  // Calculate number of pages inside the component
  const noOfPages = Math.ceil(flatApplicants?.length / itemsPerPage);

  // Slice the applicants array based on the current page
  const indexOfLastPage = page * itemsPerPage;
  const indexOfFirstPage = indexOfLastPage - itemsPerPage;
  const currentApplicants = flatApplicants?.slice(
    indexOfFirstPage,
    indexOfLastPage
  );

  const hasApplicants =
    applicants && applicants?.some((apps) => apps?.length > 0);

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
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
              </TableRow>
            ) : !isLoading && !hasApplicants ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <Typography variant="subtitle2" color="text.secondary">
                    No applicants yet! Check back later.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              currentApplicants &&
              currentApplicants?.map((application, i) => (
                <TableRow key={`${application?._id}${i + 1}`}>
                  <TableCell>{application?.userId?.name}</TableCell>
                  <TableCell>{application?.userId?.nationality}</TableCell>
                  <TableCell>{application?.userId?.location}</TableCell>
                  <TableCell>{application?.userId?.email}</TableCell>
                  <TableCell>
                    <Button
                      component={Link}
                      to={`/teachers/${application?.userId?._id}`}
                      variant="contained"
                    >
                      profile
                    </Button>
                  </TableCell>
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
    </>
  );
};

export default JobApplicantsTable;
