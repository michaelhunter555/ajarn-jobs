import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  credits: 0,
  userHasCredits: false,
  login: (userId, credits) => {},
  logout: () => {},
  addCredits: (amount) => {},
  useCredits: (amount) => {},
});
