import React from "react";

import { Link } from "react-router-dom";

import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

import Sponsors from "./Sponsors";

const StyledPaper = styled(Paper)({
  maxHeight: "100%",
  overflow: "auto",
});

const StyledLink = styled(Link)({
  color: "rgb(92, 92, 92)",
  textDecoration: "none",
});

const SponsorsList = (props) => {
  const { sponsor } = props;
  return (
    <StyledPaper>
      {sponsor.map((supporter, i) => (
        <StyledLink key={supporter.id} to={`/jobs/${supporter.id}`}>
          <Sponsors
            logo={supporter.creator.logoUrl}
            description={supporter.description.substring(0, 25) + "..."}
            company={supporter.creator.company}
            salary={supporter.salary}
            location={supporter.location}
          />
        </StyledLink>
      ))}
    </StyledPaper>
  );
};

export default SponsorsList;
