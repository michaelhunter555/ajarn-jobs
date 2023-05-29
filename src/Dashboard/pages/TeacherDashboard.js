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

const TEACHER = "teacher";
const EMPLOYER = "employer";
const PROFILE = "profile";
const JOB_LISTINGS = "job-listings";
const APPLICATIONS = "applications";
const RESUME = "resume";
const COVER_LETTER = "cover-letter";
const CREATOR = "creator";
const SETTINGS = "settings";
const LOGOUT = "logout";

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

  //initial test of api cache call

  // const getUserInfo = async (userId) => {
  //   if (userId) {
  //     const response = await fetch(`${process.env.REACT_APP_USERS}/${userId}`);
  //     const data = await response.json();
  //     console.log(data);
  //     return data.user;
  //   } else {
  //     return null;
  //   }
  // };

  // const { data: userInfo, isLoading: userInfoLoading } = useQuery(
  //   ["userInfo", userId],
  //   () => getUserInfo(userId),
  //   {
  //     initialData: async () => auth.user || null,
  //   }
  // );

  // console.log("UserInfo Query Call:", userInfo);

  // const { data: userInfo, isLoading: userInfoLoading } = useQuery(
  //   ["userInfo", userId],
  //   async () => {
  //     if (userId) {
  //       const response = await usersClient.query(
  //         `${process.env.REACT_APP_USERS}/${userId}`
  //       );
  //       queryClient.setQueryData(["userInfo", userId], response?.user);
  //       auth?.updateUser(response.user);
  //       return response?.users;
  //     } else {
  //       return null;
  //     }
  //   },
  //   {
  //     initialData: async () => auth.user || null,
  //   }
  // );

  //does the user have a resume?
  const authHasResume = !auth.user?.resume
    ? "Add Work History Item"
    : "Add More Work";

  //GET user by ID
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

  //get job ads
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
    const resumeItem = {
      id: "temp-" + new Date().getTime(),
      isNew: true,
      company: "",
      schoolName: "",
      role: "",
      location: "",
      jobTitle: "",
      from: "",
      to: "",
    };

    auth.updateUser({
      ...auth.user,
      resume: [...auth.user?.resume, resumeItem],
    });
    console.log(auth.user);
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

  //if auth is an employer and has a creator account, make the creator component default.
  const authIsCreator =
    auth.user?.userType === EMPLOYER && auth.user?.creator !== null;

  //Sidebar component rendering
  const renderComponent = () => {
    switch (currentComponent) {
      case PROFILE:
        return (
          <>
            {auth.user?.userType === TEACHER && (
              <ProfileInformation user={auth.user} />
            )}
            {authIsCreator ? (
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
      case JOB_LISTINGS:
        /*auth.user.jobs */
        return <JobAdsList job={jobs} />;
      case APPLICATIONS:
        return <Applications />;
      case RESUME:
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
            <Button onClick={addNewResumeItem}>{authHasResume}</Button>
          </>
        );
      case COVER_LETTER:
        return <CoverLetter />;
      case CREATOR:
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
      case SETTINGS:
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
      case LOGOUT:
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

  //dashboard loading state
  const homeDashLoadingState =
    userProfileLoading || jobsIsLoading || jobAdIsLoading;

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
          {homeDashLoadingState && (
            <Skeleton
              sx={{ margin: "0 auto", borderRadius: "6px" }}
              variant="rectangular"
              height={310}
              width={250}
            />
          )}
          {!homeDashLoadingState && (
            <Sidebar onMenuItemClick={handleMenuItemClick} />
          )}
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
              {homeDashLoadingState && (
                <Skeleton
                  sx={{ margin: "0 auto", borderRadius: "6px" }}
                  variant="rectangular"
                  height={114}
                  width={374}
                />
              )}
              {!homeDashLoadingState && (
                <UserProfileJobAd
                  id={jobAd[0]?._id}
                  logo={jobAd[0]?.image}
                  title={jobAd[0]?.title}
                  description={jobAd[0]?.description}
                />
              )}
            </Grid>

            <Grid item>
              {homeDashLoadingState && (
                <Skeleton
                  sx={{ margin: "0 auto", borderRadius: "6px" }}
                  variant="rectangular"
                  height={114}
                  width={374}
                />
              )}
              {!homeDashLoadingState && (
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
            {homeDashLoadingState && (
              <Stack justifyContent="flex-End">
                <Skeleton height={80} variant="rectangular" />
                <Skeleton height={180} variant="rectangular" />
                <Skeleton height={30} width="60%" />
                <Skeleton height={30} />
                <Skeleton height={30} />
              </Stack>
            )}
            {!homeDashLoadingState && renderComponent()}
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          {homeDashLoadingState ? (
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
