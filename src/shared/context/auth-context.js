import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  user: null,
  userHasCredits: false,
  login: (userId, credits) => {},
  logout: () => {},
  addCredits: (amount) => {},
  useCredits: (amount) => {},
  updateUser: (updateUser) => {},
});
