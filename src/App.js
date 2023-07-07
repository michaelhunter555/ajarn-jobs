import React, {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import TeacherDashboard from "./Dashboard/pages/TeacherDashboard";
import Home from "./home/pages/Home";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import {
  ADD_CREDITS,
  LOGIN,
  LOGOUT,
  UPDATE_USER,
  USE_CREDITS,
} from "./shared/context/authActions";
import { authReducer, initialState } from "./shared/context/authReducer";

const queryClient = new QueryClient();

let logoutTimer;

function App() {
  //Auth context Management
  const [state, dispatch] = useReducer(authReducer, initialState);
  //tokenExpiration Tracking
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  //Lazily loaded components
  const Login = lazy(() => import("./users/pages/Auth"));
  const Teachers = lazy(() => import("./users/pages/Teachers"));
  const TeacherDetails = lazy(() => import("./users/pages/TeacherDetails"));
  const UserJobs = lazy(() => import("./jobs/pages/UserJobs"));
  const JobDetailsPage = lazy(() => import("./jobs/pages/JobDetailsPage"));
  const NewJob = lazy(() => import("./jobs/pages/NewJob"));
  const UpdateJob = lazy(() => import("./jobs/pages/UpdateJob"));
  const BlogPage = lazy(() => import("./blog/pages/BlogPage"));
  const AddNewBlogPost = lazy(() => import("./blog/pages/AddNewBlogPost"));
  const IncomeDirectory = lazy(() => import("./blog/pages/IncomeDirectory"));
  const IncomeDirectoryDetails = lazy(() =>
    import("./blog/pages/IncomeDirectoryDetails")
  );

  //AuthReducer & Context management for login
  const login = useCallback((userId, token, expirationDate) => {
    dispatch({ type: LOGIN, user: userId, token: token });

    const tokenExpires =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpires);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: userId,
        token: token,
        tokenExpires: tokenExpires.toISOString(),
      })
    );
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
        <Route path="/jobs" element={<UserJobs />} />
        <Route path="/job/new" element={<NewJob />} />
        <Route path="/jobs/:jid" element={<JobDetailsPage />} />
        <Route path="/jobs/:jid/update" element={<UpdateJob />} exact="true" />
        <Route path="/teachers/" element={<Teachers />} />
        <Route path="/teachers/:uid" element={<TeacherDetails />} />
        <Route path="/auth" element={<Login />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} exact="true" />

        <Route path="/blog" element={<BlogPage />} />
        <Route path="/content/" element={<AddNewBlogPost />} />
        <Route path="/content/:bid" element={<BlogPage />} />
        <Route path="/income-directory" element={<IncomeDirectory />} />
        <Route
          path="/income-details/:id"
          element={<IncomeDirectoryDetails />}
        />
        <Route path="/jobs" element={<UserJobs />} />
        <Route path="/jobs/:jid" element={<JobDetailsPage />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/auth" element={<Login />} />
      </Routes>
    );
  }

  console.log("APP STATE:", state.user, "APP TOKEN:", state.token);

  return (
    <QueryClientProvider client={queryClient}>
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
          <MainNavigation />
          <Suspense fallback={<></>}>
            <main>{routes}</main>
          </Suspense>
        </Router>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
