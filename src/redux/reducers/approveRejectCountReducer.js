import { GET_APPROVE_COUNT, GET_REJECT_COUNT,GET_UNDERREVIEW_COUNT,GET_ARCHIEVE_COUNT,GET_ALL_COUNT } from "../type";

const initialState = {
  approveCount: 0,
  rejectCount: 0,
  underreviewCount: 0,
  archieveCount: 0,
  allCount:0
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
    case GET_ARCHIEVE_COUNT:
      return { ...state, archieveCount: payload };
    case GET_ALL_COUNT:
      return { ...state, allCount: payload}
    default:
        return{...state}
  }
};
