import { GET_TOTAL_COUNT, GET_LEADS_PER_PAGE, GET_ACTIVE_COUNT } from "../type";

const initialState = {
  totalCount: 0,
  leadsPerPage: 10,
  activePage: 1,
};

export const paginationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_TOTAL_COUNT:
      return { ...state, totalCount: payload };
    case GET_LEADS_PER_PAGE:
      return { ...state, leadsPerPage: payload };
    case GET_ACTIVE_COUNT:
      return { ...state, activePage: payload };
    default:
      return { ...state };
  }
};
