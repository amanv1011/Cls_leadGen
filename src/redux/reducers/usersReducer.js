import * as types from "../type";

const initialState = {
  users: [],
  loggedInUser: {},
};

export const getUsersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_USERS_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: payload,
        error: null,
      };
    case types.GET_USERS_ERROR:
      return {
        ...state,
        loading: false,
        users: [],
        error: payload,
      };
    default:
      return state;
  }
};

export const getLoggedInUserAction = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case types.GET_LOGGED_IN_USER:
      return {
        ...state,
        loading: false,
        loggedInUser: payload,
        error: null,
      };
    default:
      return state;
  }
};
