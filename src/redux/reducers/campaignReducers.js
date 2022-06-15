import * as types from "../type";

const initialState = {
  campaignList: [],
  loading: null,
  error: null,
  isModalVisible: false,
  a__campgaign__Id: "",
  initialSearchValue: "",
  campaignDoc: {},
  searchedCampaignList: [],
  campaignDetailsToUpdate: {},
};

// fetch all campaign list
export const getAllCampaignsReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case types.GET_CAMPAIGN_LIST_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_CAMPAIGN_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        campaignList: payload,
        error: null,
      };
    case types.GET_CAMPAIGN_LIST_ERROR:
      return {
        ...state,
        loading: false,
        campaignList: [],
        error: payload,
      };
    case types.POST_CAMPAIGN_DATA_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.POST_CAMPAIGN_DATA_SUCCESS:
      return {
        ...state,
        campaignList: [...state.campaignList, payload],
        loading: false,
        error: null,
      };

    case types.POST_CAMPAIGN_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case types.DELETE_CAMPAIGN_DATA_SUCCESS:
      const newList = state.campaignList.filter(
        (item) => item.id !== payload.id
      );
      return {
        ...state,
        campaignList: newList,
        error: null,
      };

    case types.DELETE_CAMPAIGN_DATA_ERROR:
      return {
        ...state,
        error: payload,
      };

    case types.UPDATE_CAMPAIGN_DATA_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.UPDATE_CAMPAIGN_DATA_SUCCESS:
      var updatedData = state.campaignList.map((item) => {
        if (item.id === payload.id) {
          return payload;
        }
        return item;
      });
      return {
        ...state,
        campaignList: updatedData,
        error: null,
      };

    case types.UPDATE_CAMPAIGN_DATA_ERROR:
      return {
        ...state,
        error: payload,
      };

    case types.GET_A_CAMPAIGN_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.GET_A_CAMPAIGN_SUCCESS:
      return {
        ...state,
        loading: false,
        campaignDoc: payload,
        error: null,
      };

    case types.GET_A_CAMPAIGN_ERROR:
      return {
        ...state,
        loading: false,
        campaignDoc: {},
        error: payload,
      };

    case types.SHOW_MODAL:
      return { ...state, isModalVisible: true };

    case types.HANDLE_CLOSE:
      return { ...state, isModalVisible: false };

    case types.CAMPAIGN_ID:
      return { ...state, a__campgaign__Id: payload };

    case types.SEARCH_INPUT_VALUE:
      return { ...state, initialSearchValue: payload };

    case types.SEARCHED_CAMPAIGNS:
      return {
        ...state,
        searchedCampaignList: payload,
      };

    case types.CAMPAIGN_DETAILS_TO_UPDATE:
      return {
        ...state,
        campaignDetailsToUpdate: payload,
      };

    default:
      return state;
  }
};
