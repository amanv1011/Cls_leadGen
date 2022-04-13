import {GET_POPUP_ENABLE} from '../type';
import {GET_POPUP_DISABLE} from '../type';

export const getPopupEnable = (popupData) => {
return async (dispatch) => { 
    dispatch({ type: GET_POPUP_ENABLE , payload: popupData })
} 
}

export const getPopupDisable = () => {
    return async (dispatch) => { 
        dispatch({ type: GET_POPUP_DISABLE })
    }
}