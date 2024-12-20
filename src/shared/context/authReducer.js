import {
  ADD_CREDITS,
  LOGIN,
  LOGOUT,
  UPDATE_USER,
  USE_CREDITS,
} from "./authActions";

export const initialState = {
  isLoggedIn: false,
  user: null,
  token: null,
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        user: action.user,
        token: action.token,
      };

    case LOGOUT:
      return initialState;

    case ADD_CREDITS:
      const newCredits = state.user.credits + action.amount;
      return {
        ...state.user,
        credits: newCredits,
      };

    case USE_CREDITS:
      const remaingCredits = state.user.credits - action.amount;
      return {
        ...state.user,
        credits: remaingCredits,
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
