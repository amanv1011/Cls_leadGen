import * as types from "../type";

const initialState = {
  users: [],
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