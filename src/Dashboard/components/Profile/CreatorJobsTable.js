import React, { useEffect, useState } from "react";

import { Link as RouterLink } from "react-router-dom";

import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import { keyframes } from "@emotion/react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
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

import UpdateJob from "../../../jobs/pages/UpdateJob";
import CheckboxButtonActions, {
  useCheckboxSelection,
} from "../../../shared/hooks/checkbox-hook";
import { useInvalidateQuery } from "../../../shared/hooks/invalidate-query";
import { useJob } from "../../../shared/hooks/jobs-hook";

const rotateOpen = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(180deg); }
`;

const rotateClose = keyframes`
  from { transform: rotate(180deg); }
  to { transform: rotate(0deg); }
`;

const tableRows = [
  {
    text: "Posted",
    variant: "button",
    color: "text.secondary",
    style: { fontWeight: 700 },
  },
  {
    text: "Job",
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
    text: "Applied",
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

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [menuJobId, setMenuJobId] = useState(null);
  const [selectedJobIndex, setSelectedJobIndex] = useState(null);

  const handleOpenMenu = (event, jobId, i) => {
    setMenuAnchorEl(event.currentTarget);
    setMenuJobId(jobId);
    setSelectedJobIndex(i);
  };

  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
    setMenuJobId(null);
    setSelectedJobIndex(null);
  };

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
                  <TableCell colSpan={7}>
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
                    <TableCell>
                      <Typography sx={{ fontSize: 11 }}>
                        {job?.datePosted?.split("T")[0]}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="body2" noWrap sx={{ fontWeight: 700, fontSize: 11 }}>
                          {job?.title}
                        </Typography>
                        <IconButton size="small" onClick={(e) => handleOpenMenu(e, job?._id, i)}>
                          <SettingsTwoToneIcon
                            fontSize="small"
                            sx={{
                              animation: Boolean(menuAnchorEl) && selectedJobIndex === i
                                ? `${(Boolean(menuAnchorEl) && menuJobId === job?._id) ? rotateOpen : rotateClose} 200ms ease`
                                : "none",
                              transform: `rotate(${(Boolean(menuAnchorEl) && menuJobId === job?._id) ? 180 : 0}deg)`
                            }}
                          />
                        </IconButton>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontSize: 11 }}>
                        {job?.location}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontSize: 11 }}>
                        {job?.salary}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontSize: 11 }}>
                        {job?.hours}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontSize: 11 }}>
                        {job?.applicants?.length}
                      </Typography>
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
      {/* Global action menu for selected job */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleCloseMenu}
      >
        {(() => {
          const current = jobs?.jobs?.find((j) => j?._id === menuJobId);
          const to = current
            ? `/jobs/${current?._id}/${current?.title?.replace(/\s+/g, "-")?.toLowerCase()}`
            : '#';
          const editDisabled = current?.applicants?.length > 0;
          return (
            <>
              <MenuItem component={RouterLink} to={to} onClick={handleCloseMenu}>
                <ListItemIcon>
                  <VisibilityTwoToneIcon fontSize="small" />
                </ListItemIcon>
                View
              </MenuItem>
              <MenuItem onClick={() => { handleCloseMenu(); editJobHandler(menuJobId); }} disabled={!!editDisabled}>
                <ListItemIcon>
                  <EditTwoToneIcon fontSize="small" />
                </ListItemIcon>
                Edit
              </MenuItem>
              <MenuItem onClick={() => { handleCloseMenu(); deleteJobWarningHandler(menuJobId); }}>
                <ListItemIcon>
                  <DeleteForeverTwoToneIcon fontSize="small" />
                </ListItemIcon>
                Delete
              </MenuItem>
            </>
          );
        })()}
      </Menu>

      {/* Delete confirmation dialog */}
      <Dialog
        disableScrollLock={true}
        open={openWarning}
        onClose={deleteJobWarningHandler}
        aria-labelledby="delete-your-job"
        aria-describedby="confirm deletion"
      >
        <DialogTitle>Delete this job?</DialogTitle>
        <DialogContent>
          You are about to delete a jobId. This action cannot be reversed.
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteJobWarningHandler}>Cancel</Button>
          <Button color="error" onClick={() => deleteJobHandler(jobToDelete)}>Confirm Delete</Button>
        </DialogActions>
      </Dialog>
      {editJob && (
        <UpdateJob jobId={editJobById} toggleEdit={closeEditJobHandler} />
      )}
    </>
  );
};

export default CreatorJobsTable;
