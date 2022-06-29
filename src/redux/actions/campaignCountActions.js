import * as types from "../type";

export const getAllCampaignsCountAction = (count) => {
  return async (dispatch) => {
    dispatch({ type: types.GET_ALL_CAMPAIGNS_COUNT, payload: count });
  };
};

export const getActiveCampaignsCountAction = (count) => {
  return async (dispatch) => {
    dispatch({ type: types.GET_ACTIVE_CAMPAIGNS_COUNT, payload: count });
  };
};

export const getInActiveCampaignsCountAction = (count) => {
  return async (dispatch) => {
    dispatch({ type: types.GET_IN_ACTIVE_CAMPAIGNS_COUNT, payload: count });
  };
};
