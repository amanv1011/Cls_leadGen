import { combineReducers } from "redux";
import { getAllCampaignsReducer } from "./campaignReducers";
import { getAllLeadsReducer } from "./leadsReducer";
import { getApproveRejectCountReducer } from "./approveRejectCountReducer";
import { PopupReducers } from "./PopupReducers";
import { leadsFilterReducer } from "./leadsFilterReducer";
import { dateModalReducer } from "./dateModalReducer";
import { paginationReducer } from "./paginationReducer";
import { alertReducer } from "./alertReducer";
import loaderReducer from "./globalLoaderReducer";

const rootReducer = combineReducers({
  allCampaigns: getAllCampaignsReducer,
  allLeads: getAllLeadsReducer,
  approveRejectCount: getApproveRejectCountReducer,
  popupStatus: PopupReducers,
  leadsFilter: leadsFilterReducer,
  dateModal: dateModalReducer,
  paginationStates: paginationReducer,
  snackBar: alertReducer,
  loaderReducer: loaderReducer,
});

export default rootReducer;
