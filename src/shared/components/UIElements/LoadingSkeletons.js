import React from 'react';

import { Skeleton } from '@mui/material';

export const LoadingSkeletons = () => {
  return <div>LoadingSkeletons</div>;
};

export const DashBoardSkeleton = () => {
  return <div>YOLO</div>;
};

//job ad skeleton
export const JobAdSkeleton = (props) => {
  let skeletons = [];

  for (let i = 0; i < props.num; i++) {
    skeletons.push(
      <Skeleton
        sx={{ margin: "0.5rem 0 0.5rem 0", height: "136px", borderRadius: '6px' }}
        variant={props.variant}
      />
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

export const CreatorDataSkeleton = () => {
  return <Skeleton />;
};
