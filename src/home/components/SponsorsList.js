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

const StyledTitle = styled("h2")({
  color: "#002379",
});

const SponsorsList = (props) => {
  const { sponsor } = props;

  const sponsorsLimit = sponsor.slice(0, 3);

  return (
    <>
      <StyledTitle>Sponsors</StyledTitle>
      <StyledPaper elevation={0}>
        {sponsorsLimit.map((supporter, i) => (
          <StyledLink key={supporter.id} to={`/jobs/${supporter._id}`}>
            <Sponsors
              logo={`${process.env.REACT_APP_IMAGE}${supporter?.image}`}
              description={supporter.description.substring(0, 25) + "..."}
              company={supporter.creator.company}
              salary={supporter.salary}
              location={supporter.location}
            />
          </StyledLink>
        ))}
      </StyledPaper>
    </>
  );
};

export default SponsorsList;
