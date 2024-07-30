import React from "react";

import { Link as RouterLink } from "react-router-dom";

import { Link, List, ListItem } from "@mui/material";
import { styled } from "@mui/material/styles";

import { JobAdSkeleton } from "../../shared/components/UIElements/LoadingSkeletons";
import BottomFeaturedAds from "./BottomFeaturedAds";

const StyledList = styled(List)(({ theme }) => ({
  flexDirection: "row",
  display: "flex",
  justifyContent: "center",
  marginBottom: "2em",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    minWidth: "100%",
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    minWidth: "100%",
  },
}));

const BottomFeaturedAdsList = (props) => {
  const { footerJobs, isLoading } = props;
  return (
    <StyledList>
      {isLoading &&
        Array.from(new Array(4)).map((_, i) => (
          <ListItem
            key={i}
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
              width: "auto",
              gap: "15px",
            }}
          >
            <JobAdSkeleton
              sx={{
                width: 220,
                height: 120,
                borderRadius: "6px",
                margin: "0 3rem",
              }}
              num={1}
              variant="rectangular"
            />
          </ListItem>
        ))}
      {footerJobs &&
        footerJobs?.slice(0, 5)?.map((job, i) => (
          <Link
            sx={{ textDecoration: "none" }}
            component={RouterLink}
            key={job?._id}
            to={`/jobs/${job?._id}/${job?.title
              ?.replace(/\s+/g, "-")
              ?.toLowerCase()}`}
          >
            <ListItem
              sx={{ display: "flex", alignItems: "stretch", height: "100%" }}
            >
              <BottomFeaturedAds
                image={`${job?.image}`}
                id={job?._id}
                title={job?.title}
                salary={job?.salary}
                hours={job?.hours}
                school={job?.creator.company}
                location={job?.location}
                featured={job?.jobType === "featured"}
              />
            </ListItem>
          </Link>
        ))}
    </StyledList>
  );
};

export default BottomFeaturedAdsList;
