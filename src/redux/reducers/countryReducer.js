import * as types from "../type";

const initialState = {
  countryList: [],
};

export const countryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_COUNTRY_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_COUNTRY_SUCCESS:
      return {
        ...state,
        loading: false,
        countryList: payload,
        error: null,
      };
    case types.GET_COUNTRY_ERROR:
      return {
        ...state,
        loading: false,
        countryList: [],
        error: payload,
      };
    default:
      return state;
  }
};
