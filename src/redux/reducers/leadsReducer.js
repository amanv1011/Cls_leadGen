import {
  GET_LEADS_LIST_ERROR,
  GET_LEADS_LIST_PENDING,
  GET_LEADS_LIST_SUCCESS,
  GET_LEADS_UPDATESTATUS_PENDING,
  GET_LEADS_UPDATESTATUS_SUCCESS,
  GET_LEADS_UPDATESTATUS_ERROR,
  CARDS_DISPLAYED,
  GET_LEADS_LIST_FULL_DESCRIPTION_PENDING,
  GET_LEADS_LIST_FULL_DESCRIPTION_SUCCESS,
  GET_LEADS_LIST_FULL_DESCRIPTION_ERROR,
} from "../type";

const initialState = {
  leadsList: [],
  loading: null,
  error: null,
  message: "",
  approveRejectErr: null,
  approveRejectResponse: null,
  cardsToDisplay: [],
  leadsFullDescription: [],
};

// fetch all campaign list
export const getAllLeadsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_LEADS_LIST_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_LEADS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        leadsList: payload,
        error: null,
      };
    case GET_LEADS_LIST_ERROR:
      return {
        ...state,
        loading: false,
        leadsList: [],
        error: payload,
      };

    case GET_LEADS_LIST_FULL_DESCRIPTION_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_LEADS_LIST_FULL_DESCRIPTION_SUCCESS:
      return {
        ...state,
        loading: false,
        leadsFullDescription: payload,
        error: null,
      };
    case GET_LEADS_LIST_FULL_DESCRIPTION_ERROR:
      return {
        ...state,
        loading: false,
        leadsFullDescription: [],
        error: payload,
      };

    case GET_LEADS_UPDATESTATUS_PENDING:
      return {
        ...state,
        loding: true,
        approveRejectErr: null,
      };
    case GET_LEADS_UPDATESTATUS_SUCCESS:
      return {
        ...state,
        loding: false,
        approveRejectResponse: payload,
      };
    case GET_LEADS_UPDATESTATUS_ERROR:
      return {
        ...state,
        loding: false,
        approveRejectErr: payload,
      };

    case CARDS_DISPLAYED:
      return {
        ...state,
        cardsToDisplay: payload,
      };

    default:
      return state;
  }
};
