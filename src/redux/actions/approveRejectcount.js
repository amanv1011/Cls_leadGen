import {GET_APPROVE_COUNT,
    GET_REJECT_COUNT,
    GET_UNDERREVIEW_COUNT,
    GET_ARCHIEVE_COUNT,
    GET_ALL_COUNT
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

export const getArchieveCount = (count) =>{
    return async(dispatch) => {
        dispatch({type:GET_ARCHIEVE_COUNT, payload:count})
    }
}

export const getAllCount = (count) => {
    return async(dispatch) => {
        dispatch({type:GET_ALL_COUNT, payload:count})
    }
}