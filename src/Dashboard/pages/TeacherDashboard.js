import React, { useContext, useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { Button, Grid, Skeleton, Stack } from "@mui/material";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import JobAdsList from "../../shared/components/UIElements/JobAdsList";
import UserProfileJobAd from "../../shared/components/UIElements/UserProfileJobAd";
import { AuthContext } from "../../shared/context/auth-context";
import { useCreator } from "../../shared/hooks/creator-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useJob } from "../../shared/hooks/jobs-hook";
import { useResume } from "../../shared/hooks/resume-hook";
import { useSettingsToggle } from "../../shared/hooks/toggle-hook";
import { useUser } from "../../shared/hooks/user-hook";
import TeacherItem from "../../users/components/TeacherItem";
import Applications from "../components/Profile/Applications";
import CoverLetter from "../components/Profile/CoverLetter";
import Creator from "../components/Profile/Creator";
import FeaturedCard from "../components/Profile/FeaturedCard";
import ProfileInformation from "../components/Profile/ProfileInformation";
import TeacherSettings from "../components/Profile/TeacherSettings";
import UpdateResumeItem from "../components/Profile/UpdateResumeItem";
import Sidebar from "../components/Sidebar";

const TeacherDashboard = () => {
  const userId = useParams().id;
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentComponent, setCurrentComponent] = useState("profile");
  const [selectedCard, setSelectedCard] = useState(null);
  const [jobAd, setJobAd] = useState([]);
  const {
    //get and update user profile
    users,
    getAllUsers,
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
    //update user role and search result visibility
    updateRoleChange,
    updateUserVisibility,
    isLoading: settingToggleIsLoading,
    error: settingToggleError,
    clearError: clearSettingToggleError,
  } = useSettingsToggle();
  const {
    // get list of user jobs
    jobs,
    getJobsByUserId,
    isLoading: jobsIsLoading,
    error: gettingJobsError,
    clearError: clearGettingJobsError,
  } = useJob();
  const {
    isLoading: jobAdIsLoading,
    error: jobAdError,
    sendRequest: sendJobAdRequest,
    clearError: clearJobAdError,
  } = useHttpClient();

  //GET user profile information
  useEffect(() => {
    if (userId) {
      getUserInformation(userId);
    }
  }, [userId, getUserInformation]);

  //GET users current jobs for creator dash and
  useEffect(() => {
    getJobsByUserId(userId);
  }, [userId, getJobsByUserId]);

  //GET all users
  useEffect(() => {
    if (!users || users.length === 0) {
      getAllUsers();
    }
  }, [getAllUsers, users]);

  //get random user card
  useEffect(() => {
    if (users && users.length > 0 && !selectedCard) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      setSelectedCard(randomUser);
    }
  }, [selectedCard, users]);

  useEffect(() => {
    const getJobAds = async () => {
      const response = await sendJobAdRequest(`${process.env.REACT_APP_JOBS}`);
      setJobAd(response.jobs);
    };
    getJobAds();
  }, [sendJobAdRequest]);

  //PATCH General Profile Info Upate
  const handleProfileUpdate = (update) => {
    updateUserProfile(userId, update);
  };

  // PATCH Update Resume
  const handleResumeUpdate = (updatedResumeItem) => {
    updateUserResume(userId, updatedResumeItem);
  };

  //PATCH Delete Resume
  const handleResumeDelete = (resumeItem) => {
    deleteUserResume(userId, resumeItem);
  };

  //PATCH update creator information
  const handleCreatorUpdate = (creatorItem) => {
    updateCreator(userId, creatorItem);
  };

  //PATCH remove Creator Data
  const handleCreatorDelete = (creatorItem) => {
    deleteCreator(userId, creatorItem);
  };

  //PATCH toggle between teacher or employer
  const handleRoleChange = () => {
    updateRoleChange(userId);
  };

  //PATCH isHidden property for search results.
  const handleUserVisibility = () => {
    updateUserVisibility(userId);
  };

  //Add resume items
  const addNewResumeItem = () => {
    auth.updateUser({
      //copy of current user object
      ...auth.user,
      //we return resume key with array containing a copy of the user's current resume
      resume: [
        ...auth.user.resume,
        { id: "new-" + new Date().getTime(), isNew: true },
      ],
    });
  };

  const clearResumeItem = (cancelResumeItem) => {
    auth.updateUser({
      //copy of current user object
      ...auth.user,
      //we return resume key with array containing a copy of the user's current resume
      resume: auth.user.resume.filter(
        (resItem) => resItem._id !== cancelResumeItem._id
      ),
    });
  };

  //Add creator profile
  const addCreatorItem = () => {
    const creatorItem = {
      ...auth.user,
      creator: {
        id: "creator-" + new Date().getTime(),
        isNew: true,
      },
    };
    auth.updateUser(creatorItem);
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
        return auth.user && <ProfileInformation user={auth.user} />;
      case "job-listings":
        /*auth.user.jobs */
        return <JobAdsList job={jobs} />;
      case "applications":
        return <Applications />;
      case "resume":
        return (
          <>
            {auth.user?.resume?.map((resumeItem) => (
              <UpdateResumeItem
                key={resumeItem?._id}
                resumeItem={resumeItem}
                onUpdate={handleResumeUpdate}
                onDelete={() => handleResumeDelete(resumeItem)}
                onCancel={(canceledResumeItem) =>
                  clearResumeItem(canceledResumeItem)
                }
              />
            ))}
            <Button onClick={addNewResumeItem}>Add New Resume</Button>
          </>
        );
      case "cover-letter":
        return <CoverLetter />;
      case "creator":
        return (
          <>
            {auth.user?.creator ? (
              <Creator
                creatorItem={auth.user?.creator}
                onUpdate={handleCreatorUpdate}
                onDelete={() => handleCreatorDelete(auth.user?.creator)}
              />
            ) : (
              <Button onClick={addCreatorItem}>Creator Account</Button>
            )}
          </>
        );
      case "settings":
        const isTeacher = auth.user?.userType === "teacher";
        const isHidden = auth.user?.isHidden;
        return (
          <TeacherSettings
            isSchool={isTeacher}
            user={auth.user}
            onClickToggle={handleRoleChange}
            onProfileUpdate={handleProfileUpdate}
            onToggleVisibility={handleUserVisibility}
            isHidden={isHidden}
          />
        );
      case "logout":
        auth.logout();
        navigate("/");
        break;
      default:
        return <ProfileInformation user={auth.user} />;
    }
  };

  const isLoading =
    userProfileLoading ||
    userResumeUpdating ||
    updatingCreator ||
    settingToggleIsLoading ||
    jobsIsLoading ||
    jobAdIsLoading;
  const error =
    getUserProfileError ||
    userResumeError ||
    creatorUpdatingError ||
    settingToggleError ||
    gettingJobsError ||
    jobAdError;
  const combinedClearError = () => {
    clearUserProfileError();
    clearResumeError();
    clearCreatorError();
    clearSettingToggleError();
    clearGettingJobsError();
    clearJobAdError();
  };

  return (
    <>
      <ErrorModal error={error} onClear={combinedClearError} />
      <Grid
        container
        spacing={1}
        sx={{
          maxWidth: "90%",
          margin: "0 auto",
        }}
      >
        <Grid item xs={12} md={2}>
          {isLoading && (
            <Skeleton
              sx={{ margin: "0 auto", borderRadius: "6px" }}
              variant="rectangular"
              height={310}
              width={250}
            />
          )}
          {!isLoading && <Sidebar onMenuItemClick={handleMenuItemClick} />}
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
              {isLoading && (
                <Skeleton
                  sx={{ margin: "0 auto", borderRadius: "6px" }}
                  variant="rectangular"
                  height={114}
                  width={374}
                />
              )}
              {!isLoading && (
                <UserProfileJobAd
                  id={jobAd[0]?._id}
                  logo={jobAd[0]?.image}
                  title={jobAd[0]?.title}
                  description={jobAd[0]?.description}
                />
              )}
            </Grid>

            <Grid item>
              {isLoading && (
                <Skeleton
                  sx={{ margin: "0 auto", borderRadius: "6px" }}
                  variant="rectangular"
                  height={114}
                  width={374}
                />
              )}
              {!isLoading && (
                <UserProfileJobAd
                  id={jobAd[1]?._id}
                  logo={jobAd[1]?.image}
                  title={jobAd[1]?.title}
                  description={jobAd[1]?.description}
                />
              )}
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
            {isLoading && (
              <Stack justifyContent="flex-End">
                <Skeleton height={80} variant="rectangular" />
                <Skeleton height={180} variant="rectangular" />
                <Skeleton height={30} width="60%" />
                <Skeleton height={30} />
                <Skeleton height={30} />
              </Stack>
            )}
            {!isLoading && renderComponent()}
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          {isLoading ? (
            <>
              <Skeleton
                sx={{ margin: "1rem 0.5rem 1rem 1rem", borderRadius: "6px" }}
                variant="rectangular"
                height={372}
                width={343}
              />
            </>
          ) : auth.user?.userType === "teacher" ? (
            <FeaturedCard />
          ) : (
            <TeacherItem
              id={id}
              name={name}
              currentLocation={location}
              nationality={nationality}
              workExperience={workExperience}
              image={`${process.env.REACT_APP_IMAGE}${image}`}
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
