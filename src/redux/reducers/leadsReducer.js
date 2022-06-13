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
  GET_USERS_PENDING,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  ADD_NOTES_PENDING,
  ADD_NOTES_SUCCESS,
  ADD_NOTES_ERROR,
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
  assignLead: {},
  addedNotes: {},
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

export const assignLeadToReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case GET_USERS_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        assignLead: payload,
        error: null,
      };
    case GET_USERS_ERROR:
      return {
        ...state,
        loading: false,
        assignLead: payload,
        error: payload,
      };
    default:
      return state;
  }
};

export const addNotesToUserReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case ADD_NOTES_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_NOTES_SUCCESS:
      return {
        ...state,
        loading: false,
        addedNotes: payload,
        error: null,
      };
    case ADD_NOTES_ERROR:
      return {
        ...state,
        loading: false,
        addedNotes: [],
        error: payload,
      };
    default:
      return state;
  }
};
