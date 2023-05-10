import React from "react";

import { Skeleton } from "@mui/material";

//job ad skeleton
export const JobAdSkeleton = (props) => {
  let skeletons = [];

  for (let i = 0; i < props.num; i++) {
    skeletons.push(<Skeleton sx={props.sx} variant={props.variant} />);
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
