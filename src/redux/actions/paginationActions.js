import * as types from "../type";

export const setTotalCount = (value) => {
  return async (dispatch) => {
    dispatch({ type: types.GET_TOTAL_COUNT, payload: value });
  };
};

export const setDataPerPage = (value) => {
  return async (dispatch) => {
    dispatch({ type: types.GET_DATA_PER_PAGE, payload: value });
  };
};
export const setActivePage = (value) => {
  return async (dispatch) => {
    dispatch({ type: types.GET_ACTIVE_COUNT, payload: value });
  };
};
