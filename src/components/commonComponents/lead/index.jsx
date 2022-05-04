import Cards from "./Cards";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {filterLeads} from "../lead/filterLeads"
import { getRejectCount } from "../../../redux/actions/approveRejectcount";
import { getUnderreviewCount } from "../../../redux/actions/approveRejectcount";
import { getApproveCount } from "../../../redux/actions/approveRejectcount";
import { getArchieveCount } from "../../../redux/actions/approveRejectcount";
import { getAllCount } from "../../../redux/actions/approveRejectcount";
import {filterCount} from "../lead/filterCount"
import { useEffect } from "react";
import PopupBox from "./PopupBox";
import "./lead.scss";

const Lead = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.leadsFilter.searchQuery);
  const searchDate = useSelector((state) => state.leadsFilter.filterDate);
  const genratedLeadData = useSelector((state) => state.allLeads.leadsList);
  const campgainData = useSelector((state) => state.allCampaigns.campaignList);
  const campaignNameFilter = useSelector(
    (state) => state.leadsFilter.campaignName
  );
  const ownerNameFilter = useSelector((state) => state.leadsFilter.ownerName);
  
  const popupStatus = useSelector((state) => state.popupStatus.popupStatus);
  const popupData = useSelector((state) => state.popupStatus.popupData);


  var filterAllLeads;
  var leadListForCount;
  
  

  if (
    (campaignNameFilter === "" && ownerNameFilter === "") ||
    (campaignNameFilter === "All Campaigns" && ownerNameFilter === "All Owners")
  ) {
    const campaignIds = campgainData
    leadListForCount = filterCount(campaignIds,genratedLeadData)
    filterAllLeads = filterLeads(campaignIds,genratedLeadData,searchDate,searchQuery,true)
  }
  if (
    (campaignNameFilter === "All Campaigns" || campaignNameFilter === "") &&
    ownerNameFilter !== "All Owners"
  ) {
    const campaignIds = campgainData.filter((ele) => ele.owner === ownerNameFilter);
    leadListForCount = filterCount(campaignIds,genratedLeadData)
    filterAllLeads = filterLeads(campaignIds,genratedLeadData,searchDate,searchQuery,false)
  }

  if (
    campaignNameFilter !== "All Campaigns" &&
    ownerNameFilter === "All Owners"
  ) {
    const campaignIds = campgainData.filter((ele) => ele.name === campaignNameFilter);
    leadListForCount = filterCount(campaignIds,genratedLeadData)
    filterAllLeads = filterLeads(campaignIds,genratedLeadData,searchDate,searchQuery,false)
  }

  if (
    campaignNameFilter !== "All Campaigns" &&
    ownerNameFilter !== "All Owners"
  ) {
    const campaignIds = campgainData.filter(
      (ele) => ele.name === campaignNameFilter && ele.owner === ownerNameFilter
    );
    leadListForCount = filterCount(campaignIds,genratedLeadData)
    filterAllLeads = filterLeads(campaignIds,genratedLeadData,searchDate,searchQuery,false)
  }

  const rejectList = leadListForCount.filter((ele) => ele.status === -1);
  const rejectCount = rejectList.length;
  const underReviewList = leadListForCount.filter((ele) => ele.status === 0);
  const underReviewCount = underReviewList.length;
  const archieveList = leadListForCount.filter((ele) => ele.status === 2);
  const archieveCount = archieveList.length;
  const approveList = leadListForCount.filter((ele) => ele.status === 1);
  const approveCount = approveList.length;

  useEffect(() => {
    dispatch(getApproveCount(approveCount));
    dispatch(getUnderreviewCount(underReviewCount));
    dispatch(getRejectCount(rejectCount));
    dispatch(getArchieveCount(archieveCount));
    dispatch(getAllCount(approveCount+underReviewCount+rejectCount+archieveCount))
  });

  return (
    <>
      {popupStatus ? <PopupBox data={popupData} /> : null}
      <Cards leadData={filterAllLeads} />
    </>
  );
};

export default Lead;
