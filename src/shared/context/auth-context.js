import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  user: null,
  userHasCredits: false,
  token: null,
  login: () => {},
  logout: () => {},
  addCredits: (amount) => {},
  useCredits: (amount) => {},
  updateUser: (updateUser) => {},
});
