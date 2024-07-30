import React from "react";

import { Link } from "react-router-dom";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PaymentsTwoToneIcon from "@mui/icons-material/PaymentsTwoTone";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const StyledAccordionBox = styled(Box)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    flexDirection: "column",
  },
  [theme.breakpoints.down("md")]: {
    display: "flex",
    flexDirection: "column",
  },
}));

const MobileJobsAccordion = ({ jobs, jobsIsLoading }) => {
  return (
    <StyledAccordionBox>
      {jobs &&
        !jobsIsLoading &&
        jobs?.map((job, i) => (
          <Accordion key={job?._id}>
            <AccordionSummary
              id={`${job?._id}_panel${i}`}
              expandIcon={<ExpandMoreIcon />}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <CardMedia
                  component="img"
                  src={job?.image}
                  alt={`${job?.title?.replace(/\s+/g, "-")}--${job?._id}`}
                  sx={{ width: 50, height: 50 }}
                />

                <Typography variant="subtitle2" color="text.secondary">
                  {job?.title} — {job?.salary}
                </Typography>
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <Divider sx={{ margin: "0 auto 0.5rem" }} />
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={1}
              >
                <Chip
                  variant="outlined"
                  sx={{ fontSize: 10 }}
                  label={job?.salary}
                  icon={<PaymentsTwoToneIcon style={{ color: "#1e8d41" }} />}
                />
                <Chip
                  variant="outlined"
                  sx={{ fontSize: 10 }}
                  label={job?.location}
                  icon={<LocationOnOutlinedIcon style={{ color: "#47acbb" }} />}
                />
                <Chip
                  variant="outlined"
                  sx={{ fontSize: 10 }}
                  label={job?.hours}
                  icon={<AccessTimeIcon />}
                />
              </Stack>

              <Typography
                variant="subtitle2"
                color="text.secondary"
                dangerouslySetInnerHTML={{ __html: job?.description }}
              />
            </AccordionDetails>
            <Divider />
            <AccordionActions>
              <Chip
                color="primary"
                label="View Job"
                clickable
                component={Link}
                to={`/jobs/${job?._id}/${job?.title
                  ?.replace(/\s+/g, "-")
                  ?.toLowerCase()}`}
              />
            </AccordionActions>
          </Accordion>
        ))}

      {jobsIsLoading &&
        Array.from({ length: 5 }).map((_, i) => (
          <Accordion key={i}>
            <AccordionSummary
              id={`skeleton_panel${i}`}
              expandIcon={<ExpandMoreIcon />}
            >
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{ width: "100%" }}
              >
                <CardMedia
                  component={Skeleton}
                  sx={{ width: 50, height: 50 }}
                />

                <Skeleton width="100%" />
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <Skeleton width="100%" />
            </AccordionDetails>
            <AccordionActions>
              <Skeleton width="100%" />
              <Skeleton width="100%" />
            </AccordionActions>
          </Accordion>
        ))}
      {!jobsIsLoading && jobs?.length === 0 && (
        <Stack alignItems="center">
          <Typography variant="subtitle2" color="text.secondary">
            No jobs found.
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Please check back in the near future.
          </Typography>
        </Stack>
      )}
    </StyledAccordionBox>
  );
};

export default MobileJobsAccordion;
