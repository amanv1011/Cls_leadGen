import * as types from "../type";
import * as campaignServices from "../../services/api/campaign";
import { openAlertAction } from "./alertActions";
import { closeLoader, openLoader } from "./globalLoaderAction";

export const getACampaignAction = (a__campgaignId) => {
  return async (dispatch) => {
    dispatch({ type: types.GET_A_CAMPAIGN_PENDING, loading: true });
    try {
      const response = await campaignServices.get_A_Campaign(a__campgaignId);
      return dispatch({
        type: types.GET_A_CAMPAIGN_SUCCESS,
        payload: { ...response.data(), id: response.id },
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
    dispatch({ type: types.GET_CAMPAIGN_LIST_PENDING, loading: true });
    dispatch(openLoader({ isLoading: true }));
    try {
      const response = await campaignServices.getCampaignList();
      dispatch(closeLoader());

      dispatch({
        type: types.GET_CAMPAIGN_LIST_SUCCESS,
        payload: response,
      });
    } catch (err) {
      dispatch(closeLoader());
      dispatch({
        type: types.GET_CAMPAIGN_LIST_ERROR,
        payload: err,
      });
      return dispatch(openAlertAction(err.message, true, "error"));
    }
  };
};

export const postCampaignAction = (data) => {
  return async (dispatch) => {
    dispatch({ type: types.POST_CAMPAIGN_DATA_PENDING, loading: true });
    try {
      const addDoc = await campaignServices.postCampaignData(data);
      dispatch(closeLoader());
      if (addDoc.id) {
        dispatch({
          type: types.POST_CAMPAIGN_DATA_SUCCESS,
          payload: { ...data, id: addDoc.id },
        });
        return dispatch(
          openAlertAction("Campaign Added successfully", true, "success")
        );
      } else {
        dispatch({
          type: types.POST_CAMPAIGN_DATA_ERROR,
          payload: addDoc.message,
        });
        return dispatch(openAlertAction(addDoc.message, true, "error"));
      }
    } catch (err) {
      dispatch(closeLoader());
      dispatch({
        type: types.POST_CAMPAIGN_DATA_ERROR,
        payload: err.message,
      });
      return dispatch(openAlertAction(err.message, true, "error"));
    }
  };
};

export const deleteCampaignsAction = (campaignId) => {
  return async (dispatch) => {
    dispatch(openLoader({ isLoading: true }));
    try {
      const response = await campaignServices.deleteCampaignData(campaignId);
      dispatch(closeLoader());
      if (response.id) {
        dispatch({
          type: types.DELETE_CAMPAIGN_DATA_SUCCESS,
          payload: response,
        });
        return dispatch(
          openAlertAction("Campaign Deleted successfully", true, "success")
        );
      } else {
        dispatch(closeLoader());
        dispatch({
          type: types.DELETE_CAMPAIGN_DATA_ERROR,
          payload: response.message,
        });
        return dispatch(openAlertAction(response.message, true, "error"));
      }
    } catch (err) {
      dispatch(closeLoader());
      dispatch({
        type: types.DELETE_CAMPAIGN_DATA_ERROR,
        payload: err.message,
      });
      return dispatch(openAlertAction(err.message, true, "error"));
    }
  };
};

export const updateCampaignsAction = (campaignId, campaignUpdateObject) => {
  return async (dispatch) => {
    dispatch({ type: types.UPDATE_CAMPAIGN_DATA_PENDING, loading: true });
    try {
      const res = await campaignServices.updateCampaignData(
        campaignId,
        campaignUpdateObject
      );
      if (res === undefined) {
        dispatch({
          type: types.UPDATE_CAMPAIGN_DATA_SUCCESS,
          payload: { ...campaignUpdateObject, id: campaignId },
        });
        return dispatch(
          openAlertAction("Campaign Updated successfully", true, "success")
        );
      } else {
        dispatch({
          type: types.UPDATE_CAMPAIGN_DATA_ERROR,
          payload: res.message,
        });
        return dispatch(openAlertAction(res.message, true, "error"));
      }
    } catch (err) {
      dispatch({
        type: types.UPDATE_CAMPAIGN_DATA_ERROR,
        payload: err.message,
      });
      return dispatch(openAlertAction(err.message, true, "error"));
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

export const getSearchedCampaignList = (searchedCampaignList) => {
  return async (dispatch) => {
    await dispatch({
      type: types.SEARCHED_CAMPAIGNS,
      payload: searchedCampaignList,
    });
  };
};

export const assignCampaignToUsersAction = (campaignId, userId, multiple) => {
  return async (dispatch) => {
    dispatch({ type: types.ASSIGN_CAMPAIGN_PENDING, loading: true });
    dispatch(openLoader({ isLoading: true }));
    try {
      const res = await campaignServices.assignCampaign(
        campaignId,
        userId,
        multiple
      );
      dispatch(closeLoader());
      return dispatch({
        type: types.ASSIGN_CAMPAIGN_SUCCESS,
        payload: res,
      });
    } catch (err) {
      if (!!err && !!err.response && !!err.response.data) {
        dispatch(closeLoader());
        dispatch({
          type: types.ASSIGN_CAMPAIGN_ERROR,
          payload: err,
        });
      } else {
        dispatch(closeLoader());
        dispatch({ type: types.ASSIGN_CAMPAIGN_ERROR });
      }
    }
  };
};

export const getAssignedCampaignsAction = () => {
  return async (dispatch) => {
    dispatch({ type: types.GET_ASSIGNED_CAMPAIGN_PENDING, loading: true });
    try {
      const res = await campaignServices.getAssignedCampaigns();
      dispatch(closeLoader());
      return dispatch({
        type: types.GET_ASSIGNED_CAMPAIGN_SUCCESS,
        payload: res,
      });
    } catch (err) {
      if (!!err && !!err.response && !!err.response.data) {
        dispatch({
          type: types.GET_ASSIGNED_CAMPAIGN_ERROR,
          payload: err,
        });
      } else {
        dispatch({ type: types.GET_ASSIGNED_CAMPAIGN_ERROR });
      }
    }
  };
};

export const updateCampaignViewStatusAction = (campaignId) => {
  return async (dispatch) => {
    dispatch({
      type: types.UPDATE_CAMPAIGN_VIEW_PENDING,

      loading: true,
    });
    dispatch(openLoader({ isLoading: true }));
    try {
      const res = await campaignServices.updateCampaignViewStatus(campaignId);
      dispatch(closeLoader());
      return dispatch({
        type: types.UPDATE_CAMPAIGN_VIEW_SUCCESS,
        payload: res,
      });
    } catch (err) {
      if (!!err && !!err.response && !!err.response.data) {
        dispatch(closeLoader());
        dispatch({
          type: types.UPDATE_CAMPAIGN_VIEW_ERROR,
          payload: err,
        });
      } else {
        dispatch(closeLoader());
        dispatch({ type: types.UPDATE_CAMPAIGN_VIEW_ERROR });
      }
    }
  };
};

export const updateCampaignStatusAction = (campaignId, status) => {
  return async (dispatch) => {
    dispatch({
      type: types.UPDATE_CAMPAIGN_STATUS_PENDING,
      loading: true,
    });
    dispatch(openLoader({ isLoading: true }));
    try {
      const res = await campaignServices.updateCampaignStatus(
        campaignId,
        status
      );
      dispatch(closeLoader());

      if (res.campaignId && res.status === 1) {
        dispatch(
          openAlertAction("Campaign activated Successfully", false, "success")
        );
      }
      if (res.campaignId && res.status === 0) {
        dispatch(
          openAlertAction(
            "Campaign de-activated Successfully",
            false,
            "success"
          )
        );
      }
      return dispatch({
        type: types.UPDATE_CAMPAIGN_STATUS_SUCCESS,
        payload: res,
      });
    } catch (err) {
      if (!!err && !!err.response && !!err.response.data) {
        dispatch(closeLoader());
        dispatch({
          type: types.UPDATE_CAMPAIGN_STATUS_ERROR,
          payload: err,
        });
      } else {
        dispatch(closeLoader());
        dispatch({ type: types.UPDATE_CAMPAIGN_STATUS_ERROR });
      }
    }
  };
};
