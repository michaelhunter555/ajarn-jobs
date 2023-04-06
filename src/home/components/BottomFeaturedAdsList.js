import React from 'react';

import { RiAdvertisementLine } from 'react-icons/ri';
import { Link as RouterLink } from 'react-router-dom';

import {
  Link,
  List,
  ListItem,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import BottomFeaturedAds from './BottomFeaturedAds';

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
  const { footerJobs } = props;

  return (
    <StyledList>
      <RiAdvertisementLine style={{ color: "gray" }} size={20} />

      {footerJobs.map((job, i) => (
        <Link component={RouterLink} key={job.id} to={`/jobs/${job.id}`}>
          <ListItem>
            <BottomFeaturedAds
              image={job.creator.logoUrl}
              id={job.id}
              title={job.title}
              salary={job.salary}
              hours={job.hours}
              school={job.creator.company}
              location={job.location}
              featured={job.jobType.featured}
            />
          </ListItem>
        </Link>
      ))}
    </StyledList>
  );
};

export default BottomFeaturedAdsList;
