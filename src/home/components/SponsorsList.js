import React from "react";

import { Link } from "react-router-dom";

import { Paper } from "@mui/material";

import Sponsors from "./Sponsors";

const SponsorsList = (props) => {
  const { sponsor } = props;
  return (
    <Paper sx={{ maxHeight: "100%", overflow: "auto" }}>
      {sponsor.map((supporter, i) => (
        <Link
          key={supporter.id}
          style={{ color: "rgb(92, 92, 92)", textDecoration: "none" }}
          to={`/jobs/${supporter.id}`}
        >
          <Sponsors
            logo={supporter.creator.logoUrl}
            description={supporter.description.substring(0, 25) + "..."}
            company={supporter.creator.company}
            salary={supporter.salary}
            location={supporter.location}
          />
        </Link>
      ))}
    </Paper>
  );
};

export default SponsorsList;
