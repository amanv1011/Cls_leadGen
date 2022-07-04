import { getUsers } from "../../services/api/user";
import {
  GET_LOGGED_IN_USER,
  GET_USERS_ERROR,
  GET_USERS_PENDING,
  GET_USERS_SUCCESS,
} from "../type";
import { closeLoader, openLoader } from "./globalLoaderAction";

export const getAllUsersAction = () => {
  return async (dispatch) => {
    dispatch({ type: GET_USERS_PENDING, loading: true });
    dispatch(openLoader({ isLoading: true }));
    try {
      const res = await getUsers();
      dispatch(closeLoader());
      return dispatch({
        type: GET_USERS_SUCCESS,
        payload: res,
      });
    } catch (err) {
      if (!!err && !!err.response && !!err.response.data) {
        dispatch(closeLoader());
        dispatch({
          type: GET_USERS_ERROR,
          payload: err,
        });
      } else {
        dispatch(closeLoader());
        dispatch({ type: GET_USERS_ERROR });
      }
    }
  };
};

export const getLoggedInUserAction = (userInfo) => {
  console.log({ userInfo });
  return async (dispatch) => {
    dispatch({ type: GET_LOGGED_IN_USER, payload: userInfo });
  };
};
