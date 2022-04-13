import { combineReducers } from "redux";
import { getAllCampaignsReducer } from "./campaignReducers";
import { getAllLeadsReducer } from "./leadsReducer";
import {getApproveRejectCountReducer} from "./approveRejectCountReducer"
import {PopupReducers} from './PopupReducers'
const rootReducer = combineReducers({
  allCampaigns: getAllCampaignsReducer,
  allLeads: getAllLeadsReducer,
  approveRejectCount: getApproveRejectCountReducer,
  popupStatus: PopupReducers
});

export default rootReducer;
