import React from 'react';
import { Link } from 'react-router-dom';
import { Paper,Card, CardActionArea, CardContent, Grid, Typography, Chip, CardMedia, Stack } from '@mui/material';
import { styled, useTheme, } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import EmployerPromoImage from '../../../assets/employer-promo_dash.svg';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useThemeToggle } from '../../context/theme-context';

const StyledMediaCard = styled(CardMedia)({
    width: "75%",
    height: 75,
    border: "1px solid #e5e5e5",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        borderColor: "rgba(0, 128, 255, 0.8)",
    },
    borderRadius: 3,
});


const EmployerPromoCard = ({ isLoggedIn, userId}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const { isDarkMode } = useThemeToggle();

    return (
        <Card component={Paper} elevation={0} sx={{ 
            background: "linear-gradient(135deg, rgba(18,140,177,0.12), rgba(255,162,162,0.10))", margin: "1rem auto", width: isMobile ? "100%" : "65%" }}>
        <CardActionArea>
          <CardContent>
            <Grid container direction="row" spacing={2} sx={{ position: isMobile ? "relative" : "static" }}>
              <Grid item xs={12} sm={4} lg={3} xl={3}>
                 <StyledMediaCard
                  component="img"
                  src={EmployerPromoImage}
                  alt="Employer Promo"
                  sx={{ width: "100% ", height: "100%", objectFit: "cover" }}
                /> 
                <Chip sx={{ top: 5, left: 20, position: "absolute", backgroundColor: "white", color: "black" }} size="small" label="limited offer!" />

              </Grid>

              <Grid item xs={12} sm={8} md={8} lg={9} xl={9}>
                <Stack spacing={2}>
                    <Stack direction={isMobile ? "column" : "row"} spacing={2} alignItems="center">

                <Typography
                  sx={{ color: "black" }}
                  variant="body1"
                  fontWeight={"bold"}
                  
                >
                We're Growing! Employers Get Free Job Postings credits after signing up. No payment information required.
                </Typography>
                    </Stack>
                <Typography gutterBottom variant="subtitle2" color="text.secondary">
                    You post the job, we source the teachers. Each posting is valid for 60 days.
                </Typography>

                <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Chip clickable component={Link} to={isLoggedIn ? `/users/${userId}` : "/auth"} label="Learn More" color="primary" icon={<ArrowRightIcon />} />
                </Stack>

                </Stack>
               
        
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    )
}

export default EmployerPromoCard;