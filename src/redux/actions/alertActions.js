import * as types from "../type";

export const openAlertAction = (message, error, type, duration = 6000) => {
  if (!message || message === undefined) {
    message = "Operation has failed, please refresh again.";
    error = true;
  }
  return {
    type: types.OPEN_ALERT,
    payload: { message, error, type, duration },
  };
};

export const closeAlertAction = () => {
  return {
    type: types.CLOSE_ALERT,
  };
};
