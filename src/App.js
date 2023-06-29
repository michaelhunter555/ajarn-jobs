import React, { useCallback, useEffect, useReducer, useState } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AddNewBlogPost from "./blog/pages/AddNewBlogPost";
import BlogPage from "./blog/pages/BlogPage";
import IncomeDirectory from "./blog/pages/IncomeDirectory";
import IncomeDirectoryDetails from "./blog/pages/IncomeDirectoryDetails";
import TeacherDashboard from "./Dashboard/pages/TeacherDashboard";
import Home from "./home/pages/Home";
import JobDetailsPage from "./jobs/pages/JobDetailsPage";
import NewJob from "./jobs/pages/NewJob";
import UpdateJob from "./jobs/pages/UpdateJob";
import UserJobs from "./jobs/pages/UserJobs";
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
import Login from "./users/pages/Auth";
import TeacherDetails from "./users/pages/TeacherDetails";
import Teachers from "./users/pages/Teachers";

const queryClient = new QueryClient();

let logoutTimer;

function App() {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

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

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (
      userData &&
      userData.token &&
      new Date(userData.tokenExpires) > new Date()
    ) {
      login(userData.userId, userData.token, new Date(userData.tokenExpires));
    }
  }, [login]);

  const logout = useCallback(() => {
    dispatch({ type: LOGOUT });
    setTokenExpirationDate(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (state.token && tokenExpirationDate) {
      const timeRemaining =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, timeRemaining);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [state.token, logout, tokenExpirationDate]);

  const addCredits = useCallback((amount) => {
    dispatch({ type: ADD_CREDITS, amount });
  }, []);

  const useCredits = useCallback((amount) => {
    dispatch({ type: USE_CREDITS, amount });
  }, []);

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
          <main>{routes}</main>
        </Router>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
