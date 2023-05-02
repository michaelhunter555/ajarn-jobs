import React, { useContext, useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { Button, Grid } from "@mui/material";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import JobAdsList from "../../shared/components/UIElements/JobAdsList";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import UserProfileJobAd from "../../shared/components/UIElements/UserProfileJobAd";
import { AuthContext } from "../../shared/context/auth-context";
import { useCreator } from "../../shared/hooks/creator-hook";
import { useResume } from "../../shared/hooks/resume-hook";
import { useSettingsToggle } from "../../shared/hooks/toggle-hook";
import { useUser } from "../../shared/hooks/user-hook";
import { dummy_jobs } from "../../shared/util/DummyJobs";
import { DUMMY_USERS_LIST } from "../../shared/util/DummyUsers";
import TeacherItem from "../../users/components/TeacherItem";
import Applications from "../components/Profile/Applications";
import Creator from "../components/Profile/Creator";
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
  const [selectedCard, setSelectedCard] = useState(null);
  const {
    //get and update user profile
    getUserInformation,
    updateUserProfile,
    isLoading: userProfileLoading,
    error: getUserProfileError,
    clearError: clearUserProfileError,
  } = useUser();
  const {
    //update and delete user resume
    updateUserResume,
    deleteUserResume,
    isLoading: userResumeUpdating,
    error: userResumeError,
    clearError: clearResumeError,
  } = useResume();
  const {
    //create and delete creator account
    updateCreator,
    deleteCreator,
    isLoading: updatingCreator,
    error: creatorUpdatingError,
    clearError: clearCreatorError,
  } = useCreator();
  const {
    updateRoleChange,
    updateUserVisibility,
    isLoading: settingToggleIsLoading,
    error: settingToggleError,
    clearError: clearSettingToggleError,
  } = useSettingsToggle();

  //get random user card if user is employer
  useEffect(() => {
    const randomUser =
      DUMMY_USERS_LIST[Math.floor(Math.random() * DUMMY_USERS_LIST.length)];
    setSelectedCard(randomUser);
  }, []);

  //GET user profile information
  useEffect(() => {
    if (userId) {
      getUserInformation(userId);
    }
  }, [userId, getUserInformation]);

  //PATCH General Profile Info Upate
  const handleProfileUpdate = async (update) => {
    updateUserProfile(userId, update);
  };

  // PATCH Update Resume
  const handleResumeUpdate = async (updatedResumeItem) => {
    updateUserResume(userId, updatedResumeItem);
  };

  //PATCH Delete Resume
  const handleResumeDelete = async (resumeItem) => {
    deleteUserResume(userId, resumeItem);
  };

  //PATCH update creator information
  const handleCreatorUpdate = async (creatorItem) => {
    updateCreator(userId, creatorItem);
  };

  //PATCH remove Creator Data
  const handleCreatorDelete = async (creatorItem) => {
    deleteCreator(userId, creatorItem);
  };

  //PATCH toggle between teacher or employer
  const handleRoleChange = async () => {
    updateRoleChange(userId);
  };

  //PATCH isHidden property for search results.
  const handleUserVisibility = async () => {
    updateUserVisibility(userId);
  };

  //Add resume items
  const addNewResumeItem = () => {
    authCtx.updateUser({
      //copy of current user object
      ...authCtx.user,
      //we return resume key with array containing a copy of the user's current resume
      resume: [
        ...authCtx.user.resume,
        { id: "new-" + new Date().getTime(), isNew: true },
      ],
    });
  };

  //Add creator profile
  const addCreatorItem = () => {
    const creatorItem = {
      ...authCtx.user,
      creator: {
        id: "creator-" + new Date().getTime(),
        isNew: true,
      },
    };
    authCtx.updateUser(creatorItem);
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

  //sidebar component rendering
  const handleMenuItemClick = (componentName) => {
    setCurrentComponent(componentName);
  };

  //Sidebar component rendering
  const renderComponent = () => {
    switch (currentComponent) {
      case "profile":
        return authCtx.user && <ProfileInformation user={authCtx.user} />;
      case "job-listings":
        return <JobAdsList job={dummy_jobs} />;
      case "applications":
        return <Applications />;
      case "resume":
        return (
          <>
            {authCtx.user?.resume?.map((resumeItem) => (
              <UpdateResumeItem
                key={resumeItem?._id}
                resumeItem={resumeItem}
                onUpdate={handleResumeUpdate}
                onDelete={() => handleResumeDelete(resumeItem)}
              />
            ))}
            <Button onClick={addNewResumeItem}>Add New Resume</Button>
          </>
        );
      case "creator":
        return (
          <>
            {authCtx.user?.creator ? (
              <Creator
                creatorItem={authCtx.user?.creator}
                onUpdate={handleCreatorUpdate}
                onDelete={() => handleCreatorDelete(authCtx.user?.creator)}
              />
            ) : (
              <Button onClick={addCreatorItem}>Creator Account</Button>
            )}
          </>
        );
      case "settings":
        const isTeacher = authCtx.user?.userType === "teacher";
        const isHidden = authCtx.user?.isHidden;
        return (
          <TeacherSettings
            isSchool={isTeacher}
            user={authCtx.user}
            onClickToggle={handleRoleChange}
            onProfileUpdate={handleProfileUpdate}
            onToggleVisibility={handleUserVisibility}
            isHidden={isHidden}
          />
        );
      case "logout":
        authCtx.logout();
        navigate("/");
        break;
      default:
        return <ProfileInformation user={authCtx.user} />;
    }
  };

  const isLoading =
    userProfileLoading ||
    userResumeUpdating ||
    updatingCreator ||
    settingToggleIsLoading;
  const error =
    getUserProfileError ||
    userResumeError ||
    creatorUpdatingError ||
    settingToggleError;
  const combinedClearError = () => {
    clearUserProfileError();
    clearResumeError();
    clearCreatorError();
    clearSettingToggleError();
  };

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      <ErrorModal error={error} onClear={combinedClearError} />
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
          {authCtx.user.userType === "teacher" ? (
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
