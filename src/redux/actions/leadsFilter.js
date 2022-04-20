import {FILTER_LEADS_CAMPAIGNNAME, FILTER_LEADS_OWNERNAME,FILTER_LEADS_SEARCH} from '../type'

export const leadsFilterCampaignName = (campaignNameFilter) => {
    return async (dispatch) => {
        dispatch({type:FILTER_LEADS_CAMPAIGNNAME, payload:campaignNameFilter})
    }
}

export const leadsFilterOwnerName = (ownerNameFilter) => {
    return async (dispatch) => {
        dispatch({type:FILTER_LEADS_OWNERNAME, payload:ownerNameFilter})
    }
}

export const leadsFilterSearch = (searchQuery) => {
    return async (dispatch) => {
        dispatch({type:FILTER_LEADS_SEARCH, payload:searchQuery})
    }
}