import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  isTeacher: false,
  isSchool: false,
  login: () => {},
  logout: () => {},
});
