import React, { useEffect, useState } from "react";

import { Link as RouterLink } from "react-router-dom";

import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import {
  Button,
  ButtonGroup,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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

import UpdateJob from "../../../jobs/pages/UpdateJob";
import CheckboxButtonActions, {
  useCheckboxSelection,
} from "../../../shared/hooks/checkbox-hook";
import { useInvalidateQuery } from "../../../shared/hooks/invalidate-query";
import { useJob } from "../../../shared/hooks/jobs-hook";

const tableRows = [
  {
    text: "Posted",
    variant: "button",
    color: "text.secondary",
    style: { fontWeight: 700 },
  },
  {
    text: "View/Edit",
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
    text: "Salary",
    variant: "button",
    color: "text.secondary",
    style: { fontWeight: 700 },
  },
  {
    text: "Hours",
    variant: "button",
    color: "text.secondary",
    style: { fontWeight: 700 },
  },
  {
    text: "Applicants",
    variant: "button",
    color: "text.secondary",
    style: { fontWeight: 700 },
  },
];

const CreatorJobsTable = ({
  jobs,
  isLoading,
  onCreatorsPageChange,
  refetchCreatorJobs,
}) => {
  const [page, setPage] = useState(jobs?.page);
  const [totalPages, setTotalPages] = useState(1);
  const [editJobById, setEditJobById] = useState(null);
  const [editJob, setEditJob] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const {
    rowSelection,
    allRowsSelected,
    someRowsSelected,
    handleSelectedRow,
    handleParentCheckboxSelection,
  } = useCheckboxSelection(jobs?.jobs);
  const { invalidateQuery } = useInvalidateQuery();

  const { deleteJobById, isDeleting, deleteManyJobsById } = useJob();

  useEffect(() => {
    if (totalPages !== jobs?.totalPages) {
      setTotalPages(jobs?.totalPages);
    }
  }, [totalPages, jobs?.totalPages]);

  const deleteJobWarningHandler = (id) => {
    setOpenWarning((prev) => !prev);
    setJobToDelete(id);
  };

  const deleteJobHandler = async (jobId) => {
    try {
      await deleteJobById(jobToDelete).then(async () => {
        refetchCreatorJobs();
      });
    } catch (err) {
      console.log("Error trying to delete a job");
    }
    setOpenWarning(false);
  };

  const editJobHandler = (id) => {
    setEditJobById(id);
    setEditJob(true);
  };

  const closeEditJobHandler = () => {
    setEditJobById(null);
    setEditJob(false);
  };

  const creatorHasJobs = jobs && jobs?.jobs?.length > 0;
  const jobIds = Object.keys(rowSelection);
  const noIds =
    Object.keys(rowSelection).length === 0 ||
    Object.values(rowSelection)?.every((val) => !val);

  const handleDeleteBulkIds = async () => {
    if (jobIds.length > 0) {
      await deleteManyJobsById(jobIds);
      onCreatorsPageChange(1, 5);
      setPage(1);
      invalidateQuery("creatorJobs");
    }
  };

  return (
    <>
      <CheckboxButtonActions
        selectedKeys={jobIds}
        noKeys={noIds}
        handleRemoveIds={handleDeleteBulkIds}
      />
      {!editJob && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                    size="small"
                    checked={allRowsSelected}
                    indeterminate={!allRowsSelected && someRowsSelected}
                    onChange={handleParentCheckboxSelection}
                  />
                </TableCell>
                {tableRows.map((item, i) => (
                  <TableCell key={i}>
                    <Typography
                      sx={item.style}
                      color={item.color}
                      variant={item.variant}
                    >
                      {item.text}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading || isDeleting ? (
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
              ) : !isLoading && !creatorHasJobs ? (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Typography variant="subtitle2" color="text.secondary">
                      No active jobs for this account.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                jobs?.jobs?.map((job, i) => (
                  <TableRow key={job?._id}>
                    <TableCell>
                      <Checkbox
                        size="small"
                        checked={!!rowSelection[job?._id]}
                        onChange={() => handleSelectedRow(job?._id)}
                        value={rowSelection[job?._id]}
                      />
                    </TableCell>
                    <TableCell>{job?.datePosted?.split("T")[0]}</TableCell>
                    <TableCell>
                      <ButtonGroup
                        size="small"
                        variant="contained"
                        disableElevation
                      >
                        <Button
                          to={`/jobs/${job?._id}/${job?.title
                            ?.replace(/\s+/g, "-")
                            ?.toLowerCase()}`}
                          component={RouterLink}
                        >
                          <VisibilityTwoToneIcon />
                        </Button>
                        {/*auth.user._id === job._id to={`/jobs/${job?._id}/update`}*/}
                        <Button
                          sx={{ backgroundColor: "#2c6399" }}
                          onClick={() => editJobHandler(job?._id)}
                          disabled={job?.applicants?.length > 0}
                        >
                          <EditTwoToneIcon />
                        </Button>
                        <Tooltip title="Delete" placement="top">
                          <Button
                            color="error"
                            onClick={() => deleteJobWarningHandler(job?._id)}
                          >
                            <DeleteForeverTwoToneIcon />
                          </Button>
                        </Tooltip>
                        <Dialog
                          disableScrollLock={true}
                          open={openWarning}
                          onClose={deleteJobWarningHandler}
                          aria-labelledby="delete-your-job"
                          aria-describedby="confirm deletion"
                        >
                          <DialogTitle>Delete this job?</DialogTitle>
                          <DialogContent>
                            You are about to delete a jobId. This action cannot
                            be reversed.
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={deleteJobWarningHandler}>
                              Cancel
                            </Button>
                            <Button
                              color="error"
                              onClick={() => deleteJobHandler(job?._id)}
                            >
                              Confirm Delete
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </ButtonGroup>
                    </TableCell>
                    <TableCell>{job?.location}</TableCell>
                    <TableCell>{job?.salary}</TableCell>
                    <TableCell>{job?.hours}</TableCell>
                    <TableCell>{job?.applicants?.length}</TableCell>
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
                onCreatorsPageChange(val, 5);
                setPage(val);
              }}
              defaultPage={1}
              showFirstButton
              showLastButton
            />
          </Stack>
        </TableContainer>
      )}
      {editJob && (
        <UpdateJob jobId={editJobById} toggleEdit={closeEditJobHandler} />
      )}
    </>
  );
};

export default CreatorJobsTable;
