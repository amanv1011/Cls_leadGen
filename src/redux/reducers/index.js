import { combineReducers } from "redux";
import { getAllCampaignsReducer } from "./campaignReducers";
import {
  getAllLeadsReducer,
  assignLeadToReducer,
  updateLeadViewStatusReducer,
  addNotesToUserReducer,
  getAssignedLeadsReducer,
} from "./leadsReducer";
import { getApproveRejectCountReducer } from "./approveRejectCountReducer";
import { PopupReducers } from "./PopupReducers";
import { leadsFilterReducer } from "./leadsFilterReducer";
import { dateModalReducer } from "./dateModalReducer";
import { paginationReducer } from "./paginationReducer";
import { alertReducer } from "./alertReducer";
import loaderReducer from "./globalLoaderReducer";
import {
  getUsersReducer,
  getLoggedInUserAction,
  addUsersReducer,
} from "./usersReducer";
import { campaignFilterReducer } from "./campaignFilterReducer";
import { countryReducer } from "./countryReducer";
import { campaignCountReducer } from "./campaignCountReducer";
import { getLastCrawledDateReducer } from "./lastCrawledDateReducer";
import { blockedCompaniesReducer } from "./blockedCompaniesReducer";

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
  getAssignedLeadsReducer: getAssignedLeadsReducer,
  campaignsCount: campaignCountReducer,
  lastCrawledDateList: getLastCrawledDateReducer,
  getLoggedInUserAction: getLoggedInUserAction,
  addUsersReducer: addUsersReducer,
  blockedCompaniesReducer: blockedCompaniesReducer,
});

export default rootReducer;
