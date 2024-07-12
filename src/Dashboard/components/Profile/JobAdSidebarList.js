import React from "react";

import { Link } from "react-router-dom";

import { Divider, Link as RouterLink, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: "flex",
  padding: "2rem 0.5rem",
  gap: "5px",
  justifyContent: "center",
  flexDirection: "column",
  maxHeight: 340,
  overflowY: "auto",
  pointerEvents: "auto",
  backgroundColor: theme.palette.background.paper,
  "&::-webkit-scrollbar": {
    width: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "transparent",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#8b8b8d",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
    borderRadius: "4px",
  },
  "&:hover": {
    "&::-webkit-scrollbar-thumb": {
      background: "#b5b5b5",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      transition: "background 1s ease-in",
      background: "#8b8b8d",
    },
    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },
  },
}));

const JobAdSidebarList = ({ jobAd }) => {
  return (
    <StyledPaper>
      {jobAd &&
        jobAd
          ?.filter((job) => job?.jobType === "featured")
          ?.map((job, i) => (
            <>
              <RouterLink
                key={job?._id}
                component={Link}
                to={`/jobs/${job?._id}`}
                sx={{
                  textDecoration: "none",
                  color: "inherit",
                  "&:hover": { color: "text.secondary" },
                }}
              >
                <Typography variant="subtitle2">• {job?.title}</Typography>
              </RouterLink>
              {i !== jobAd.length - 1 && <Divider flexItem />}
            </>
          ))}
    </StyledPaper>
  );
};

export default JobAdSidebarList;
