import React, {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";

import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";

import { LinearProgress } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from '@react-oauth/google';

import TeacherDashboard from "./Dashboard/pages/TeacherDashboard";
import Home from "./home/pages/Home";
import JobDetailsPage from "./jobs/pages/JobDetailsPage";
import UserJobs from "./jobs/pages/UserJobs";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import OnboardingFlow from "./shared/components/Onboarding/OnboardingFlow";
import EmployerOnboarding from "./users/components/EmployerOnboarding";
import EmailVerification from "./users/pages/EmailVerification";
import {
  ADD_CREDITS,
  LOGIN,
  LOGOUT,
  UPDATE_USER,
  USE_CREDITS,
} from "./shared/context/authActions";
import { authReducer, initialState } from "./shared/context/authReducer";
import ScrollToTop from "./shared/util/ScrollToTop";
import Login from "./users/pages/Auth";

const About = lazy(() => import("./introduction/About"));
const PrivacyPolicy = lazy(() => import("./termsOfService/privacyPolicy"));

const TermsAndConditions = lazy(() =>
  import("./termsOfService/termsAndConditions")
);
const AjarnJobsExperience = lazy(() =>
  import("./introduction/HowToUseOurSite")
);
const WorkWithUs = lazy(() => import("./introduction/WorkWithUs"));

const PageNotFound = lazy(() => import("./PageNotFound"));
const Feedback = lazy(() => import("./Feedback/page/Feedback"));
//Lazily loaded components
const AlternateUserJobs = lazy(() => import("./jobs/pages/AlternateUserJobs"));
const Teachers = lazy(() => import("./users/pages/Teachers"));
const TeacherDetails = lazy(() => import("./users/pages/TeacherDetails"));
const NewJob = lazy(() => import("./jobs/pages/NewJob"));
const UpdateJob = lazy(() => import("./jobs/pages/UpdateJob"));
const BlogPage = lazy(() => import("./blog/pages/BlogPage"));
const AddNewBlogPost = lazy(() => import("./blog/pages/AddNewBlogPost"));
const IncomeDirectory = lazy(() => import("./blog/pages/IncomeDirectory"));
const IncomeDirectoryDetails = lazy(() =>
  import("./blog/pages/IncomeDirectoryDetails")
);

const queryClient = new QueryClient();

let logoutTimer;

function App() {
  //Auth context Management
  const [state, dispatch] = useReducer(authReducer, initialState);
  //tokenExpiration Tracking
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  //AuthReducer & Context management for login
  const login = useCallback((userId, token, expirationDate) => {
    dispatch({ type: LOGIN, user: userId, token: token });

    const tokenExpires =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 10);
    setTokenExpirationDate(tokenExpires);
    const userData = {
      userId: userId,
      token: token,
      tokenExpires: tokenExpires.toISOString(),
    };

    localStorage.setItem("userData", JSON.stringify(userData));
  }, []);

  //log user in if they come back and their login token is still valid
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (
      userData &&
      userData.token &&
      new Date(userData.tokenExpires) > new Date()
    ) {
      login(userData.userId, userData.token, new Date(userData.tokenExpires));
    } else {
    }
  }, [login, state.token]);

  //logout user and set to null if they wish to logout
  const logout = useCallback(() => {
    dispatch({ type: LOGOUT });
    setTokenExpirationDate(null);
    localStorage.removeItem("userData");
  }, []);

  //log user out after their token expires
  useEffect(() => {
    if (state.token && tokenExpirationDate) {
      const timeRemaining =
        tokenExpirationDate.getTime() - new Date().getTime();

      logoutTimer = setTimeout(logout, timeRemaining);

      return () => {
        clearTimeout(logoutTimer);
      };
    } else {
      clearTimeout(logoutTimer);
    }
  }, [state.token, logout, tokenExpirationDate]);

  //update total credit counts
  const addCredits = useCallback((amount) => {
    dispatch({ type: ADD_CREDITS, amount });
  }, []);

  const useCredits = useCallback((amount) => {
    dispatch({ type: USE_CREDITS, amount });
  }, []);

  //update user object to reflect latest database data
  const updatedUser = useCallback((updatedUser) => {
    dispatch({ type: UPDATE_USER, user: updatedUser });
  }, []);

  // const ProtectedRoute = ({ isLoggedIn, ...props }) => {
  //   return isLoggedIn ? <Route {...props} /> : <Navigate to="/login" />;
  // };

  let routes;
  if (state.token) {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} exact="true" />
        <Route path="/content/" element={<AddNewBlogPost />} />
        <Route path="/content/:bid" element={<BlogPage />} />

        <Route path="/income-directory" element={<IncomeDirectory />} />
        <Route
          path="/income-details/:id"
          element={<IncomeDirectoryDetails />}
        />
        <Route path="/users/:id" element={<TeacherDashboard />} />
        <Route path="/modern-view/jobs" element={<AlternateUserJobs />} />
        <Route path="/jobs" element={<UserJobs />} />
        <Route path="/job/new" element={<NewJob />} />
        <Route path="/jobs/:jid/:jobName" element={<JobDetailsPage />} />
        <Route path="/jobs/:jid/update" element={<UpdateJob />} exact="true" />
        <Route path="/teachers/" element={<Teachers />} />
        <Route path="/teachers/:uid" element={<TeacherDetails />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route path="/employer-onboarding" element={<EmployerOnboarding onComplete={() => window.location.href = "/"} />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route
          path="/how-to-use-ajarn-jobs"
          element={<AjarnJobsExperience />}
        />
        <Route path="/work-with-us" element={<WorkWithUs />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/404" element={<PageNotFound />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} exact="true" />
        <Route path="/about-us" element={<About />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/content/" element={<AddNewBlogPost />} />
        <Route path="/content/:bid" element={<BlogPage />} />
        <Route path="/income-directory" element={<IncomeDirectory />} />
        <Route
          path="/income-details/:id"
          element={<IncomeDirectoryDetails />}
        />
        <Route path="/modern-view/jobs" element={<AlternateUserJobs />} />
        <Route path="/jobs" element={<UserJobs />} />
        <Route path="/jobs/:jid/:jobName" element={<JobDetailsPage />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route path="/employer-onboarding" element={<EmployerOnboarding />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route
          path="/how-to-use-ajarn-jobs"
          element={<AjarnJobsExperience />}
        />
        <Route path="/work-with-us" element={<WorkWithUs />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/404" element={<PageNotFound />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    );
  }

  //console.log("APP STATE:", state.user, "APP TOKEN:", state.token);

  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <AuthContext.Provider
          value={{
            isLoggedIn: !!state.token,
            token: state.token,
            user: state.user,
            login: login,
            logout: logout,
            addCredits: addCredits,
            useCredits: useCredits,
            updateUser: updatedUser,
          }}
        >
          <Router>
            <ScrollToTop />
            <MainNavigation />
            <Suspense
              fallback={
                <>
                  <LinearProgress />
                </>
              }
            >
              <main className="main">
                {/* Check if user needs onboarding */}
                {state.isLoggedIn && state.user?.needsOnboarding ? (
                  <OnboardingFlow 
                    user={state.user} 
                    onComplete={() => {
                      // Update user to mark onboarding as complete
                      updatedUser({ ...state.user, needsOnboarding: false });
                    }} 
                  />
                ) : (
                  routes
                )}
              </main>
            </Suspense>
          </Router>
        </AuthContext.Provider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
}

export default App;
