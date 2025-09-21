import React, { useContext, useEffect, useState } from "react";

import { Link, useLocation, useParams } from "react-router-dom";
import sanitizeHtml from "sanitize-html";

import {
  Alert,
  Button,
  Grid,
  Link as RouterLink,
  Pagination,
  Paper,
  Skeleton,
  Stack,
  Typography,
  Box,
  Chip,
  Switch,
  FormControlLabel,
} from "@mui/material";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SendIcon from '@mui/icons-material/Send';
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
  RECRUITMENT_OFFER,
  RECRUITMENT_SENT,
  RESUME,
  SETTINGS,
  TEACHER,
} from "../components/Profile/dashboardValues";
import EmployerRecruitmentTable from "../components/Profile/EmployerRecruitmentTables";
import FeaturedCard from "../components/Profile/FeaturedCard";
import JobAdSidebarList from "../components/Profile/JobAdSidebarList";
import ProfileInformation from "../components/Profile/ProfileInformation";
import ProfileProgress from "../components/Profile/ProfileProgress";
import PromotionSidebar from "../components/Profile/PromotionsSidebar";
import TeacherSettings from "../components/Profile/TeacherSettings";
import UpdateResumeItem from "../components/Profile/UpdateResumeItem";
import UserRecruitmentTable from "../components/Profile/UserRecruitmentTable";
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
  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
  },
}));

