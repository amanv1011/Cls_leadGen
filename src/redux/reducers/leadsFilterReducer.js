import {FILTER_LEADS_CAMPAIGNNAME, FILTER_LEADS_OWNERNAME} from '../type'

const initialState = {
    campaignName: "All Campaigns",
    ownerName: "All Owners"
}

export const leadsFilterReducer = (state = initialState, {type,payload}) =>{
    switch(type){
        case FILTER_LEADS_CAMPAIGNNAME:
            return{...state, campaignName: payload}
        case FILTER_LEADS_OWNERNAME:
            return{...state, ownerName: payload}
        default:
            return{...state}
    }
}