import React, { useContext } from "react";

import { Link } from "react-router-dom";

import {
  CardMedia,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { AuthContext } from "../../../shared/context/auth-context";

const teachers =
  "https://res.cloudinary.com/dtqbxfe7r/image/upload/v1721617133/teachers-page-card_n6ogm0.svg";

const handleExpirationOffer = () => {
  const date = new Date();
  const time = 60 * 24 * 60 * 60 * 1000;
  const expires = new Date(date.getTime() + time);
  const localizedEndDate = expires.toLocaleString().split(",")[0];

  return `${localizedEndDate}`;
};
const TeacherPageOffer = () => {
  const auth = useContext(AuthContext);
  const teacherPromo = handleExpirationOffer();

  return (
    <Paper sx={{ padding: "1rem", borderRadius: "15px" }}>
      <Stack>
        <Typography variant="h6">Teacher Buffet Promo</Typography>
        <CardMedia component="img" alt="buffet-promo" src={teachers} />
      </Stack>
      <Typography variant="subtitle2" color="text.secondary">
        Finding teachers that fit your roles may not be as easy as it seems.
        That's why buffet options for 14-day or 1-month buffet have been reduced
        until <b>{teacherPromo}</b>. Find the best teacher for your job and get
        back to what's most important.
      </Typography>
      <Divider sx={{ margin: "0.5em auto" }} />
      <Stack alignItems="end">
        <Chip
          label="Get Started"
          color="primary"
          clickable
          component={Link}
          to={`/users/${auth?.user?._id}`}
        />
      </Stack>
    </Paper>
  );
};

export default TeacherPageOffer;
