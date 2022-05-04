import {
  FILTER_LEADS_CAMPAIGNNAME,
  FILTER_LEADS_OWNERNAME,
  FILTER_LEADS_SEARCH,
  FILTER_LEADS_DATE,
  FILTER_LEADS_CLEAR
} from "../type";


const initialState = {
  campaignName: "All Campaigns",
  ownerName: "All Owners",
  searchQuery: "",
  filterDate: "",
};

export const leadsFilterReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FILTER_LEADS_CAMPAIGNNAME:
      return { ...state, campaignName: payload };
    case FILTER_LEADS_OWNERNAME:
      return { ...state, ownerName: payload };
    case FILTER_LEADS_SEARCH:
      return { ...state, searchQuery: payload };
    case FILTER_LEADS_DATE:
      return { ...state, filterDate: payload };
    case FILTER_LEADS_CLEAR:
      return {
        ...state, 
        campaignName: "All Campaigns",
        ownerName: "All Owners",
        searchQuery: "",
        filterDate: ""
      }
    default:
      return { ...state, };
  }
};
