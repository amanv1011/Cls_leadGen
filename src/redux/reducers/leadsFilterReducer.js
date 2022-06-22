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

const initialState = {
  campaignName: "All Campaigns",
  ownerName: "All Owners",
  searchQuery: "",
  filterDate: "",
  datePickerState: 0,
  leadsDropDownFilter: "AllLeads",
  countriesName: "All Countries",
};

export const leadsFilterReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FILTER_LEADS_CAMPAIGNNAME:
      return { ...state, campaignName: payload };
    case FILTER_LEADS_OWNERNAME:
      return { ...state, ownerName: payload };
    case FILTER_LEADS_COUNTRIES:
      return { ...state, countriesName: payload };
    case FILTER_LEADS_SEARCH:
      return { ...state, searchQuery: payload };
    case FILTER_LEADS_DATE:
      return { ...state, filterDate: payload };
    case FILTER_LEADS_CLEAR:
      return {
        ...state,
        campaignName: "All Campaigns",
        ownerName: "All Owners",
        countriesName: "All Counties",
        searchQuery: "",
        filterDate: "",
      };
    case SET_DATEPICKER_STATE:
      return {
        ...state,
        datePickerState: payload,
      };
    case LEADS_DROPDOWN_FILTER:
      return { ...state, leadsDropDownFilter: payload };
    default:
      return { ...state };
  }
};
