import {GET_APPROVE_COUNT,
    GET_REJECT_COUNT,
    GET_UNDERREVIEW_COUNT
} from "../type"

export const getApproveCount = (count) =>{
    return async(dispatch) => {
        dispatch({type:GET_APPROVE_COUNT, payload:count})
    }
}

export const getRejectCount = (count) =>{
    return async(dispatch) => {
        dispatch({type:GET_REJECT_COUNT, payload:count})
    }
}

export const getUnderreviewCount = (count) =>{
    return async(dispatch) => {
        dispatch({type:GET_UNDERREVIEW_COUNT, payload:count})
    }
}