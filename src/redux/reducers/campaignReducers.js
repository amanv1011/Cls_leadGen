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
  assignCampaign: {},
  assignedCampaigns: [],
  campaignViewStatus: {},
  campaignStateStatus: {},
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
        campaignList: [payload, ...state.campaignList],
        campaignDoc: {},
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
      const newList = state.campaignList?.filter(
        (item) => item.id !== payload.id
      );
      return {
        ...state,
        campaignList: newList,
        campaignDoc: {},
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
      let updatedData = state.campaignList.map((item) => {
        if (item.id === payload.id) {
          return payload;
        }
        return item;
      });
      return {
        ...state,
        campaignList: updatedData,
        campaignDoc: updatedData.filter(
          (updatedCampaign) => updatedCampaign.id === payload.id
        ),
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

    case types.ASSIGN_CAMPAIGN_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.ASSIGN_CAMPAIGN_SUCCESS:
      return {
        ...state,
        loading: false,
        assignCampaign: payload,
        error: null,
      };
    case types.ASSIGN_CAMPAIGN_ERROR:
      return {
        ...state,
        loading: false,
        assignCampaign: {},
        error: payload,
      };

    case types.GET_ASSIGNED_CAMPAIGN_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_ASSIGNED_CAMPAIGN_SUCCESS:
      return {
        ...state,
        loading: false,
        assignedCampaigns: payload,
        error: null,
      };
    case types.GET_ASSIGNED_CAMPAIGN_ERROR:
      return {
        ...state,
        loading: false,
        assignedCampaigns: [],
        error: payload,
      };

    case types.UPDATE_CAMPAIGN_VIEW_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.UPDATE_CAMPAIGN_VIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        campaignViewStatus: payload,
        error: null,
      };
    case types.UPDATE_CAMPAIGN_VIEW_ERROR:
      return {
        ...state,
        loading: false,
        campaignViewStatus: {},
        error: payload,
      };

    case types.UPDATE_CAMPAIGN_STATUS_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.UPDATE_CAMPAIGN_STATUS_SUCCESS:
      let updatedStatus = state.campaignList.map(
        (campaign) => campaign.id === payload.campaignId
      );

      const response = state.campaignList.map((campaign) => {
        if (campaign.id === payload.campaignId) {
          return { ...campaign, status: payload.status };
        }
        return campaign;
      });
      return {
        ...state,
        campaignStateStatus: { ...updatedStatus[0], status: payload.status },
        campaignList: response,
        error: null,
      };
    case types.UPDATE_CAMPAIGN_STATUS_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};
