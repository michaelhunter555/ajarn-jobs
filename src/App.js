import "./index.css";

import React, { useState } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./home/pages/Home";
import JobDetailsPage from "./jobs/pages/JobDetailsPage";
import NewJob from "./jobs/pages/NewJob";
import UpdateJob from "./jobs/pages/UpdateJob";
import UserJobs from "./jobs/pages/UserJobs";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import UserDashboard from "./users/pages/UserDashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [isSchool, setIsSchool] = useState(false);

  const login = (uid, userRole) => {
    setIsLoggedIn(true);
    setUserId(uid);

    if (userRole === "teacher") {
      setIsTeacher(true);
    } else if (userRole === "school") {
      setIsSchool(true);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserId(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        isTeacher: isTeacher,
        isSchool: isSchool,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <Routes>
          <Route path="/" element={<Home />} exact="true" />
          <Route path="/users" element={<UserDashboard />} />
          <Route path="/jobs" element={<UserJobs />} />
          <Route path="/job/new" element={<NewJob />} />
          <Route path="/jobs/:jid" element={<JobDetailsPage />} />
          <Route
            path="/jobs/:jid/update"
            element={<UpdateJob />}
            exact="true"
          />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
