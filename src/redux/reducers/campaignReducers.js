import {
  GET_CAMPAIGN_LIST_ERROR,
  GET_CAMPAIGN_LIST_PENDING,
  GET_CAMPAIGN_LIST_SUCCESS,
} from "../type";
import * as types from "../type";

const initialState = {
  campaignList: [],
  loading: null,
  error: null,
  message: "",
  isModalVisible: false,
  a__campgaign__Id: "",
  initialSearchValue: "",
};

// fetch all campaign list
export const getAllCampaignsReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case GET_CAMPAIGN_LIST_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_CAMPAIGN_LIST_SUCCESS:
      
      return {
        ...state,
        loading: false,
        campaignList: payload,
        error: null,
      };
    case GET_CAMPAIGN_LIST_ERROR:
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
        error: null,
      };

    case types.POST_CAMPAIGN_DATA_ERROR:
      return {
        ...state,
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

    case types.UPDATE_CAMPAIGN_DATA_SUCCESS:
      const updatedData = state.campaignList.map((item) => {
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

    case types.SHOW_MODAL:
      return { ...state, isModalVisible: true };

    case types.HANDLE_CLOSE:
      return { ...state, isModalVisible: false };

    case types.CAMPAIGN_ID:
      return { ...state, a__campgaign__Id: payload };

    case types.SEARCH_INPUT_VALUE:
      return { ...state, initialSearchValue: payload };

    default:
      return state;
  }
};
