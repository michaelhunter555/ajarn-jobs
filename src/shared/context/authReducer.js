import {
  ADD_CREDITS,
  LOGIN,
  LOGOUT,
  UPDATE_USER,
  USE_CREDITS,
} from './authActions';

export const initialState = {
  isLoggedIn: false,
  userId: null,
  credits: 0,
  userHasCredits: false,
  user: null,
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        userId: action.userId,
        credits: action.credits,
        userHasCredits: action.credits > 0,
      };
    case LOGOUT:
      return initialState;
    case ADD_CREDITS:
      const newCredits = state.credits + action.amount;
      return {
        ...state,
        credits: newCredits,
        userHasCredits: newCredits > 0,
      };

    case USE_CREDITS:
      const remaingCredits = state.credits - action.amount;
      return {
        ...state,
        credits: remaingCredits,
        userHasCredits: remaingCredits > 0,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};
