import * as types from "../type";

export const campaignCountryFilterValueAction = (FilterValue) => {
  return async (dispatch) => {
    dispatch({
      type: types.CAMPAIGN_COUNTRY_FILTER_VALUE,
      payload: FilterValue,
    });
  };
};

export const campaignOwnerFilterValueAction = (FilterValue) => {
  return async (dispatch) => {
    dispatch({ type: types.CAMPAIGN_OWNER_FILTER_VALUE, payload: FilterValue });
  };
};

export const campaignStateFilterValueAction = (FilterValue) => {
  return async (dispatch) => {
    dispatch({ type: types.CAMPAIGN_STATE_FILTER_VALUE, payload: FilterValue });
  };
};

export const campaignFilterClearAction = () => {
  return async (dispatch) => {
    dispatch({
      type: types.CAMPAIGN_FILTER_CLEAR,
      payload: {
        country: "Country",
        owner: "Owner",
        campaignState: "AllCampaigns",
      },
    });
  };
};
