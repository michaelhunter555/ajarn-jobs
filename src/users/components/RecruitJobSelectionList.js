import React, { useState } from "react";

import { Chip, MenuItem, Select, Stack, Typography } from "@mui/material";

const RecruitJobSelectionList = ({ jobs, onSelectedJob }) => {
  const [jobTitle, setJobTitle] = useState(jobs[0]?.title);

  const handleJobSelection = (event) => {
    setJobTitle(event.target.value);
  };

  const noJobs = jobs?.length < 0;

  return (
    <Select value={jobTitle} onChange={handleJobSelection}>
      {noJobs && (
        <Typography sx={{ fontSize: 14 }}>
          You have no jobs to offer.
        </Typography>
      )}
      {jobs?.map((job, i) => (
        <MenuItem
          onClick={() => onSelectedJob(job)}
          key={job?._id}
          value={job?.title}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography sx={{ fontSize: { xs: 12, md: 14 } }}>
              {job?.title} - {job?.location}
            </Typography>
            <Chip label={job?.salary} />
          </Stack>
        </MenuItem>
      ))}
    </Select>
  );
};

export default RecruitJobSelectionList;
