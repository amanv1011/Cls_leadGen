import * as types from "../type";
import * as campaignServices from "../../services/api/campaign";
import { openAlertAction } from "./alertActions";

export const getlastCrawledDateAction = () => {
  return async (dispatch) => {
    dispatch({ type: types.GET_LAST_CRAWLED_DATE_PENDING });
    try {
      const response = await campaignServices.getLastCrawledDate();
      // if (response.length === undefined || response.length === 0) {
      //   dispatch({
      //     type: types.GET_LAST_CRAWLED_DATE_ERROR,
      //   });
      //   return dispatch(openAlertAction(response.message, true, "error"));
      // } else {
      dispatch({
        type: types.GET_LAST_CRAWLED_DATE_SUCCESS,
        payload: response,
      });
      // }
    } catch (err) {
      dispatch({
        type: types.GET_LAST_CRAWLED_DATE_ERROR,
        payload: err,
      });
      return dispatch(openAlertAction(err.message, true, "error"));
    }
  };
};
