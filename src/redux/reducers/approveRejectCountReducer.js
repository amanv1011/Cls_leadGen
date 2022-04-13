import { GET_APPROVE_COUNT, GET_REJECT_COUNT,GET_UNDERREVIEW_COUNT } from "../type";

const initialState = {
  approveCount: 0,
  rejectCount: 0,
  underreviewCount: 0
};

export const getApproveRejectCountReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case GET_APPROVE_COUNT:
        return { ...state, approveCount: payload };
    case GET_REJECT_COUNT:
        return { ...state, rejectCount: payload };
    case GET_UNDERREVIEW_COUNT:
        return {...state, underreviewCount: payload}
    default:
        return{...state}
  }
};
