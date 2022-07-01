import * as types from "../type";

const initialState = {
  lastCrawledDateList: [],
  loading: null,
  error: null,
};

// fetch last crawled date from firebase collections
export const getLastCrawledDateReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case types.GET_LAST_CRAWLED_DATE_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.GET_LAST_CRAWLED_DATE_SUCCESS:
      return {
        ...state,
        loading: false,
        lastCrawledDateList: payload,
        error: null,
      };

    case types.GET_LAST_CRAWLED_DATE_ERROR:
      return {
        ...state,
        loading: false,
        lastCrawledDateList: [],
        error: payload,
      };
    default:
      return state;
  }
};
