import React from "react";

import { RiAdvertisementLine } from "react-icons/ri";
import { Link as RouterLink } from "react-router-dom";

import { Link, List, ListItem } from "@mui/material";
import { styled } from "@mui/material/styles";

import { JobAdSkeleton } from "../../shared/components/UIElements/LoadingSkeletons";
import BottomFeaturedAds from "./BottomFeaturedAds";

const StyledList = styled(List)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  marginBottom: "5em",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    mindWidth: "100%",
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
      <RiAdvertisementLine style={{ color: "gray" }} size={20} />
      {isLoading &&
        Array.from(new Array(3)).map((_, i) => (
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
        footerJobs?.slice(0, 4)?.map((job, i) => (
          <Link
            sx={{ textDecoration: "none" }}
            component={RouterLink}
            key={job?._id}
            to={`/jobs/${job?._id}`}
          >
            <ListItem>
              <BottomFeaturedAds
                image={`${process.env.REACT_APP_IMAGE}${job?.image}`}
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
