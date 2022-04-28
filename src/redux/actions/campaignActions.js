import { getCampaignList } from "../../services/api/campaign";
import {
  GET_CAMPAIGN_LIST_ERROR,
  GET_CAMPAIGN_LIST_PENDING,
  GET_CAMPAIGN_LIST_SUCCESS,
} from "../type";
import * as types from "../type";
import * as campaignServices from "../../services/api/campaign";

export const getACampaignAction = (a__campgaignId) => {
  return async (dispatch) => {
    dispatch({ type: types.GET_A_CAMPAIGN_PENDING, loading: true });
    try {
      const res = await campaignServices.get_A_Campaign(a__campgaignId);
      return dispatch({
        type: types.GET_A_CAMPAIGN_SUCCESS,
        payload: res,
      });
    } catch (err) {
      if (!!err && !!err.response && !!err.response.data) {
        dispatch({
          type: types.GET_A_CAMPAIGN_ERROR,
          payload: err,
        });
      } else {
        dispatch({ type: types.GET_A_CAMPAIGN_ERROR });
      }
    }
  };
};

export const getAllCampaignsAction = () => {
  return async (dispatch) => {
    dispatch({ type: GET_CAMPAIGN_LIST_PENDING, loading: true });
    try {
      const res = await getCampaignList();
      if (res.length === undefined) {
        dispatch({
          type: GET_CAMPAIGN_LIST_ERROR,
          payload: res,
        });
      } else {
        return dispatch({
          type: GET_CAMPAIGN_LIST_SUCCESS,
          payload: res,
        });
      }
    } catch (err) {
      if (!!err && !!err.response && !!err.response.data) {
        dispatch({
          type: GET_CAMPAIGN_LIST_ERROR,
          payload: err,
        });
      } else {
        dispatch({ type: GET_CAMPAIGN_LIST_ERROR });
      }
    }
  };
};

export const postCampaignsAction = (data) => {
  return async (dispatch) => {
    dispatch({ type: types.POST_CAMPAIGN_DATA_PENDING, loading: true });
    try {
      await campaignServices.postCampaignData(data);
      dispatch({
        type: types.POST_CAMPAIGN_DATA_SUCCESS,
        payload: data,
      });
    } catch (err) {
      if (!!err && !!err.response && !!err.response.data) {
        dispatch({
          type: types.POST_CAMPAIGN_DATA_ERROR,
          payload: err,
        });
      } else {
        dispatch({ type: types.POST_CAMPAIGN_DATA_ERROR });
      }
    }
  };
};

export const deleteCampaignsAction = (campaignId) => {
  return async (dispatch) => {
    try {
      const res = await campaignServices.deleteCampaignData(campaignId);
      dispatch({
        type: types.DELETE_CAMPAIGN_DATA_SUCCESS,
        payload: res,
      });
    } catch (err) {
      if (!!err && !!err.response && !!err.response.data) {
        dispatch({
          type: types.DELETE_CAMPAIGN_DATA_ERROR,
          payload: err,
        });
      } else {
        dispatch({ type: types.DELETE_CAMPAIGN_DATA_ERROR });
      }
    }
  };
};

export const updateCampaignsAction = (campaignId, campaignUpdateObject) => {
  return async (dispatch) => {
    try {
      const res = await campaignServices.updateCampaignData(
        campaignId,
        campaignUpdateObject
      );
      dispatch({
        type: types.UPDATE_CAMPAIGN_DATA_SUCCESS,
        payload: campaignUpdateObject,
      });
    } catch (err) {
      if (!!err && !!err.response && !!err.response.data) {
        dispatch({
          type: types.UPDATE_CAMPAIGN_DATA_ERROR,
          payload: err,
        });
      } else {
        dispatch({ type: types.UPDATE_CAMPAIGN_DATA_ERROR });
      }
    }
  };
};

export const showModal = () => {
  return async (dispatch) => {
    await dispatch({ type: types.SHOW_MODAL });
  };
};

export const handleClose = () => {
  return async (dispatch) => {
    await dispatch({ type: types.HANDLE_CLOSE });
  };
};

export const campaignIDAction = (campaignID) => {
  return async (dispatch) => {
    await dispatch({ type: types.CAMPAIGN_ID, payload: campaignID });
  };
};

export const searchInputValueAction = (inputValue) => {
  return async (dispatch) => {
    await dispatch({ type: types.SEARCH_INPUT_VALUE, payload: inputValue });
  };
};

export const getAFeildInADocumentActionActive = () => {
  return async (dispatch) => {
    await dispatch({ type: types.UPDATE_STATUS_DATA_ACTIVE });
  };
};
