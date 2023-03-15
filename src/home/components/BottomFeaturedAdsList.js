import React from "react";

import { RiAdvertisementLine } from "react-icons/ri";
import { Link as RouterLink } from "react-router-dom";

import { Link, List, ListItem } from "@mui/material";

import BottomFeaturedAds from "./BottomFeaturedAds";

const BottomFeaturedAdsList = (props) => {
  const { footerJobs } = props;

  return (
    <List
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: "5em",
      }}
    >
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
            />
          </ListItem>
        </Link>
      ))}
    </List>
  );
};

export default BottomFeaturedAdsList;
