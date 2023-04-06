import React, {
  useCallback,
  useState,
} from 'react';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import TeacherDashboard from './Dashboard/pages/TeacherDashboard';
import Home from './home/pages/Home';
import JobDetailsPage from './jobs/pages/JobDetailsPage';
import NewJob from './jobs/pages/NewJob';
import UpdateJob from './jobs/pages/UpdateJob';
import UserJobs from './jobs/pages/UserJobs';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import Login from './users/pages/Auth';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [isSchool, setIsSchool] = useState(false);

  const login = useCallback((uid, userRole) => {
    setIsLoggedIn(true);
    setUserId(uid);

    if (userRole === "teacher") {
      setIsTeacher(true);
    } else if (userRole === "school") {
      setIsSchool(true);
    }
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;
  if (isLoggedIn) {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} exact="true" />
        {/*user:uid || */}
        <Route path="/users" element={<TeacherDashboard />} />
        <Route path="/jobs" element={<UserJobs />} />
        <Route path="/job/new" element={<NewJob />} />
        <Route path="/jobs/:jid" element={<JobDetailsPage />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/jobs/:jid/update" element={<UpdateJob />} exact="true" />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} exact="true" />
        <Route path="/jobs" element={<UserJobs />} />
        <Route path="/jobs/:jid" element={<JobDetailsPage />} />
        <Route path="/auth" element={<Login />} />
      </Routes>
    );
  }
  //remember to update users to dynamic id
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
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
