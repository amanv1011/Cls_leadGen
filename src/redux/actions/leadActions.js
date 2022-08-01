import {
  getLeadsList,
  approvRejectLeads,
  getLeadsFullDescription,
  assignLead,
  addNotes,
  updateLeadViewStatus,
  getAssignedLeads,
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
  ADD_NOTES_PENDING,
  ADD_NOTES_SUCCESS,
  ADD_NOTES_ERROR,
  UPDATE_LEAD_VIEW_SUCCESS,
  UPDATE_LEAD_VIEW_ERROR,
  UPDATE_LEAD_VIEW_PENDING,
  GET_ASSIGNED_LEADS_SUCCESS,
  GET_ASSIGNED_LEADS_PENDING,
  GET_ASSIGNED_LEADS_ERROR,
} from "../type";
import { openAlertAction } from "./alertActions";
import { closeLoader, openLoader } from "./globalLoaderAction";

export const getAllLeadsAction = () => {
  return async (dispatch) => {
    dispatch({ type: GET_LEADS_LIST_PENDING, loading: true });
    // dispatch(openLoader({ isLoading: true }));
    try {
      const res = await getLeadsList();
      // dispatch(closeLoader());
      return dispatch({
        type: GET_LEADS_LIST_SUCCESS,
        payload: res,
      });
    } catch (err) {
      if (!!err && !!err.response && !!err.response.data) {
        // dispatch(closeLoader());
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

export const updateLeadStatus = (leadsId, Status, reason) => {
  return async (dispatch) => {
    dispatch({ type: GET_LEADS_UPDATESTATUS_PENDING });
    dispatch(openLoader({ isLoading: true }));
    try {
      const res = await approvRejectLeads(leadsId, Status, reason);
      dispatch({
        type: GET_LEADS_UPDATESTATUS_SUCCESS,
        payload: res,
      });
      await dispatch(
        openAlertAction(
          res && res.status === 1
            ? "Approved Successfully"
            : res.status === -1
            ? "Rejected Successfully"
            : res.status === 2
            ? "Archieved Successfully"
            : "Under Reviewed Successfully",
          true,
          "success"
        )
      );
      dispatch(closeLoader());
    } catch (err) {
      if (!!err && !!err.response && !!err.response.data) {
        dispatch({
          type: GET_LEADS_UPDATESTATUS_ERROR,
          payload: err,
        });
        await dispatch(openAlertAction("Operation Failed!", true, "error"));
        dispatch(closeLoader());
      } else {
        dispatch({ type: GET_LEADS_UPDATESTATUS_ERROR, payload: err });
        dispatch(closeLoader());
      }
    }
  };
};

export const cardsDisplayAction = (cards) => {
  return async (dispatch) => {
    await dispatch({ type: CARDS_DISPLAYED, payload: cards });
  };
};

export const assignLeadToUsersAction = (leadId, userId, multiple) => {
  return async (dispatch) => {
    dispatch({ type: ASSIGN_LEAD_PENDING, loading: true });
    dispatch(openLoader({ isLoading: true }));
    try {
      const res = await assignLead(leadId, userId, multiple);
      dispatch({
        type: ASSIGN_LEAD_SUCCESS,
        payload: res,
      });
      return dispatch(closeLoader());
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

export const addNotestoLeadAction = (leadId, notes) => {
  return async (dispatch) => {
    dispatch({ type: ADD_NOTES_PENDING, loading: true });
    dispatch(openLoader({ isLoading: true }));
    try {
      const NotesRes = await addNotes(leadId, notes);
      dispatch(closeLoader());
      await dispatch(
        openAlertAction("Note added successfully!", true, "success")
      );
      return dispatch({
        type: ADD_NOTES_SUCCESS,
        payload: NotesRes,
      });
    } catch (err) {
      if (!!err && !!err.response && !!err.response.data) {
        dispatch(closeLoader());
        dispatch({
          type: ADD_NOTES_ERROR,
          payload: err,
        });
      } else {
        dispatch(closeLoader());
        dispatch({ type: ADD_NOTES_ERROR });
      }
    }
  };
};

export const updateLeadViewStatusAction = (leadId) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_LEAD_VIEW_PENDING, loading: true });
    dispatch(openLoader({ isLoading: true }));
    try {
      const res = await updateLeadViewStatus(leadId);
      dispatch(closeLoader());
      return dispatch({
        type: UPDATE_LEAD_VIEW_SUCCESS,
        payload: res,
      });
    } catch (err) {
      if (!!err && !!err.response && !!err.response.data) {
        dispatch(closeLoader());
        dispatch({
          type: UPDATE_LEAD_VIEW_ERROR,
          payload: err,
        });
      } else {
        dispatch(closeLoader());
        dispatch({ type: UPDATE_LEAD_VIEW_ERROR });
      }
    }
  };
};

export const getAssignedLeadsAction = () => {
  return async (dispatch) => {
    dispatch({ type: GET_ASSIGNED_LEADS_PENDING, loading: true });
    try {
      const res = await getAssignedLeads();
      dispatch(closeLoader());
      return dispatch({
        type: GET_ASSIGNED_LEADS_SUCCESS,
        payload: res,
      });
    } catch (err) {
      if (!!err && !!err.response && !!err.response.data) {
        dispatch({
          type: GET_ASSIGNED_LEADS_ERROR,
          payload: err,
        });
      } else {
        dispatch({ type: GET_ASSIGNED_LEADS_ERROR });
      }
    }
  };
};
