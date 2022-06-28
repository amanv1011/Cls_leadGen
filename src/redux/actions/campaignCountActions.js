import * as types from "../type";

export const getAllCampaignsCount = (count) => {
  return async (dispatch) => {
    dispatch({ type: types.GET_ALL_CAMPAIGNS_COUNT, payload: count });
  };
};

export const getActiveCampaignsCount = (count) => {
  return async (dispatch) => {
    dispatch({ type: types.GET_ACTIVE_CAMPAIGNS_COUNT, payload: count });
  };
};

export const getInActiveCampaignsCount = (count) => {
  return async (dispatch) => {
    dispatch({ type: types.GET_IN_ACTIVE_CAMPAIGNS_COUNT, payload: count });
  };
};
