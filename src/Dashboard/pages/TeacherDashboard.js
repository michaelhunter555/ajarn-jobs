import React, {
  useContext,
  useState,
} from 'react';

import { useNavigate } from 'react-router-dom';

import { Grid } from '@mui/material';

import JobAdsList from '../../shared/components/UIElements/JobAdsList';
import UserProfileJobAd
  from '../../shared/components/UIElements/UserProfileJobAd';
import { AuthContext } from '../../shared/context/auth-context';
import { dummy_jobs } from '../../shared/util/DummyJobs';
import { DUMMY_USERS_LIST } from '../../shared/util/DummyUsers';
import TeacherItem from '../../users/components/TeacherItem';
import Applications from '../components/Profile/Applications';
import FeaturedCard from '../components/Profile/FeaturedCard';
import ProfileInformation from '../components/Profile/ProfileInformation';
import TeacherSettings from '../components/Profile/TeacherSettings';
import Sidebar from '../components/Sidebar';

const TeacherDashboard = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentComponent, setCurrentComponent] = useState("profile");
  const [isTeacher, setIsTeacher] = useState(true);

  const {
    id,
    name,
    location,
    nationality,
    workExperience,
    image,
    highestCertification,
    about,
  } = DUMMY_USERS_LIST[0];

  const handleMenuItemClick = (componentName) => {
    setCurrentComponent(componentName);
  };

  const handleRoleChange = () => {
    setIsTeacher((prev) => !prev);
  };

  const renderComponent = () => {
    switch (currentComponent) {
      case "profile":
        return <ProfileInformation />;
      case "job-listings":
        return <JobAdsList job={dummy_jobs} />;
      case "applications":
        return <Applications />;
      case "settings":
        return (
          <TeacherSettings
            isSchool={isTeacher}
            onClickToggle={handleRoleChange}
          />
        );
      case "logout":
        authCtx.logout();
        navigate("/");
        break;
      default:
        return <ProfileInformation />;
    }
  };

  return (
    <Grid container spacing={1} sx={{ maxWidth: "90%", margin: "0 auto" }}>
      <Grid item xs={12} md={2}>
        <Sidebar onMenuItemClick={handleMenuItemClick} />
      </Grid>

      <Grid item xs={12} md={6}>
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "1rem",
            gap: "5px",
          }}
        >
          <Grid item>
            <UserProfileJobAd
              id={dummy_jobs[0].id}
              logo={dummy_jobs[0].creator.logoUrl}
              title={dummy_jobs[0].title}
              description={dummy_jobs[0].description}
            />
          </Grid>

          <Grid item>
            <UserProfileJobAd
              id={dummy_jobs[0].id}
              logo={dummy_jobs[0].creator.logoUrl}
              title={dummy_jobs[0].title}
              description={dummy_jobs[0].description}
            />
          </Grid>
        </Grid>

        <Grid
          item
          sx={{
            maxWidth: "100%",
            display: "flex",
            justifyContet: "flex-start",
            flexDirection: "column",
          }}
        >
          {renderComponent()}
        </Grid>
      </Grid>
      <Grid item xs={12} md={3}>
        {isTeacher ? (
          <FeaturedCard />
        ) : (
          <TeacherItem
            id={id}
            name={name}
            currentLocation={location}
            nationality={nationality}
            workExperience={workExperience}
            image={image}
            degree={highestCertification}
            about={about}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default TeacherDashboard;
