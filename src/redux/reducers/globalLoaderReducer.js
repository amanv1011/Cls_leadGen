import { CLOSE_LOADER, OPEN_LOADER } from "../type";

const initialSettings = {
  isLoading: null,
};

const loaderReducer = (state = initialSettings, { type, payload }) => {
  switch (type) {
    case OPEN_LOADER:
      return {
        ...state,
        isLoading: payload.isLoading,
      };
    case CLOSE_LOADER:
      return {
        ...state,
        isLoading: null,
      };

    default:
      return state;
  }
};

export default loaderReducer;
