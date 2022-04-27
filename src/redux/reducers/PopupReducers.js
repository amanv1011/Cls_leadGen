import { GET_POPUP_ENABLE } from '../type';
import { GET_POPUP_DISABLE } from '../type';

const initialState = {
    popupStatus: false,
    popupData: []

}

export const PopupReducers = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_POPUP_ENABLE:
            return {
                popupStatus: true,
                popupData: payload
            }
        case GET_POPUP_DISABLE:
            return {
                popupStatus: false,
                popupData: []
            }
        default:
            return {
                ...state
            }
    }
}

