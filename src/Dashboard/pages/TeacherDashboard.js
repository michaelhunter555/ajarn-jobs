import React, { useContext, useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import sanitizeHtml from "sanitize-html";

import {
  Alert,
  Button,
  Grid,
  Link as RouterLink,
  Pagination,
  Skeleton,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import UserProfileJobAd from "../../shared/components/UIElements/UserProfileJobAd";
import { AuthContext } from "../../shared/context/auth-context";
import { useContent } from "../../shared/hooks/content-hook";
import { useCreator } from "../../shared/hooks/creator-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useJob } from "../../shared/hooks/jobs-hook";
import { useResume } from "../../shared/hooks/resume-hook";
import { useSettingsToggle } from "../../shared/hooks/toggle-hook";
import { useUser } from "../../shared/hooks/user-hook";
import ActiveTeachersDashboardList from "../../users/components/TeacherDashboardItem";
import Applications from "../components/Profile/Applications";
import UserBilling from "../components/Profile/BillingDataTable";
import CoverLetter from "../components/Profile/CoverLetter";
import Creator from "../components/Profile/Creator";
import {
  APPLICATIONS,
  CONTENT,
  COVER_LETTER,
  CREATOR,
  EMPLOYER,
  INVOICES,
  PROFILE,
  RESUME,
  SETTINGS,
  TEACHER,
} from "../components/Profile/dashboardValues";
import FeaturedCard from "../components/Profile/FeaturedCard";
import JobAdSidebarList from "../components/Profile/JobAdSidebarList";
import ProfileInformation from "../components/Profile/ProfileInformation";
import ProfileProgress from "../components/Profile/ProfileProgress";
import PromotionSidebar from "../components/Profile/PromotionsSidebar";
import TeacherSettings from "../components/Profile/TeacherSettings";
import UpdateResumeItem from "../components/Profile/UpdateResumeItem";
import UsersContent from "../components/Profile/UsersContent";
import Sidebar, { BottomMobileNav } from "../components/Sidebar";

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

  const [userCardPage, setUserCardPage] = useState({
    page: 1,
    limit: 5,
  });
  const [totalUserCardPages, setTotalUserCardPages] = useState(1);

  const [applicantsPage, setApplicantsPage] = useState({
    page: 1,
    limit: 5,
  });
  const [jobsPage, setJobsPage] = useState({
    page: 1,
    limit: 5,
  });

  const [blogsPage, setBlogsPage] = useState({
    page: 1,
    limit: 5,
  });

  const [applicationPage, setApplicationPage] = useState({
    page: 1,
    limit: 5,
  });

  const {
    //get and update user profile
    getUserApplications,
    getUserProfileInfo,
    getApplicantsByCreator,
    updateUserProfile,
    getUserCard,
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
    getJobAds,
    getJobsByCreatorId,
    error: gettingJobsError,
    clearError: clearGettingJobsError,
  } = useJob();
  const {
    //isLoading: jobAdIsLoading,
    error: jobAdError,
    clearError: clearJobAdError,
  } = useHttpClient();

  const { getBlogPostByUserId } = useContent();

  //update auth object to reflect most current database
  const {
    isLoading: userProfileLoading,
    error: getUserProfileError,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["userInfo", auth.user?._id],
    queryFn: () => getUserProfileInfo(auth?.user?._id),
  });

  //get applicants by creator;
  const { data: applicants, isLoading: applicantsIsLoading } = useQuery({
    queryKey: ["applicants", applicantsPage.page, applicantsPage.limit],
    queryFn: () =>
      getApplicantsByCreator(applicantsPage.page, applicantsPage.limit),
    enabled: Boolean(
      auth?.user?.userType === EMPLOYER && auth?.user?.creator?._id
    ),
    staleTime: 2 * 60 * 60 * 1000,
  });

  //get jobs by userId
  const {
    data: creatorJobs,
    isLoading: creatorJobsIsLoading,
    refetch: refetchCreatorJobs,
  } = useQuery({
    queryKey: [
      "creatorJobs",
      auth?.user?.creator?._id,
      jobsPage.page,
      jobsPage.limit,
    ],
    queryFn: () =>
      getJobsByCreatorId(
        auth?.user?.creator?._id,
        jobsPage.page,
        jobsPage.limit
      ),
    enabled: Boolean(
      auth?.user?.userType === EMPLOYER && auth?.user?.creator?._id
    ),
    staleTime: 5 * 60 * 60 * 1000,
  });

  const {
    data: blogPosts,
    isLoading: blogPostIsLoading,
    refetch: refetchBlogs,
  } = useQuery({
    queryKey: [
      "userBlogPosts",
      auth?.user?._id,
      blogsPage.page,
      blogsPage.limit,
    ],
    queryFn: () =>
      getBlogPostByUserId(auth?.user?._id, blogsPage.page, blogsPage.limit),
    enabled: Boolean(auth?.user?._id && currentComponent === CONTENT),
    staleTime: 5 * 60 * 60 * 1000,
  });

  //get user applications - jobs user has applied to
  const { data: userApplications, isLoading: userApplicationsIsLoading } =
    useQuery({
      queryKey: [
        "userApplications",
        applicationPage.page,
        applicationPage.limit,
      ],
      queryFn: () =>
        getUserApplications(
          auth?.user?._id,
          applicationPage.page,
          applicationPage.limit
        ),
      enabled: Boolean(auth?.user?.userType === TEACHER),
      staleTime: 1 * 60 * 60 * 1000,
    });

  //get job ads
  //cache jobads with useQuery
  const { data: jobAd, isLoading: jobAdIsLoading } = useQuery({
    queryKey: ["JobAds"],
    queryFn: () => getJobAds(),
    enabled: Boolean(auth?.user?.userType === TEACHER),
    staleTime: 5 * 60 * 60 * 1000,
  });

  //GET user cards
  //cache logic for userCards
  const { data: userCards, isLoading: userCardsIsLoading } = useQuery({
    queryKey: ["userCards", userCardPage.page, userCardPage.limit],
    queryFn: () => getUserCard(userCardPage.page, userCardPage.limit),
    enabled: Boolean(auth?.user?.userType === EMPLOYER),
    staleTime: 5 * 60 * 60 * 1000,
  });
  //paginate cards for users

  useEffect(() => {
    if (userCards && userCards?.users?.length > 0) {
      setTotalUserCardPages(userCards?.totalPages);
    }
  }, [userCards]);
  //pass a prop to conditionally render pagination or create a ne

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

  //sidebar component rendering
  const handleMenuItemClick = (componentName) => {
    setCurrentComponent(componentName);
  };

  //if auth is an employer and has a creator account, make the creator component default.
  const authIsCreator =
    auth.user?.userType === EMPLOYER && auth.user?.creator !== null;

  const handleApplicantsPage = (page, limit) => {
    setApplicantsPage((prev) => ({
      page: page,
      limit: limit,
    }));
  };

  const handleJobPageChange = (page, limit) => {
    setJobsPage({
      page: page,
      limit: limit,
    });
  };

  const handleBlogPageChange = (page, limit) => {
    setBlogsPage({
      page: page,
      limit: limit,
    });
  };

  const handleApplicationsPage = (page, limit) => {
    setApplicationPage({
      page: page,
      limit: limit,
    });
  };

  const handleUserCardPage = (page, limit) => {
    setUserCardPage({
      page: page,
      limit: limit,
    });
  };

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
                  //creatorjobs
                  onCreatorsPageChange={(page, limit) =>
                    handleJobPageChange(page, limit)
                  }
                  refetchCreatorJobs={refetchCreatorJobs}
                  creatorJobs={creatorJobs}
                  creatorJobsIsLoading={creatorJobsIsLoading}
                  //applicants
                  applicants={applicants}
                  page={applicantsPage.page}
                  applicationsPage={(page, limit) =>
                    handleApplicantsPage(page, limit)
                  }
                  applicantsIsLoading={applicantsIsLoading} //applicantsIsLoading
                />
              )}{" "}
              {auth.user?.userType === EMPLOYER && !authIsCreator && (
                <Button onClick={addCreatorItem}>Creator Account</Button>
              )}
            </>
          );

        case APPLICATIONS:
          return (
            <Applications
              isLoading={userApplicationsIsLoading}
              applications={userApplications}
              onApplicationPageChange={(page, limit) =>
                handleApplicationsPage(page, limit)
              }
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
            <UsersContent
              isLoading={blogPostIsLoading}
              blogPosts={blogPosts}
              onBlogPageChange={(page, limit) =>
                handleBlogPageChange(page, limit)
              }
              refetchBlogs={refetchBlogs}
            />
          );
        case INVOICES:
          return <UserBilling user={auth?.user} />;
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
  const homeDashLoadingState = userProfileLoading || jobAdIsLoading;

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
          {userProfileLoading && (
            <Skeleton
              sx={{ margin: "0 auto", borderRadius: "6px", width: "100%" }}
              variant="rectangular"
              height={310}
            />
          )}
          {!userProfileLoading && (
            <Stack spacing={2}>
              <Sidebar onMenuItemClick={handleMenuItemClick} />
              {!jobAdIsLoading && auth?.user?.userType === TEACHER && jobAd && (
                <JobAdSidebarList jobAd={jobAd} />
              )}
              {auth?.user?.userType === EMPLOYER && <PromotionSidebar />}
            </Stack>
          )}
        </Grid>

        <Grid item xs={12} md={7}>
          {auth?.user?.userType === TEACHER && (
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
                {jobAdIsLoading && (
                  <Skeleton
                    sx={{
                      margin: "0 auto",
                      borderRadius: "6px",
                      width: "100%",
                    }}
                    variant="rectangular"
                    height={114}
                  />
                )}
                {!jobAdIsLoading && (
                  <UserProfileJobAd
                    id={jobAd[0]?._id}
                    logo={`${jobAd[0]?.image}`}
                    title={jobAd[0]?.title}
                    description={sanitizeHtml(jobAd[0]?.description, {
                      allowedTags: [],
                      allowedAttributes: {},
                    })}
                  />
                )}
              </Grid>

              <Grid item xs={12} sm={6}>
                {jobAdIsLoading && (
                  <Skeleton
                    sx={{
                      margin: "0 auto",
                      borderRadius: "6px",
                      width: "100%",
                    }}
                    variant="rectangular"
                    height={114}
                  />
                )}
                {!jobAdIsLoading && (
                  <UserProfileJobAd
                    id={jobAd[1]?._id}
                    logo={`${jobAd[1]?.image}`}
                    title={jobAd[1]?.title}
                    description={sanitizeHtml(jobAd[1]?.description, {
                      allowedTags: [],
                      allowedAttributes: {},
                    })}
                  />
                )}
              </Grid>
            </JobAdGridContainer>
          )}

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
            {userProfileLoading && (
              <Stack justifyContent="flex-End">
                <Skeleton height={80} variant="rectangular" />
                <Skeleton height={180} variant="rectangular" />
                <Skeleton height={30} width="60%" />
                <Skeleton height={30} />
                <Skeleton height={30} />
              </Stack>
            )}
            {!userProfileLoading && renderComponent()}
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          md={3}
          sx={{
            xs: { display: "flex", justifyContent: "center" },
          }}
        >
          {auth?.user?.userType === EMPLOYER && (
            <Alert severity={auth?.user?.buffetIsActive ? "info" : "warning"}>
              {auth?.user?.buffetIsActive
                ? "Viewing Latest Teachers"
                : "Activate Buffet to view & contact an actively growing list of teachers."}
            </Alert>
          )}
          {userProfileLoading ? (
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
          ) : auth.user?.userType === TEACHER ? (
            <FeaturedCard />
          ) : userCards && !userCardsIsLoading ? (
            <>
              {userCards?.users?.map((user, i) => (
                <RouterLink
                  sx={{ textDecoration: "none", "&:hover": {} }}
                  component={Link}
                  key={user?.id}
                  to={
                    auth?.user?.buffetIsActive ? `/teachers/${user?.id}` : "#"
                  }
                >
                  <ActiveTeachersDashboardList
                    id={user?.id}
                    name={user?.name}
                    education={user?.education}
                    currentLocation={user?.location}
                    nationality={user?.nationality}
                    workExperience={user?.workExperience}
                    image={`${user?.image}`}
                    degree={user?.highestCertification}
                    about={user?.about}
                    width={200}
                    buffetIsActive={auth?.user?.buffetIsActive}
                  />
                </RouterLink>
              ))}
            </>
          ) : (
            Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} width="100%" />
            ))
          )}
          {auth?.user?.userType === EMPLOYER && (
            <Stack direction="row" justifyContent="flex-end">
              <Pagination
                disabled={!auth?.user?.buffetIsActive}
                count={totalUserCardPages}
                page={userCardPage.page}
                onChange={(event, page) => handleUserCardPage(page, 5)}
              />
            </Stack>
          )}

          {!userProfileLoading && auth.user?.userType === TEACHER && (
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
