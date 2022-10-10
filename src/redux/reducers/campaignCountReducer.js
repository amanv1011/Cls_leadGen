import * as types from "../type";

const initialState = {
  allCamapignsCount: 0,
  activeCamapignsCount: 0,
  inActiveCamapignsCount: 0,
};

export const campaignCountReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case types.GET_ALL_CAMPAIGNS_COUNT:
      return { ...state, allCamapignsCount: payload };
    case types.GET_ACTIVE_CAMPAIGNS_COUNT:
      return { ...state, activeCamapignsCount: payload };
    case types.GET_IN_ACTIVE_CAMPAIGNS_COUNT:
      return { ...state, inActiveCamapignsCount: payload };
    default:
      return { ...state };
  }
};
