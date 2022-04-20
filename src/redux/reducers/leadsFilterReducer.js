import {FILTER_LEADS_CAMPAIGNNAME, FILTER_LEADS_OWNERNAME,FILTER_LEADS_SEARCH, FILTER_LEADS_DATE} from '../type'
import moment from 'moment'

const initialState = {
    campaignName: "All Campaigns",
    ownerName: "All Owners",
    searchQuery: "",
    filterDate: ""
}

export const leadsFilterReducer = (state = initialState, {type,payload}) =>{
    switch(type){
        case FILTER_LEADS_CAMPAIGNNAME:
            return{...state, campaignName: payload}
        case FILTER_LEADS_OWNERNAME:
            return{...state, ownerName: payload}
        case FILTER_LEADS_SEARCH:
            return{...state,searchQuery:payload }
        case  FILTER_LEADS_DATE:
            return{...state, filterDate:payload}
        default:
            return{...state}
    }
}