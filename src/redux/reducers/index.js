import { combineReducers } from "redux";
import { getAllCampaignsReducer } from "./campaignReducers";
import {
  getAllLeadsReducer,
  assignLeadToReducer,
  updateLeadViewStatusReducer,
  addNotesToUserReducer,
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
import { countryReducer } from "./countryReducer";

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
  addNotesToUserReducer: addNotesToUserReducer,
  campaignFilters: campaignFilterReducer,
  country: countryReducer,
});

export default rootReducer;
