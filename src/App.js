import React, {
  useCallback,
  useReducer,
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
import {
  ADD_CREDITS,
  LOGIN,
  LOGOUT,
  USE_CREDITS,
} from './shared/context/authActions';
import {
  authReducer,
  initialState,
} from './shared/context/authReducer';
import Login from './users/pages/Auth';
import TeacherDetails from './users/pages/TeacherDetails';
import Teachers from './users/pages/Teachers';

function App() {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = useCallback((userId, credits) => {
    dispatch({ type: LOGIN, userId, credits });
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: LOGOUT });
  }, []);

  const addCredits = useCallback((amount) => {
    dispatch({ type: ADD_CREDITS, amount });
  }, []);

  const useCredits = useCallback((amount) => {
    dispatch({ type: USE_CREDITS, amount });
  }, []);

  let routes;
  if (state.isLoggedIn) {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} exact="true" />
        {/*user:uid || */}
        <Route path="/users/" element={<TeacherDashboard />} />
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
        <Route path="/jobs" element={<UserJobs />} />
        <Route path="/jobs/:jid" element={<JobDetailsPage />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/teachers/:uid" element={<TeacherDetails />} />
        <Route path="/auth" element={<Login />} />
      </Routes>
    );
  }
  //remember to update users to dynamic id
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: state.isLoggedIn,
        userId: state.userId,
        credits: state.credits,
        userHasCredits: state.userHasCredits,
        login: login,
        logout: logout,
        addCredits: addCredits,
        useCredits: useCredits,
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
