import { GET_LEAD_DATA } from "../type";

export const getSingleLeadDetail = (popupData) => {
  return async (dispatch) => {
    dispatch({ type: GET_LEAD_DATA, payload: popupData });
  };
};
