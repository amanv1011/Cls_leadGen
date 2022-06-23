import {
  FILTER_LEADS_CAMPAIGNNAME,
  FILTER_LEADS_OWNERNAME,
  FILTER_LEADS_SEARCH,
  FILTER_LEADS_DATE,
  FILTER_LEADS_CLEAR,
  SET_DATEPICKER_STATE,
  LEADS_DROPDOWN_FILTER,
  FILTER_LEADS_COUNTRIES,
} from "../type";

export const leadsFilterCampaignName = (campaignNameFilter) => {
  return async (dispatch) => {
    dispatch({ type: FILTER_LEADS_CAMPAIGNNAME, payload: campaignNameFilter });
  };
};

export const leadsFilterOwnerName = (ownerNameFilter) => {
  return async (dispatch) => {
    dispatch({ type: FILTER_LEADS_OWNERNAME, payload: ownerNameFilter });
  };
};

export const leadsFilterCountiresName = (countiresNameFilter) => {
  return async (dispatch) => {
    dispatch({ type: FILTER_LEADS_COUNTRIES, payload: countiresNameFilter });
  };
};

export const leadsFilterSearch = (searchQuery) => {
  return async (dispatch) => {
    dispatch({ type: FILTER_LEADS_SEARCH, payload: searchQuery });
  };
};

export const leadsFilterDate = (filterDate) => {
  return async (dispatch) => {
    dispatch({ type: FILTER_LEADS_DATE, payload: filterDate });
  };
};
export const clearFilters = () => {
  return async (dispatch) => {
    dispatch({ type: FILTER_LEADS_CLEAR, payload: "" });
  };
};

export const datePickerState = (showDate) => {
  return async (dispatch) => {
    dispatch({ type: SET_DATEPICKER_STATE, payload: showDate });
  };
};

export const leadsDropDownFilterAction = (FilterValue) => {
  return async (dispatch) => {
    dispatch({ type: LEADS_DROPDOWN_FILTER, payload: FilterValue });
  };
};
