import * as types from "../type";

const initialSettings = {
  message: "",
  open: false,
  error: false,
  type: "",
};

export const alertReducer = (state = initialSettings, { type, payload }) => {
  switch (type) {
    case types.OPEN_ALERT:
      return {
        ...state,
        message: payload.message,
        open: true,
        error: payload.error,
        type: payload.type,
      };
    case types.CLOSE_ALERT:
      return {
        ...state,
        message: "",
        open: false,
        error: false,
        type: "",
      };

    default:
      return state;
  }
};
