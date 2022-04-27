import { getLeadsList, approvRejectLeads } from "../../services/api/leads";
import {
    GET_LEADS_LIST_PENDING,
    GET_LEADS_LIST_SUCCESS,
    GET_LEADS_LIST_ERROR,
    GET_LEADS_UPDATESTATUS_PENDING,
    GET_LEADS_UPDATESTATUS_SUCCESS,
    GET_LEADS_UPDATESTATUS_ERROR,
} from "../type";

export const getAllLeadsAction = () => {
  return async (dispatch) => {
   
    dispatch({ type: GET_LEADS_LIST_PENDING, loading: true });
    try {
      const res = await getLeadsList();

      return dispatch({
        type: GET_LEADS_LIST_SUCCESS,
        payload: res,
      });
    } catch (err) {
      if (!!err && !!err.response && !!err.response.data) {
        dispatch({
          type: GET_LEADS_LIST_ERROR,
          payload: err,
        });

      } else {
        dispatch({ type: GET_LEADS_LIST_ERROR });

      }
    }
  };
};

export const updateLeadStatus = (leadsId,Status) => {
  return async (dispatch) => {
    dispatch({type: GET_LEADS_UPDATESTATUS_PENDING});
    try{
      const res = await approvRejectLeads(leadsId, Status);
       dispatch({
        type: GET_LEADS_UPDATESTATUS_SUCCESS,
        payload: res,
      })
      dispatch(getAllLeadsAction())
      
    }catch (err) {
      if (!!err && !!err.response && !!err.response.data) {
        dispatch({
          type: GET_LEADS_UPDATESTATUS_ERROR,
          payload: err,
        });


      } else {
        dispatch({ type: GET_LEADS_UPDATESTATUS_ERROR,payload: err, });

      }
    }
  }
}