const TeacherDashboard = () => {
  const userId = useParams().id;
  const auth = useContext(AuthContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [currentComponent, setCurrentComponent] = useState("profile");
  const [recruitmentOffers, setRecruitmentOffers] = useState(0);
  const [showPdfUpload, setShowPdfUpload] = useState(false);
  const [selectedPdfFile, setSelectedPdfFile] = useState(null);

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
    sendRequest,
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

  // Handle PDF resume upload
  const handlePdfResumeUpload = async () => {
    if (!selectedPdfFile) return;
    
    try {
      const formData = new FormData();
      formData.append('pdfResume', selectedPdfFile);
      formData.append('resumeType', 'pdf');
      
      const response = await sendRequest(
        `${process.env.REACT_APP_USERS}/update-profile/${userId}`,
        "PATCH",
        formData,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      
      // Update user with PDF resume URL
      auth.updateUser({
        ...auth.user,
        pdfResume: response.user.pdfResume
      });
      
      // Reset form
      setSelectedPdfFile(null);
      setShowPdfUpload(false);
      
      // Reset the file input
      const fileInput = document.getElementById('pdf-resume-upload');
      if (fileInput) {
        fileInput.value = '';
      }
    } catch (err) {
      console.error("PDF upload error:", err);
    }
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

  console.log("pdfResume:", auth.user?.pdfResume);
  // https://res.cloudinary.com/dtqbxfe7r/image/upload/v1758373961/nzbrjdoreucrmggcaaxn.pdf
  // https://res.cloudinary.com/demo/image/upload/pg_2/w_300,h_300,c_crop,g_north,y_270/r_max/b_black/multi_page_pdf.png

  const convertPdfToImage = async () => {
    if (!auth.user?.pdfResume) {
      return null;
    }
   
    const cloudinaryUrl = auth.user?.pdfResume.split("/");
    const cloudName = cloudinaryUrl[3];
    const pdfName = cloudinaryUrl[cloudinaryUrl.length - 1];
    const extension = pdfName.replace(/\.pdf$/, "");

    const page1 = `https://res.cloudinary.com/${cloudName}/image/upload/pg_1/w_500,f_auto/${extension}.png`;
    const page2 = `https://res.cloudinary.com/${cloudName}/image/upload/pg_2/w_500,f_auto/${extension}.png`;

    // Try fetching page 2 to see if it exists
    try {
      const res = await fetch(page2, { method: "HEAD" });
      if (res.ok) {
        return [page1, page2]; // return array if 2 pages exist
      } else {
        return [page1]; // only page 1 exists
      }
    } catch (err) {
      console.error("Error fetching PDF page:", err);
      return [page1]; // fallback
    }
  };

  const [pdfImages, setPdfImages] = useState([]);

  // Load PDF images when user data changes
  useEffect(() => {
    if (auth.user?.pdfResume) {
      convertPdfToImage().then(setPdfImages);
    } else {
      setPdfImages([]);
    }
  }, [auth.user?.pdfResume]);

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
                <Paper
                  elevation={1}
                  sx={{ padding: "2rem", borderRadius: "10px" }}
                >
                  <Typography variant="subtitle1" color="text.secondary">
                    Only the photo you used at sign-up is associated with your
                    job posts. You need to create an employer profile about your
                    company to be used for every job post you make.
                  </Typography>
                  <Button variant="contained" onClick={addCreatorItem}>
                    Create employer Profile
                  </Button>
                </Paper>
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
              {/* Resume Type Selection */}
              <Paper elevation={1} sx={{ padding: "1rem", marginBottom: "1rem" }}>
                <Typography variant="h6" gutterBottom>
                  Resume Options
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={showPdfUpload}
                      onChange={(e) => setShowPdfUpload(e.target.checked)}
                      size="small"
                    />
                  }
                  label="Upload PDF Resume"
                />
                {/* Display PDF Resume Preview */}
                {pdfImages.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                      Current PDF Resume {pdfImages.length > 1 && `(${pdfImages.length} pages)`}
                    </Typography>
                    {pdfImages.map((imageUrl, index) => (
                      <Box key={index} sx={{ mb: 2 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: "block" }}>
                          Page {index + 1}
                        </Typography>
                        <Box 
                          component="img" 
                          src={imageUrl} 
                          alt={`PDF Resume Preview - Page ${index + 1}`}
                          sx={{ 
                            border: '1px solid #e0e0e0', 
                            borderRadius: '8px', 
                            padding: '10px',
                            maxWidth: '100%',
                            height: 'auto',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                          }} 
                        />
                      </Box>
                    ))}
                  </Box>
                )}
                  
                {showPdfUpload ? (
                  <Box sx={{ mt: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

                    <input
                      key={selectedPdfFile ? 'file-selected' : 'no-file'}
                      type="file"
                      accept=".pdf"
                      onChange={(event) => {
                        const file = event.target.files[0];
                        setSelectedPdfFile(file);
                      }}
                      style={{ display: 'none' }}
                      id="pdf-resume-upload"
                    />
                    <label htmlFor="pdf-resume-upload">
                      <Button 
                        endIcon={<PictureAsPdfIcon />} 
                        variant="outlined" 
                        component="span" 
                        size="small"
                        sx={{ mr: 1 }}
                      >
                        Choose PDF File
                      </Button>
                    </label>
                    {selectedPdfFile && (
                      
                        <Chip
                          label={selectedPdfFile.name}
                          onDelete={() => {
                            setSelectedPdfFile(null);
                            // Reset the file input
                            const fileInput = document.getElementById('pdf-resume-upload');
                            if (fileInput) {
                              fileInput.value = '';
                            }
                          }}
                          sx={{ mr: 1 }}
                          size="small"
                        />
                       
                    
                    )}
                    </Box>
                    {selectedPdfFile && (
                      <Box sx={{ mt: 2 }}>
                      <Button 
                      endIcon={<SendIcon />} 
                      onClick={handlePdfResumeUpload} 
                      variant="contained">
                        Upload Resume
                      </Button>
                    </Box>
                    )}
                  </Box>
                ) : (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Add work history items manually
                    </Typography>
                    {!updatingUserResume && (
                      <Button onClick={addNewResumeItem}>{authHasResume}</Button>
                    )}
                  </Box>
                )}
              </Paper>

              {/* Manual Resume Items */}
              {!showPdfUpload && (
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
                </>
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
                <Button variant="contained" onClick={addCreatorItem}>
                  Creator Account
                </Button>
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
        case RECRUITMENT_OFFER:
          return <UserRecruitmentTable />;
        case RECRUITMENT_SENT:
          return <EmployerRecruitmentTable />;

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
  const handleDashLoading = () => {
    if (auth?.user?.userType === EMPLOYER) {
      return userProfileLoading || applicantsIsLoading;
    }

    if (auth?.user?.userType === TEACHER) {
      return userProfileLoading || jobAdIsLoading;
    }
    return false;
  };

  const isDashLoading = handleDashLoading();

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
              <Sidebar
                onMenuItemClick={handleMenuItemClick}
                notifications={auth?.user?.recruitmentReceived?.length}
              />
              {!jobAdIsLoading && jobAd && auth?.user?.userType === TEACHER && (
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
             {jobAd && <Grid item xs={12}>
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
                {!jobAdIsLoading &&  (
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
              </Grid>}

              {jobAd && <Grid item xs={12}>
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
                {!jobAdIsLoading && jobAd[1] && (
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
              </Grid>}
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

        <Grid item xs={12} md={3}>
          {auth?.user?.userType === EMPLOYER && (
            <Alert severity={auth?.user?.buffetIsActive ? "info" : "warning"}>
              {auth?.user?.buffetIsActive
                ? "Viewing Latest Teachers"
                : "Activate Buffet to view & contact an actively growing list of teachers."}
            </Alert>
          )}
          {jobAdIsLoading && auth?.user?.userType === TEACHER ? (
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
          ) : (
            auth.user?.userType === TEACHER && <FeaturedCard />
          )}

          {!userProfileLoading &&
          userCards &&
          !userCardsIsLoading &&
          auth?.user?.userType === EMPLOYER
            ? userCards?.users?.map((user, i) => (
                <RouterLink
                  sx={{
                    textDecoration: "none",
                    "&:hover": {},
                    display: "flex",
                    flexDirection: "column",
                    alignItems: {
                      xs: auth?.user?.buffetIsActive ? "center" : "",
                    },
                  }}
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
                    width={500}
                    buffetIsActive={auth?.user?.buffetIsActive}
                  />
                </RouterLink>
              ))
            : auth?.user?.userType === EMPLOYER &&
              Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} width="100%" />
              ))}

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

          {!isDashLoading && auth.user?.userType === TEACHER && (
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
