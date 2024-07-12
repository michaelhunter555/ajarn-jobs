import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import ClearIcon from "@mui/icons-material/Clear";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import {
  Button,
  ButtonGroup,
  Link as RouterLink,
  Pagination,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
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

const JobApplicantsTable = ({
  applicants,
  isLoading,
  jobApplicants,
  applicationsPage, //func
  page,
}) => {
  const [pageNum, setPage] = useState(page);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (jobApplicants && jobApplicants?.totalPages !== totalPages) {
      setTotalPages(jobApplicants?.totalPages);
    }
  }, [jobApplicants, totalPages]);

  const hasApplicants =
    jobApplicants && jobApplicants?.jobApplications?.length > 0;

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
              jobApplicants &&
              jobApplicants?.jobApplications?.map((application, i) => (
                <TableRow key={`${application?._id}${i + 1}`}>
                  <TableCell>
                    <RouterLink
                      component={Link}
                      to={`/teachers/${application?.userId?._id}`}
                      variant="contained"
                    >
                      {application?.userId?.name}
                    </RouterLink>
                  </TableCell>
                  <TableCell>{application?.userId?.nationality}</TableCell>
                  <TableCell>{application?.userId?.location}</TableCell>
                  <TableCell>{application?.userId?.email}</TableCell>
                  <TableCell>
                    <ButtonGroup>
                      <Tooltip title="short list applicant">
                        <Button>
                          <ThumbUpOffAltIcon />
                        </Button>
                      </Tooltip>
                      <Tooltip title="remove applicant">
                        <Button color="error">
                          <ClearIcon />
                        </Button>
                      </Tooltip>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <Stack alignItems="end">
          <Pagination
            size="small"
            count={totalPages}
            page={pageNum}
            onChange={(event, val) => {
              setPage(val);
              applicationsPage(val, 5);
            }}
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
