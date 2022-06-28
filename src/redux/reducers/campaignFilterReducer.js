import * as types from "../type";

const initialState = {
  country: "Country",
  owner: "Owner",
  campaignState: "AllCampaigns",
};

export const campaignFilterReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case types.CAMPAIGN_COUNTRY_FILTER_VALUE:
      return { ...state, country: payload };
    case types.CAMPAIGN_OWNER_FILTER_VALUE:
      return { ...state, owner: payload };
    case types.CAMPAIGN_STATE_FILTER_VALUE:
      return { ...state, campaignState: payload };

    case types.CAMPAIGN_FILTER_CLEAR:
      return {
        ...state,
        country: "Country",
        owner: "Owner",
      };

    default:
      return { ...state };
  }
};
