import {FILTER_LEADS_CAMPAIGNNAME, FILTER_LEADS_OWNERNAME,FILTER_LEADS_SEARCH} from '../type'

const initialState = {
    campaignName: "All Campaigns",
    ownerName: "All Owners",
    searchQuery: ""
}

export const leadsFilterReducer = (state = initialState, {type,payload}) =>{
    switch(type){
        case FILTER_LEADS_CAMPAIGNNAME:
            return{...state, campaignName: payload}
        case FILTER_LEADS_OWNERNAME:
            return{...state, ownerName: payload}
        case FILTER_LEADS_SEARCH:
            return{...state,searchQuery:payload }
        default:
            return{...state}
    }
}