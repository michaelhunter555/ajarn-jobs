import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import CloseIcon from "@mui/icons-material/Close";
import PlaceIcon from "@mui/icons-material/Place";
import {
  Button,
  Checkbox,
  Chip,
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

import ErrorModal from "../../../shared/components/UIElements/ErrorModal";
import { useInvalidateQuery } from "../../../shared/hooks/invalidate-query";
import { useUser } from "../../../shared/hooks/user-hook";

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
    text: "Applied For",
    variant: "button",
    color: "text.secondary",
    style: { fontWeight: 700 },
  },
];

const JobApplicantsTable = ({
  applicants, //auth
  isLoading,
  jobApplicants,
  applicationsPage, //func
  page,
}) => {
  const [pageNum, setPage] = useState(page);
  const [totalPages, setTotalPages] = useState(1);
  const [rowSelection, setRowSelection] = useState({});
  const [allRowsSelected, setAllRowsSelected] = useState(false);
  const [someRowsSelected, setSomeRowsSelected] = useState(false);
  const { removeApplicantsById, isPostLoading, error, clearError } = useUser();
  const { invalidateQuery } = useInvalidateQuery();

  useEffect(() => {
    if (jobApplicants && jobApplicants?.totalPages !== totalPages) {
      setTotalPages(jobApplicants?.totalPages);
    }
  }, [jobApplicants, totalPages]);

  const hasApplicants =
    jobApplicants && jobApplicants?.jobApplications?.length > 0;

  useEffect(() => {
    const handleSomeRowsSelected = jobApplicants?.jobApplications?.some(
      (applicant) => rowSelection[applicant?._id]
    );

    const handleAllRowsSelected = jobApplicants?.jobApplications?.every(
      (applicant) => rowSelection[applicant?._id]
    );

    setSomeRowsSelected(handleSomeRowsSelected);
    setAllRowsSelected(handleAllRowsSelected);
  }, [allRowsSelected, someRowsSelected, jobApplicants, rowSelection]);

  const handleSelectedRow = (id) => {
    setRowSelection((prev) => {
      const selection = { ...prev };
      if (selection[id]) {
        delete selection[id];
      } else {
        selection[id] = true;
      }
      return selection;
    });
  };

  const handleParentCheckboxSelection = (event) => {
    const isChecked = event.target.checked;
    setRowSelection((prev) => {
      const newState = {};
      if (isChecked) {
        jobApplicants?.jobApplications.forEach((applicant) => {
          newState[applicant?._id] = isChecked;
        });
      }
      return newState;
    });
  };

  const selectedKeys = Object.keys(rowSelection);
  const noKeys =
    selectedKeys.length === 0 ||
    Object.values(rowSelection).every((val) => !val);

  const handleRemoveApplicants = async () => {
    if (selectedKeys.length > 0) {
      await removeApplicantsById(selectedKeys);
      applicationsPage(1, 5);
      setPage(1);
      invalidateQuery("applicants");
    }
  };

  return (
    <>
      <ErrorModal erorr={error} onClear={clearError} />
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{ marginLeft: 2 }}
      >
        <Chip
          label={`${selectedKeys.length} selected`}
          variant="outlined"
          size="small"
          sx={{ fontSize: 11 }}
        />
        <Chip
          label="Remove"
          icon={<CloseIcon color="error" />}
          clickable
          variant="outlined"
          component={Button}
          size="small"
          disabled={noKeys}
          onClick={handleRemoveApplicants}
          sx={{ fontSize: 11 }}
        />
      </Stack>
      <TableContainer>
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
                    <Checkbox
                      size="small"
                      checked={rowSelection[application?._id] ?? false}
                      onChange={() => handleSelectedRow(application?._id)}
                      value={!!rowSelection[application?._id]}
                    />
                  </TableCell>
                  <TableCell>
                    <RouterLink
                      component={Link}
                      to={`/teachers/${application?.userId?._id}`}
                    >
                      {application?.userId?.name}
                    </RouterLink>
                  </TableCell>
                  <TableCell>{application?.userId?.nationality}</TableCell>
                  <TableCell>{application?.userId?.location}</TableCell>
                  <TableCell>{application?.userId?.email}</TableCell>
                  <TableCell>
                    <Tooltip
                      placement="right-start"
                      title={
                        <Stack direction="row" alignItems="center">
                          <PlaceIcon sx={{ fontSize: 11 }} />{" "}
                          {application?.jobId?.location}
                        </Stack>
                      }
                    >
                      <RouterLink
                        component={Link}
                        to={`/jobs/${
                          application?.jobId?._id
                        }/${application?.jobId?.title
                          .replace(/\s+/g, "-")
                          .toLowerCase()}`}
                      >
                        {application?.jobId?.title}
                      </RouterLink>
                    </Tooltip>
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
