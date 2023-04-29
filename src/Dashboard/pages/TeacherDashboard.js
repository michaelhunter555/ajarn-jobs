import React, { useContext, useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { Button, Grid } from "@mui/material";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import JobAdsList from "../../shared/components/UIElements/JobAdsList";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import UserProfileJobAd from "../../shared/components/UIElements/UserProfileJobAd";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { dummy_jobs } from "../../shared/util/DummyJobs";
import { DUMMY_USERS_LIST } from "../../shared/util/DummyUsers";
import TeacherItem from "../../users/components/TeacherItem";
import Applications from "../components/Profile/Applications";
import FeaturedCard from "../components/Profile/FeaturedCard";
import ProfileInformation from "../components/Profile/ProfileInformation";
import TeacherSettings from "../components/Profile/TeacherSettings";
import UpdateResumeItem from "../components/Profile/UpdateResumeItem";
import Sidebar from "../components/Sidebar";

const TeacherDashboard = () => {
  const userId = useParams().id;
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentComponent, setCurrentComponent] = useState("profile");
  const [isTeacher, setIsTeacher] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const randomUser =
      DUMMY_USERS_LIST[Math.floor(Math.random() * DUMMY_USERS_LIST.length)];
    setSelectedCard(randomUser);
  }, []);

  useEffect(() => {
    const getUserInformation = async () => {
      try {
        const response = await sendRequest(
          `http://localhost:5000/api/user/${userId}`
        );
        setCurrentUser(response.user);
        console.log(response);
      } catch (err) {}
    };
    getUserInformation();
  }, [sendRequest, userId]);

  const handleResumeUpdate = async (updatedResumeItem) => {
    try {
      await sendRequest(
        `http://localhost:5000/api/user/update-profile/${userId}`,
        "PATCH",
        JSON.stringify({ resume: updatedResumeItem }),
        { "Content-type": "application/json" }
      );

      setCurrentUser((prev) => {
        const updatedResume = prev.resume.map((resumeItem) => {
          return resumeItem.id === updatedResumeItem.id
            ? updatedResumeItem
            : resumeItem;
        });
        return { ...prev, resume: updatedResume };
      });
    } catch (err) {}
    console.log("updated resume", updatedResumeItem);
  };

  const handleResumeDelete = async (resumeItem) => {
    try {
      await sendRequest(
        `http://localhost:5000/api/user/update-profile/${userId}`,
        "PATCH",
        JSON.stringify({ deleteResume: resumeItem }),
        { "Content-Type": "application/json" }
      );

      setCurrentUser((prev) => {
        const updatedResume = prev.resume.filter(
          (r) => r._id !== resumeItem._id
        );
        return { ...prev, resume: updatedResume };
      });
    } catch (err) {}
  };

  const addNewResumeItem = () => {
    setCurrentUser({
      ...currentUser,
      resume: [
        ...currentUser.resume,
        { id: "new-" + new Date().getTime(), isNew: true },
      ],
    });
  };

  const {
    id,
    name,
    location,
    nationality,
    workExperience,
    image,
    highestCertification,
    about,
  } = selectedCard || {};

  const handleMenuItemClick = (componentName) => {
    setCurrentComponent(componentName);
  };

  const handleRoleChange = () => {
    setIsTeacher((prev) => !prev);
  };

  const renderComponent = () => {
    switch (currentComponent) {
      case "profile":
        return currentUser && <ProfileInformation user={currentUser} />;
      case "job-listings":
        return <JobAdsList job={dummy_jobs} />;
      case "applications":
        return <Applications />;
      case "resume":
        return (
          <>
            {currentUser?.resume?.map((resumeItem) => (
              <UpdateResumeItem
                key={resumeItem?.id}
                resumeItem={resumeItem}
                onUpdate={handleResumeUpdate}
                onDelete={() => handleResumeDelete(resumeItem)}
              />
            ))}
            <Button onClick={addNewResumeItem}>Add New Resume</Button>
          </>
        );
      case "settings":
        return (
          <TeacherSettings
            isSchool={isTeacher}
            user={currentUser}
            onClickToggle={handleRoleChange}
          />
        );
      case "logout":
        authCtx.logout();
        navigate("/");
        break;
      default:
        return <ProfileInformation user={currentUser} />;
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      <ErrorModal error={error} onClear={clearError} />
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
    </>
  );
};

export default TeacherDashboard;
