import * as types from "../type";
import * as blockedCompaniesServices from "../../services/api/blockedCompanies";
import { openAlertAction } from "./alertActions";
import { openLoader, closeLoader } from "./globalLoaderAction";

export const getBlockedCompaniesListAction = () => {
  return async (dispatch) => {
    dispatch({ type: types.GET_BLOCKED_LIST_PENDING, loading: true });
    dispatch(openLoader({ isLoading: true }));
    try {
      const response = await blockedCompaniesServices.getBlockedCompaniesList();
      dispatch(closeLoader());

      dispatch({
        type: types.GET_BLOCKED_LIST_SUCCESS,
        payload: response,
      });
    } catch (err) {
      dispatch(closeLoader());
      dispatch({
        type: types.GET_BLOCKED_LIST_ERROR,
        payload: err,
      });
      return dispatch(openAlertAction(err.message, true, "error"));
    }
  };
};

export const postBlockedCompanyAction = (data) => {
  return async (dispatch) => {
    dispatch({ type: types.POST_BLOCKED_COMPANY_NAME_PENDING, loading: true });
    try {
      const addDoc = await blockedCompaniesServices.postBlockedCompany(data);

      if (addDoc.id) {
        dispatch({
          type: types.POST_BLOCKED_COMPANY_NAME_SUCCESS,
          payload: { ...data, id: addDoc.id },
        });
      }
    } catch (err) {
      dispatch({
        type: types.POST_BLOCKED_COMPANY_NAME_ERROR,
        payload: err.message,
      });
    }
  };
};

// export const deleteBlockedCompaniesListAction = (leadId) => {
//   return async (dispatch) => {
//     try {
//       const response =
//         await blockedCompaniesServices.deleteBlockedCompaniesList(leadId);
//       if (response.id) {
//         dispatch({
//           type: types.DELETE_BLOCKED_COMPANY_NAME_SUCCESS,
//           payload: response,
//         });
//       } else {
//         dispatch({
//           type: types.DELETE_BLOCKED_COMPANY_NAME_ERROR,
//           payload: response.message,
//         });
//       }
//     } catch (err) {
//       dispatch({
//         type: types.DELETE_BLOCKED_COMPANY_NAME_ERROR,
//         payload: err.message,
//       });
//     }
//   };
// };
