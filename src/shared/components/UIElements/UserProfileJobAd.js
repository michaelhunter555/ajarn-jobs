import React from "react";

import { Link } from "react-router-dom";

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledJobAdCard = styled(
  Card,
  "div"
)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: "1px solid #faea92",
}));

const StyledMediaCard = styled(CardMedia)({
  width: "75%",
  height: 70,
  border: "1px solid #e5e5e5",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
    borderColor: "rgba(0, 128, 255, 0.8)",
  },
  borderRadius: 3,
});

const UserProfileJobAd = (props) => {
  return (
    <Link
      to={`/jobs/${props.id}/${props.title.replace(/\s+/g, "-").toLowerCase()}`}
      sx={{ textDecoration: "none" }}
    >
      <StyledJobAdCard>
        <CardActionArea>
          <CardContent>
            <Grid container direction="row">
              <Grid item xs={4} sm={4} lg={3} xl={4}>
                <StyledMediaCard
                  component="img"
                  src={props.logo}
                  alt={`${props.id}`}
                />
              </Grid>

              <Grid item xs={8} sm={8} md={8} lg={9} xl={8}>
                <Typography
                  gutterBottom
                  color="primary"
                  variant="h5"
                  component="div"
                  sx={{ fontSize: 16 }}
                >
                  {props.title.length > 35
                    ? props.title.substring(0, 35) + "..."
                    : props.title}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {props.description.length > 60
                    ? props.description.substring(0, 60) + "..."
                    : props.description}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </StyledJobAdCard>
    </Link>
  );
};

export default UserProfileJobAd;
