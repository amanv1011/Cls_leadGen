import { GET_TOTAL_COUNT, GET_LEADS_PER_PAGE, GET_ACTIVE_COUNT } from "../type";

export const setTotalCount = (value) => {
  return async (dispatch) => {
    dispatch({ type: GET_TOTAL_COUNT, payload: value });
  };
};

export const setLeadsPerPage = (value) => {
  return async (dispatch) => {
    dispatch({ type: GET_LEADS_PER_PAGE, payload: value });
  };
};
export const setActivePage = (value) => {
  return async (dispatch) => {
    dispatch({ type: GET_ACTIVE_COUNT, payload: value });
  };
};
