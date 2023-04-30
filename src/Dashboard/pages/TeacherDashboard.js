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
import Creator from "../components/Profile/Creator";
import FeaturedCard from "../components/Profile/FeaturedCard";
import ProfileInformation from "../components/Profile/ProfileInformation";
import TeacherSettings from "../components/Profile/TeacherSettings";
import UpdateResumeItem from "../components/Profile/UpdateResumeItem";
import Sidebar from "../components/Sidebar";

const TeacherDashboard = () => {
  const userId = useParams().id;
  const authCtx = useContext(AuthContext);
  const { updateUser } = authCtx;
  const navigate = useNavigate();
  const [currentComponent, setCurrentComponent] = useState("profile");
  const [isTeacher, setIsTeacher] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  //get random user card if user is employer
  useEffect(() => {
    const randomUser =
      DUMMY_USERS_LIST[Math.floor(Math.random() * DUMMY_USERS_LIST.length)];
    setSelectedCard(randomUser);
  }, []);

  //GET user profile information
  useEffect(() => {
    const getUserInformation = async () => {
      try {
        //send call to server expected dynamic id (useParams)
        const response = await sendRequest(
          `http://localhost:5000/api/user/${userId}`
        );
        //set currentUser to user key based on /get-user-by-id.js (see backend)
        updateUser(response.user);
        const userType = response.user.userType;
        setIsTeacher(userType === "teacher");
        console.log(response);
      } catch (err) {}
    };
    //call function
    getUserInformation();
    //sendRequest and userId exist outside of our useEffect, and there are dependencies
  }, [sendRequest, userId, updateUser]);

  //PATCH General Profile Info Upate
  const handleProfileUpdate = async (update) => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/user/update-profile/${userId}`,
        "PATCH",
        JSON.stringify({
          name: update.name ? update.name : "",
          nationality: update.nationality ? update.nationality : "",
          location: update.location ? update.location : "",
          email: update.email ? update.email : "",
          skills: update.skills ? update.skills : "",
          interest: update.interest ? update.interest : "",
          about: update.about ? update.about : "",
        }),
        { "Content-Type": "application/json" }
      );
      console.log("ServerResponse:", responseData);

      authCtx.updateUser(responseData.user);
    } catch (e) {}
  };

  // PATCH Update Resume
  const handleResumeUpdate = async (updatedResumeItem) => {
    try {
      await sendRequest(
        //We expect dynamic userId (useParams)
        `http://localhost:5000/api/user/update-profile/${userId}`,
        "PATCH",
        //property to be updated "resume" on user object
        JSON.stringify({ resume: updatedResumeItem }),
        { "Content-type": "application/json" }
      );
      //reflect changes on client side
      authCtx.updateUser((prev) => {
        const updatedResume = prev.resume.map((resumeItem) => {
          return resumeItem._id === updatedResumeItem._id
            ? updatedResumeItem
            : resumeItem;
        });
        //return copy of prev state and the new resume added
        return { ...prev, resume: updatedResume };
      });
    } catch (err) {}
    console.log("updated resume", updatedResumeItem);
  };

  //PATCH Delete Resume
  const handleResumeDelete = async (resumeItem) => {
    try {
      await sendRequest(
        //We expect a dynamic Id to update the profile and Patch to update the user object
        `http://localhost:5000/api/user/update-profile/${userId}`,
        "PATCH",
        //we send deleteResume key in the req.body (req.body.deleteResume)
        //see => /backend/controllers/users/update-user-profile.js
        JSON.stringify({ deleteResume: resumeItem }),
        { "Content-Type": "application/json" }
      );
      //update the currentUser client side
      authCtx.updateUser((prev) => {
        const updatedResume = prev.resume.filter(
          (r) => r._id !== resumeItem._id
        );
        //return the latest copy of the user resumes with the deleted removed.
        return { ...prev, resume: updatedResume };
      });
    } catch (err) {}
  };

  //PATCH update creator information
  const handleCreatorUpdate = async (creatorItem) => {
    try {
      await sendRequest(
        `http://localhost:5000/api/user/update-profile/${userId}`,
        "PATCH",
        JSON.stringify(creatorItem),
        { "Content-Type": "application/json" }
      );

      authCtx.updateUser((prev) => {
        return { ...prev, creator: creatorItem };
      });
    } catch (err) {}
  };

  //PATCH remove Creator Data
  const handleCreatorDelete = async (creatorItem) => {
    try {
      await sendRequest(
        `http://localhost:5000/api/user/${userId}`,
        "PATCH",
        JSON.stringify({ deleteCreator: creatorItem._id }),
        { "Content-Type": "application/json" }
      );
      authCtx.updateUser((prev) => {
        return { ...prev, creator: null };
      });
    } catch (e) {}
  };

  //this will be an API call
  const handleRoleChange = async () => {
    try {
      const response = await sendRequest(
        `http://localhost:5000/api/user/update-profile/${userId}`,
        "PATCH",
        JSON.stringify({ userType: isTeacher ? "employer" : "teacher" }),
        { "Content-Type": "application/json" }
      );
      authCtx.updateUser(response.user);
    } catch (e) {}
  };

  const handleUserVisibility = async () => {
    const isHidden = authCtx.user.isHidden;
    try {
      const response = await sendRequest(
        `http://localhost:5000/api/user/update-profile/${userId}`,
        "PATCH",
        JSON.stringify({ isHidden: !isHidden }),
        { "Content-Type": "application/json" }
      );

      authCtx.updateUser(response.user);
    } catch (e) {}
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
        const isTeacher = authCtx.user.userType === "teacher";
        const isHidden = authCtx.user.isHidden;
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
