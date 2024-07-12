import React, { useState } from "react";

import { Link } from "react-router-dom";

import ViewListIcon from "@mui/icons-material/ViewList";
import { Alert, Button, Grid, Pagination } from "@mui/material";
import { styled } from "@mui/material/styles";

import DynamicHomeList from "../../jobs/components/DynamicJobView/DynamicHomeList";
import DynamicJobsList from "../../jobs/components/DynamicJobView/DynamicJobsList";
import {
  StyledBoxContent,
  StyledContentGrid,
  StyledPaper,
} from "../../jobs/components/DynamicJobView/DynamicStyles";
import { useThemeToggle } from "../../shared/context/theme-context";
import FeaturedJobDetails from "./FeaturedJobDetails";

const MainFeaturedJob = ({
  jobs,
  featured,
  height,
  fontSize,
  onPageChange,
  totalPages,
  page,
  filter,
}) => {
  const [selectedJob, setSelectedJob] = useState(
    jobs?.length > 0 ? jobs[0] : null
  );
  const [flash, setFlash] = useState(false);
  const { isDarkMode } = useThemeToggle();

  let arr = [filter?.location, filter?.hours, filter?.salaryRange];

  let filterText = "";

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== undefined && arr[i] !== "") {
      filterText += ` - ${arr[i]}`;
    }
  }

  return (
    <>
      {/*featured post */}
      <StyledPaper
        sx={{
          borderRadius: "5px",
        }}
      >
        <Grid container>
          <Grid item xs={12} md={featured ? 4.5 : 4} order={{ xs: 2, md: 1 }}>
            <Alert severity="info">
              {featured ? "Featured jobs |" : "All Jobs"}{" "}
              {filterText ? "by " + filterText : ""}
              {featured && (
                <Button
                  startIcon={<ViewListIcon />}
                  size="small"
                  component={Link}
                  to="/modern-view/jobs"
                  sx={{ fontSize: 10 }}
                >
                  All Jobs
                </Button>
              )}
            </Alert>

            <StyledContentGrid xs={12} md={4.5} sx={{ maxHeight: height }}>
              {featured && (
                <DynamicHomeList
                  jobs={jobs}
                  onSelectedJob={(job) => {
                    setSelectedJob(job);
                    setFlash(true);
                    setTimeout(() => setFlash(false), 350);
                  }}
                />
              )}

              {/**ALTERNATIVE JOBS LIST - DO NOT REMOVE */}

              {!featured && (
                <DynamicJobsList
                  jobs={jobs}
                  onSelectedJob={(job) => {
                    setSelectedJob(job);
                    setFlash(true);
                    setTimeout(() => setFlash(false), 350);
                  }}
                />
              )}
            </StyledContentGrid>

            {totalPages > 1 && (
              <Pagination
                size={featured ? "small" : "medium"}
                page={page.page}
                count={totalPages}
                onChange={(event, pageNum) => {
                  onPageChange(pageNum);
                }}
              />
            )}
          </Grid>
          <Grid item xs={12} md={7.5} order={{ xs: 1, md: 2 }}>
            <FlashAnimation
              flash={flash}
              isDarkMode={isDarkMode}
              sx={{ padding: "0.5rem", borderRadius: "5px" }}
            >
              <StyledBoxContent>
                {selectedJob && (
                  <FeaturedJobDetails
                    fontSize={fontSize}
                    featured={featured}
                    job={selectedJob}
                    height={height}
                  />
                )}
              </StyledBoxContent>
            </FlashAnimation>
          </Grid>
        </Grid>
      </StyledPaper>
    </>
  );
};

const FlashAnimation = styled("div")(({ flash, isDarkMode }) => ({
  animation: flash
    ? isDarkMode
      ? `flash-animation-dark 1.5s`
      : `flash-animation-light 0.5s`
    : "none",
  "@keyframes flash-animation-light": {
    "0%": {
      backgroundColor: "rgba(0, 0, 0, 0.15)",
    },
    "100%": {
      backgroundColor: "transparent",
    },
  },
  "@keyframes flash-animation-dark": {
    "0%": {
      backgroundColor: "rgba(255, 255, 255, 0.15)",
    },
    "100%": {
      backgroundColor: "transparent",
    },
  },
}));

export default MainFeaturedJob;
