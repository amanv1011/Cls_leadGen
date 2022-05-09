import { DATE_MODAL_CLOSE, DATE_MODAL_OPEN} from '../type';

export const openDateModal = () => {
    return async(dispatch) => {
        dispatch({type: DATE_MODAL_OPEN})
    } 
}

export const closeDateModal = () => {
    return async(dispatch) => {
        dispatch({type: DATE_MODAL_CLOSE})
    } 
}