import * as types from "../type";

const initialState = {
  blockedCompainesList: [],
};

export const blockedCompaniesReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case types.GET_BLOCKED_LIST_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_BLOCKED_LIST_SUCCESS:
      const ids = payload.map((o) => o.companyName);
      const filtered = payload.filter(
        ({ companyName }, index) => !ids.includes(companyName, index + 1)
      );
      return {
        ...state,
        loading: false,
        blockedCompainesList: filtered,
        error: null,
      };
    case types.GET_BLOCKED_LIST_ERROR:
      return {
        ...state,
        loading: false,
        blockedCompainesList: [],
        error: payload,
      };

    case types.POST_BLOCKED_COMPANY_NAME_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.POST_BLOCKED_COMPANY_NAME_SUCCESS:
      return {
        ...state,
        blockedCompainesList: [...state.blockedCompainesList, payload],
      };

    case types.POST_BLOCKED_COMPANY_NAME_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case types.DELETE_BLOCKED_COMPANY_NAME_SUCCESS:
      console.log("payloadpayloadpayloadpayload", payload);
      console.log("state.blockedCompainesList--->", state.blockedCompainesList);
      const newList = state.blockedCompainesList.filter(
        (item) => item.leadId !== payload.id
      );
      console.log("newList", newList);
      return {
        ...state,
        blockedCompainesList: newList,
        error: null,
      };

    case types.DELETE_BLOCKED_COMPANY_NAME_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return { ...state };
  }
};
