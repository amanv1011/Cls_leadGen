import { OPEN_LOADER, CLOSE_LOADER } from "../type";

export const openLoader = (isLoading) => {
  return {
    type: OPEN_LOADER,
    payload: isLoading,
  };
};

export const closeLoader = () => {
  return {
    type: CLOSE_LOADER,
    // payload: { isLoading }
  };
};
