import { combineReducers } from "redux";
import { getAllCampaignsReducer } from "./campaignReducers";
import {
  getAllLeadsReducer,
  assignLeadToReducer,
  updateLeadViewStatusReducer,
} from "./leadsReducer";
import { getApproveRejectCountReducer } from "./approveRejectCountReducer";
import { PopupReducers } from "./PopupReducers";
import { leadsFilterReducer } from "./leadsFilterReducer";
import { dateModalReducer } from "./dateModalReducer";
import { paginationReducer } from "./paginationReducer";
import { alertReducer } from "./alertReducer";
import loaderReducer from "./globalLoaderReducer";
import { getUsersReducer } from "./usersReducer";
import { campaignFilterReducer } from "./campaignFilterReducer";

const rootReducer = combineReducers({
  allCampaigns: getAllCampaignsReducer,
  allLeads: getAllLeadsReducer,
  assignLeadToReducer,
  approveRejectCount: getApproveRejectCountReducer,
  PopupReducer: PopupReducers,
  leadsFilter: leadsFilterReducer,
  dateModal: dateModalReducer,
  paginationStates: paginationReducer,
  snackBar: alertReducer,
  loaderReducer: loaderReducer,
  users: getUsersReducer,
  updateLeadViewStatusReducer: updateLeadViewStatusReducer,
  campaignFilters: campaignFilterReducer,
});

export default rootReducer;
