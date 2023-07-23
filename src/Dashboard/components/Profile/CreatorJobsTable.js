import React, { useEffect, useState } from "react";

import { Link as RouterLink } from "react-router-dom";

import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import {
  Button,
  ButtonGroup,
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

const CreatorJobsTable = ({ jobs, isLoading, refetch }) => {
  const [editJobById, setEditJobById] = useState(null);
  const [editJob, setEditJob] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const [noOfPages, setNoOfPages] = useState(
    Math.ceil(jobs?.length / itemsPerPage)
  );
  const { deleteJobById, isDeleting } = useJob();

  useEffect(() => {
    if (!isDeleting) {
      const newNoOfPages = Math.ceil(jobs?.length / itemsPerPage);
      setNoOfPages(newNoOfPages);
      if (page > newNoOfPages) {
        setPage(newNoOfPages);
      }
    }
  }, [isDeleting, jobs, page]);

  const deleteJobWarningHandler = (id) => {
    setOpenWarning((prev) => !prev);
    setJobToDelete(id);
  };

  const deleteJobHandler = async (jobId) => {
    try {
      await deleteJobById(jobToDelete);
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

  const creatorHasJobs = jobs && jobs.length > 0;

  const indexOfLastPage = page * itemsPerPage;
  const indexOfFirstPage = indexOfLastPage - itemsPerPage;
  const currentJobsPage = jobs?.slice(indexOfFirstPage, indexOfLastPage);

  return (
    <>
      {!editJob && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
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
                currentJobsPage?.map((job, i) => (
                  <TableRow key={job?._id}>
                    <TableCell>{job?.datePosted?.split("T")[0]}</TableCell>
                    <TableCell>
                      <ButtonGroup
                        size="small"
                        variant="contained"
                        disableElevation
                      >
                        <Button to={`/jobs/${job?._id}`} component={RouterLink}>
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
                            <Button onClick={() => deleteJobHandler(job?._id)}>
                              Confirm Delete
                            </Button>
                            <Button onClick={deleteJobWarningHandler}>
                              Cancel
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
              count={noOfPages}
              page={page}
              onChange={(event, val) => setPage(val)}
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
