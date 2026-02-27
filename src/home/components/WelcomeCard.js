import React from "react";

import { Link } from "react-router-dom";

import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Paper,
  Typography,
} from "@mui/material";

const welcomeImg =
  "https://res.cloudinary.com/dtqbxfe7r/image/upload/v1721978806/sign-up_obafm7.svg";

const WelcomeCard = () => {
  return (
    <>
     
      <Paper elevation={0} sx={{ borderRadius: 5 }}>
        <CardMedia
          sx={{
            padding: 2,
            width: { xs: "100%", md: "85%" },
            height: { xs: "100%", md: "85%" },
            margin: "0 auto",
          }}
          component="img"
          src={welcomeImg}
          alt="welcome-ajarn-jobs"
        />
        <CardContent>
          <Typography variant="subtitle2" color="text.secondary">
            Interested in finding teaching jobs in Thailand? Simplify the job
            finding process in few clicks. Sign up, fill out some basic
            information about yourself, add a resume & coverletter then start
            applying!
          </Typography>
        </CardContent>
        <Divider />
        <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            component={Link}
            to="/auth?name=signUp"
            sx={{ marginRight: "1rem" }}
          >
            Get started
          </Button>
        </CardActions>
      </Paper>
    </>
  );
};

export default WelcomeCard;
