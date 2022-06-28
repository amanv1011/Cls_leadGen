import * as types from "../type";

const initialState = {
  allCamapignsCount: [],
  ativeCamapignsCount: [],
  inActiveCamapignsCount: [],
};

export const campaignCountReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case types.GET_ALL_CAMPAIGNS_COUNT:
      return { ...state, allCamapignsCount: payload };
    case types.GET_ACTIVE_CAMPAIGNS_COUNT:
      return { ...state, ativeCamapignsCount: payload };
    case types.GET_IN_ACTIVE_CAMPAIGNS_COUNT:
      return { ...state, inActiveCamapignsCount: payload };
    default:
      return { ...state };
  }
};