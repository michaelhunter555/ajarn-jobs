import React, { useContext, useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import sanitizeHtml from "sanitize-html";

import { Button, Grid, Skeleton, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";

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
import ProfileProgress from "../components/Profile/ProfileProgress";
import TeacherSettings from "../components/Profile/TeacherSettings";
import UpdateResumeItem from "../components/Profile/UpdateResumeItem";
import UsersContent from "../components/Profile/UsersContent";
import Sidebar, { BottomMobileNav } from "../components/Sidebar";

const TEACHER = "teacher";
const CONTENT = "content";
const EMPLOYER = "employer";
const PROFILE = "profile";
const JOB_LISTINGS = "job-listings";
const APPLICATIONS = "applications";
const RESUME = "resume";
const COVER_LETTER = "cover-letter";
const CREATOR = "creator";
const SETTINGS = "settings";

const JobAdGridContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  marginBottom: "1rem",
  gap: "5px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const StyledGridContainerForProfile = styled(Grid)(({ theme }) => ({
  maxWidth: "100%",
  margin: "0 auto",
  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
  },
}));

const TeacherDashboard = () => {
  const userId = useParams().id;
  const auth = useContext(AuthContext);

  const [currentComponent, setCurrentComponent] = useState("profile");
  const [selectedCard, setSelectedCard] = useState(null);

  const {
    //get and update user profile
    updateUserProfile,
    isPostLoading,
    clearError: clearUserProfileError,
  } = useUser();
  const {
    //update and delete user resume
    updateUserResume,
    deleteUserResume,
    isPostLoading: updatingUserResume,
    error: userResumeError,
    clearError: clearResumeError,
  } = useResume();
  const {
    //loading states for creator account
    isPostLoading: updatingCreator,
    error: creatorUpdatingError,
    clearError: clearCreatorError,
  } = useCreator();
  const {
    //update user role and search result visibility
    updateRoleChange,
    updateUserVisibility,
    error: settingToggleError,
    clearError: clearSettingToggleError,
  } = useSettingsToggle();
  const {
    // get list of user jobs
    error: gettingJobsError,
    clearError: clearGettingJobsError,
  } = useJob();
  const {
    //isLoading: jobAdIsLoading,
    error: jobAdError,
    clearError: clearJobAdError,
  } = useHttpClient();

  //update auth object to reflect most current database
  const getUserProfileInfo = async (userId) => {
    const response = await fetch(`${process.env.REACT_APP_USERS}/${userId}`);
    if (!response.ok) {
      throw new Error("There was an error with profile informatin retrievl.");
    }
    const data = await response.json();

    auth.updateUser(data.user);
    return data.user;
  };
  //useQuery for caching response
  const {
    isLoading: userProfileLoading,
    error: getUserProfileError,
    refetch: refetchUser,
  } = useQuery(["userInfo", auth.user?._id], () =>
    getUserProfileInfo(auth?.user?._id)
  );

  console.log("USER LOGGED IN DASHBOARD:", auth.user);

  //get job ads
  const getJobAds = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_JOBS}`);
      if (!response.ok) {
        throw new Error("There was an error with getJobAds");
      }
      const data = await response.json();

      return data.jobs;
    } catch (err) {
      console.log("There was an error getting the job ads - Msg: " + err);
    }
  };
  //cache jobads with useQuery
  const { data: jobAd, isLoading: jobAdIsLoading } = useQuery(["JobAds"], () =>
    getJobAds()
  );

  //GET user cards
  const getUserCard = async () => {
    const response = await fetch(`${process.env.REACT_APP_USERS}`);

    if (!response.ok) {
      throw new Error("There was an error with getting all users GET request.");
    }
    const data = await response.json();
    return data.users;
  };
  //cache logic for userCards
  const { data: userCards } = useQuery(["userCards"], () => getUserCard());

  //get random user card
  useEffect(() => {
    if (userCards && userCards?.length > 0) {
      const randomUser =
        userCards[Math.floor(Math.random() * userCards?.length)];
      setSelectedCard(randomUser);
    }
  }, [userCards]);

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

  //does the user have a resume?
  const authHasResume =
    auth.user?.resume?.length === 0 ? "Add Work History Item" : "Add More Work";

  const {
    id,
    name,
    location,
    nationality,
    workExperience,
    image,
    highestCertification,
    about,
    education,
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
    try {
      switch (currentComponent) {
        case PROFILE:
          return (
            <>
              {auth.user?.userType === TEACHER && (
                <ProfileInformation user={auth?.user} />
              )}
              {authIsCreator && auth?.user && (
                <Creator
                  user={auth?.user}
                  isLoading={userProfileLoading}
                  refetch={refetchUser}
                />
              )}{" "}
              {auth.user?.userType === EMPLOYER && !authIsCreator && (
                <Button onClick={addCreatorItem}>Creator Account</Button>
              )}
            </>
          );
        case JOB_LISTINGS:
          /*auth.user.jobs */
          return <JobAdsList job={auth.user?.jobs} />;
        case APPLICATIONS:
          return (
            <Applications
              isLoading={userProfileLoading}
              applications={auth?.user?.applications}
            />
          );
        case RESUME:
          return (
            <>
              {!updatingUserResume &&
                auth.user?.resume?.map((resumeItem) => (
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

              {!updatingUserResume && (
                <Button onClick={addNewResumeItem}>{authHasResume}</Button>
              )}
              {updatingUserResume && (
                <Stack justifyContent="flex-End">
                  <Skeleton height={80} variant="rectangular" />
                  <Skeleton height={180} variant="rectangular" />
                </Stack>
              )}
            </>
          );
        case COVER_LETTER:
          return <CoverLetter />;
        case CREATOR:
          return (
            <>
              {!updatingCreator && auth?.user?.creator ? (
                <Creator
                  user={auth?.user}
                  isLoading={userProfileLoading}
                  refetch={refetchUser}
                />
              ) : (
                <Button onClick={addCreatorItem}>Creator Account</Button>
              )}
              {updatingCreator && (
                <Stack justifyContent="flex-End">
                  <Skeleton height={80} variant="rectangular" />
                  <Skeleton height={180} variant="rectangular" />
                  <Skeleton height={30} width="60%" />
                  <Skeleton height={30} />
                  <Skeleton height={30} />
                </Stack>
              )}
            </>
          );
        case CONTENT:
          return (
            <UsersContent isLoading={userProfileLoading} user={auth.user} />
          );
        case SETTINGS:
          const isTeacher = auth.user?.userType === TEACHER;
          const isHidden = auth.user?.isHidden;
          return (
            <>
              {!isPostLoading && (
                <TeacherSettings
                  isTeacher={isTeacher}
                  user={auth.user}
                  onClickToggle={handleRoleChange}
                  onProfileUpdate={handleProfileUpdate}
                  onToggleVisibility={handleUserVisibility}
                  isHidden={isHidden}
                />
              )}
              {isPostLoading && (
                <Stack justifyContent="flex-End">
                  <Skeleton height={80} variant="rectangular" />
                  <Skeleton height={180} variant="rectangular" />
                  <Skeleton height={30} width="60%" />
                  <Skeleton height={30} />
                  <Skeleton height={30} />
                </Stack>
              )}
            </>
          );

        default:
          return <ProfileInformation user={auth.user} />;
      }
    } catch (err) {
      console.log("RenderComponent Error:" + err);
      return <div>{err.message}</div>;
    }
  };

  //dashboard loading state
  const homeDashLoadingState = userProfileLoading || jobAdIsLoading; //|| jobsIsLoading;

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
      <StyledGridContainerForProfile
        container
        spacing={1}
        justifyContent="center"
        sx={{
          maxWidth: "100%",
          margin: "0 auto",
        }}
      >
        <Grid item xs={12} md={2}>
          {homeDashLoadingState && (
            <Skeleton
              sx={{ margin: "0 auto", borderRadius: "6px", width: "100%" }}
              variant="rectangular"
              height={310}
            />
          )}
          {!homeDashLoadingState && (
            <Sidebar onMenuItemClick={handleMenuItemClick} />
          )}
        </Grid>

        <Grid item xs={12} md={7}>
          <JobAdGridContainer
            item
            sx={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "1rem",
              gap: "5px",
            }}
          >
            <Grid item xs={12} sm={6}>
              {homeDashLoadingState && (
                <Skeleton
                  sx={{ margin: "0 auto", borderRadius: "6px", width: "100%" }}
                  variant="rectangular"
                  height={114}
                />
              )}
              {!homeDashLoadingState && (
                <UserProfileJobAd
                  id={jobAd[0]?._id}
                  logo={`${process.env.REACT_APP_IMAGE}${jobAd[0]?.image}`}
                  title={jobAd[0]?.title}
                  description={sanitizeHtml(jobAd[0]?.description, {
                    allowedTags: [],
                    allowedAttributes: {},
                  })}
                />
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              {homeDashLoadingState && (
                <Skeleton
                  sx={{ margin: "0 auto", borderRadius: "6px", width: "100%" }}
                  variant="rectangular"
                  height={114}
                />
              )}
              {!homeDashLoadingState && (
                <UserProfileJobAd
                  id={jobAd[1]?._id}
                  logo={`${process.env.REACT_APP_IMAGE}${jobAd[1]?.image}`}
                  title={jobAd[1]?.title}
                  description={sanitizeHtml(jobAd[1]?.description, {
                    allowedTags: [],
                    allowedAttributes: {},
                  })}
                />
              )}
            </Grid>
          </JobAdGridContainer>

          <Grid
            item
            sx={{
              maxWidth: "100%",
              display: "flex",
              justifyContet: "flex-start",
              flexDirection: "column",
              marginBottom: 5,
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
        <Grid
          item
          xs={12}
          md={3}
          sx={{ xs: { display: "flex", justifyContent: "center" } }}
        >
          {homeDashLoadingState ? (
            <>
              <Skeleton
                sx={{
                  margin: "1rem 0.5rem 1rem 1rem",
                  borderRadius: "6px",
                  width: "100%",
                }}
                variant="rectangular"
                height={372}
              />
            </>
          ) : auth.user?.userType === "teacher" ? (
            <FeaturedCard />
          ) : (
            selectedCard && (
              <>
                {(() => {
                  let teacherItem = (
                    <TeacherItem
                      id={id}
                      name={name}
                      education={education}
                      currentLocation={location}
                      nationality={nationality}
                      workExperience={workExperience}
                      image={`${process.env.REACT_APP_IMAGE}${image}`}
                      degree={highestCertification}
                      about={about}
                      width={200}
                    />
                  );

                  if (auth.user?.buffetIsActive) {
                    return <Link to={`/teachers/${id}`}>{teacherItem}</Link>;
                  }
                  return teacherItem;
                })()}
              </>
            )
          )}
          {!homeDashLoadingState && auth.user?.userType === TEACHER && (
            <>
              <ProfileProgress user={auth.user} />
            </>
          )}
        </Grid>
      </StyledGridContainerForProfile>
      <BottomMobileNav onMenuItemClick={handleMenuItemClick} />
    </>
  );
};

export default TeacherDashboard;
