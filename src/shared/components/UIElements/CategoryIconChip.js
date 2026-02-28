import React from "react";

import Diversity3TwoToneIcon from "@mui/icons-material/Diversity3TwoTone";
import EmojiObjectsTwoToneIcon from "@mui/icons-material/EmojiObjectsTwoTone";
import LocalLibraryTwoToneIcon from "@mui/icons-material/LocalLibraryTwoTone";
import NewspaperTwoToneIcon from "@mui/icons-material/NewspaperTwoTone";
import PsychologyAltTwoToneIcon from "@mui/icons-material/PsychologyAltTwoTone";
import SchoolTwoToneIcon from "@mui/icons-material/SchoolTwoTone";
import ThumbDownOffAltTwoToneIcon from "@mui/icons-material/ThumbDownOffAltTwoTone";
import ThumbUpAltTwoToneIcon from "@mui/icons-material/ThumbUpAltTwoTone";
import VerifiedTwoToneIcon from "@mui/icons-material/VerifiedTwoTone";
import { Chip } from "@mui/material";

const contentPostListIcons = {
  Teaching: <SchoolTwoToneIcon style={{ color: "#0990a4" }} />,
  "Thai Life": <Diversity3TwoToneIcon style={{ color: "#0990a4" }} />,
  "How to": <EmojiObjectsTwoToneIcon style={{ color: "#0990a4" }} />,
  "Learning Thai": <LocalLibraryTwoToneIcon style={{ color: "#0990a4" }} />,
  "Current Events": <NewspaperTwoToneIcon style={{ color: "#0990a4" }} />,
  Sponsored: <VerifiedTwoToneIcon style={{ color: "#0990a4" }} />,
  "Dos and Donts": (
    <>
      <ThumbUpAltTwoToneIcon style={{ fontSize: "18px", color: "#0990a4" }} />
      <ThumbDownOffAltTwoToneIcon
        style={{ fontSize: "18px", color: "#0990a4" }}
      />
    </>
  ),
  Question: <PsychologyAltTwoToneIcon style={{ color: "#0990a4" }} />,
};

const CategoryChip = ({ category, sx }) => {
  return (
    <Chip
      variant="outlined"
      size="small"
      label={category}
      icon={contentPostListIcons[category]}
      sx={{ ...sx }}
    />
  );
};

export default CategoryChip;
