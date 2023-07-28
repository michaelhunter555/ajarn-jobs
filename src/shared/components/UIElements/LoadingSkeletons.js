import React from "react";

import { Skeleton, styled } from "@mui/material";

const JobAdSkeletonStyles = styled(Skeleton)(({ theme }) => ({
  borderRadius: "15px",
  width: "100%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

//job ad skeleton
export const JobAdSkeleton = (props) => {
  let skeletons = [];

  for (let i = 0; i < props.num; i++) {
    if (props.num === 0 || undefined) {
      props.num = 1;
    }
    skeletons.push(
      <JobAdSkeletonStyles sx={props.sx} variant={props.variant} />
    );
  }

  return (
    <div>
      {skeletons.map((item, i) => {
        return <div key={i}>{item}</div>;
      })}
    </div>
  );
};

//creator
export const CreatorDataSkeleton = (props) => {
  return <Skeleton sx={props.sx} variant={props.variant} />;
};
