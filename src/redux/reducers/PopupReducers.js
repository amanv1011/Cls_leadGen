import { GET_LEAD_DATA } from "../type";

const initialState = {
  //   popupStatus: false,
  popupData: [],
};

export const PopupReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_LEAD_DATA:
      return {
        // popupStatus: true,
        popupData: payload,
      };

    default:
      return {
        ...state,
      };
  }
};
