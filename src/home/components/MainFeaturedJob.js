import React, { useState } from "react";

import { Link } from "react-router-dom";

import ViewListIcon from "@mui/icons-material/ViewList";
import { Alert, Button, Grid, Pagination } from "@mui/material";

import DynamicHomeList from "../../jobs/components/DynamicJobView/DynamicHomeList";
import DynamicJobsList from "../../jobs/components/DynamicJobView/DynamicJobsList";
import {
  StyledBoxContent,
  StyledContentGrid,
  StyledPaper,
} from "../../jobs/components/DynamicJobView/DynamicStyles";
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

  let arr = [filter?.location, filter?.hours, filter?.salaryRange];

  let filterText = "";

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== undefined && arr[i] !== "") {
      filterText += ` - ${arr[i]}`;
    }
  }

  console.log("total pages", totalPages);

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
                  onSelectedJob={(job) => setSelectedJob(job)}
                />
              )}

              {/**ALTERNATIVE JOBS LIST - DO NOT REMOVE */}

              {!featured && (
                <DynamicJobsList
                  jobs={jobs}
                  onSelectedJob={(job) => setSelectedJob(job)}
                />
              )}
            </StyledContentGrid>

            <Pagination
              size={featured ? "small" : "medium"}
              page={page.page}
              count={totalPages}
              onChange={(event, pageNum) => {
                onPageChange(pageNum);
              }}
            />
          </Grid>
          <Grid item xs={12} md={7.5} order={{ xs: 1, md: 2 }}>
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
          </Grid>
        </Grid>
      </StyledPaper>
    </>
  );
};

export default MainFeaturedJob;
