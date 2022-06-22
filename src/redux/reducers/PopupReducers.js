import { GET_LEAD_DATA } from "../type";

const initialState = {
  popupData: {},
};

export const PopupReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_LEAD_DATA:
      return {
        popupData: payload,
      };

    default:
      return {
        ...state,
      };
  }
};
