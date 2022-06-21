import * as types from "../type";
import { getCountry } from "../../services/api/country";
import { closeLoader, openLoader } from "./globalLoaderAction";

export const getCountryAction = () => {
  return async (dispatch) => {
    dispatch({ type: types.GET_COUNTRY_PENDING, loading: true });
    dispatch(openLoader({ isLoading: true }));
    try {
      const response = await getCountry();
      dispatch(closeLoader());
      return dispatch({
        type: types.GET_COUNTRY_SUCCESS,
        payload: response,
      });
    } catch (error) {
      if (!!error && !!error.response && !!error.response.data) {
        dispatch(closeLoader());
        dispatch({
          type: types.GET_COUNTRY_ERROR,
          payload: error,
        });
      } else {
        dispatch(closeLoader());
        dispatch({ type: types.GET_COUNTRY_ERROR });
      }
    }
  };
};
