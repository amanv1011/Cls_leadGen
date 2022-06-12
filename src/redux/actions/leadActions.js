import {
  getLeadsList,
  approvRejectLeads,
  getLeadsFullDescription,
  assignLead,
} from "../../services/api/leads";
import {
  GET_LEADS_LIST_PENDING,
  GET_LEADS_LIST_SUCCESS,
  GET_LEADS_LIST_ERROR,
  GET_LEADS_UPDATESTATUS_PENDING,
  GET_LEADS_UPDATESTATUS_SUCCESS,
  GET_LEADS_UPDATESTATUS_ERROR,
  CARDS_DISPLAYED,
  GET_LEADS_LIST_FULL_DESCRIPTION_PENDING,
  GET_LEADS_LIST_FULL_DESCRIPTION_SUCCESS,
  GET_LEADS_LIST_FULL_DESCRIPTION_ERROR,
  ASSIGN_LEAD_PENDING,
  ASSIGN_LEAD_SUCCESS,
  ASSIGN_LEAD_ERROR,
} from "../type";
import { closeLoader, openLoader } from "./globalLoaderAction";

export const getAllLeadsAction = () => {
  return async (dispatch) => {
    dispatch({ type: GET_LEADS_LIST_PENDING, loading: true });
    dispatch(openLoader({ isLoading: true }));
    try {
      const res = await getLeadsList();
      dispatch(closeLoader());
      return dispatch({
        type: GET_LEADS_LIST_SUCCESS,
        payload: res,
      });
    } catch (err) {
      if (!!err && !!err.response && !!err.response.data) {
        dispatch(closeLoader());
        dispatch({
          type: GET_LEADS_LIST_ERROR,
          payload: err,
        });
      } else {
        dispatch(closeLoader());
        dispatch({ type: GET_LEADS_LIST_ERROR });
      }
    }
  };
};

export const getLeadsFullDescriptionAction = () => {
  return async (dispatch) => {
    dispatch({ type: GET_LEADS_LIST_FULL_DESCRIPTION_PENDING, loading: true });
    try {
      const res = await getLeadsFullDescription();
      return dispatch({
        type: GET_LEADS_LIST_FULL_DESCRIPTION_SUCCESS,
        payload: res,
      });
    } catch (err) {
      if (!!err && !!err.response && !!err.response.data) {
        dispatch({
          type: GET_LEADS_LIST_FULL_DESCRIPTION_ERROR,
          payload: err,
        });
      } else {
        dispatch({ type: GET_LEADS_LIST_FULL_DESCRIPTION_ERROR });
      }
    }
  };
};

export const updateLeadStatus = (leadsId, Status) => {
  console.log(leadsId);
  return async (dispatch) => {
    dispatch({ type: GET_LEADS_UPDATESTATUS_PENDING });
    try {
      const res = await approvRejectLeads(leadsId, Status);
      console.log(res);
      dispatch({
        type: GET_LEADS_UPDATESTATUS_SUCCESS,
        payload: res,
      });
      dispatch(getAllLeadsAction());
    } catch (err) {
      if (!!err && !!err.response && !!err.response.data) {
        dispatch({
          type: GET_LEADS_UPDATESTATUS_ERROR,
          payload: err,
        });
      } else {
        dispatch({ type: GET_LEADS_UPDATESTATUS_ERROR, payload: err });
      }
    }
  };
};

export const cardsDisplayAction = (cards) => {
  return async (dispatch) => {
    await dispatch({ type: CARDS_DISPLAYED, payload: cards });
  };
};

export const assignLeadToUsersAction = (leadId, userId) => {
  return async (dispatch) => {
    dispatch({ type: ASSIGN_LEAD_PENDING, loading: true });
    dispatch(openLoader({ isLoading: true }));
    try {
      const res = await assignLead(leadId, userId);
      dispatch(closeLoader());
      return dispatch({
        type: ASSIGN_LEAD_SUCCESS,
        payload: res,
      });
    } catch (err) {
      if (!!err && !!err.response && !!err.response.data) {
        dispatch(closeLoader());
        dispatch({
          type: ASSIGN_LEAD_ERROR,
          payload: err,
        });
      } else {
        dispatch(closeLoader());
        dispatch({ type: ASSIGN_LEAD_ERROR });
      }
    }
  };
};
