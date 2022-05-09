import { DATE_MODAL_OPEN, DATE_MODAL_CLOSE } from '../type';


const initialState = {
    isOpen: false

}

export const dateModalReducer = (state = initialState, { type }) => {
    switch (type) {
        case DATE_MODAL_OPEN:
            return { ...state, isOpen: true }

        case DATE_MODAL_CLOSE:
            return { ...state, isOpen: false }
        default:
            return {
                ...state
            }
    }

}