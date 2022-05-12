import React from "react";

import Cards from "./Cards";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { filterLeads } from "../lead/filterLeads";
import { getRejectCount } from "../../../redux/actions/approveRejectcount";
import { getUnderreviewCount } from "../../../redux/actions/approveRejectcount";
import { getApproveCount } from "../../../redux/actions/approveRejectcount";
import { getArchieveCount } from "../../../redux/actions/approveRejectcount";
import { getAllCount } from "../../../redux/actions/approveRejectcount";
import { setActivePage } from "../../../redux/actions/paginationActions";
import PopupBox from "./PopupBox";

const Archive = () => {
  const dispatch = useDispatch();
  const genratedLeadData = useSelector((state) => state.allLeads.leadsList);
  const searchQuery = useSelector((state) => state.leadsFilter.searchQuery);
  const searchDate = useSelector((state) => state.leadsFilter.filterDate);
  const campgainData = useSelector((state) => state.allCampaigns.campaignList);
  const campaignNameFilter = useSelector(
    (state) => state.leadsFilter.campaignName
  );
  const ownerNameFilter = useSelector((state) => state.leadsFilter.ownerName);
  const archieveList = genratedLeadData.filter((ele) => ele.status === 2);

  var filterArchieve;
 

  if (
    (campaignNameFilter === "" && ownerNameFilter === "") ||
    (campaignNameFilter === "All Campaigns" && ownerNameFilter === "All Owners")
  ) {
    let campaignIds = campgainData;
    
    filterArchieve = filterLeads(
      campaignIds,
      archieveList,
      searchDate,
      searchQuery,
      
    );
  }
  if (
    (campaignNameFilter === "All Campaigns" || campaignNameFilter === "") &&
    ownerNameFilter !== "All Owners"
  ) {
    let campaignIds = campgainData.filter(
      (ele) => ele.owner === ownerNameFilter
    );
    
    filterArchieve = filterLeads(
      campaignIds,
      archieveList,
      searchDate,
      searchQuery,
      
    );
  }

  if (
    campaignNameFilter !== "All Campaigns" &&
    ownerNameFilter === "All Owners"
  ) {
    let campaignIds = campgainData.filter(
      (ele) => ele.name === campaignNameFilter
    );
    
    filterArchieve = filterLeads(
      campaignIds,
      archieveList,
      searchDate,
      searchQuery,
      
    );
  }

  if (
    campaignNameFilter !== "All Campaigns" &&
    ownerNameFilter !== "All Owners"
  ) {
    let campaignIds = campgainData.filter(
      (ele) => ele.name === campaignNameFilter && ele.owner === ownerNameFilter
    );
    
    filterArchieve = filterLeads(
      campaignIds,
      archieveList,
      searchDate,
      searchQuery,
      
    );
  }

  const rejectList = filterArchieve.filter((ele) => ele.status === -1);
  const rejectCount = rejectList.length;
  const underReviewList = filterArchieve.filter((ele) => ele.status === 0);
  const underReviewCount = underReviewList.length;
  const archieveListCount = filterArchieve.filter((ele) => ele.status === 2);
  const archieveCount = archieveListCount.length;
  const approveList = filterArchieve.filter((ele) => ele.status === 1);
  const approveCount = approveList.length;

  const popupStatus = useSelector((state) => state.popupStatus.popupStatus);
  const popupData = useSelector((state) => state.popupStatus.popupData);

  useEffect(() => {
    dispatch(getApproveCount(approveCount));
    dispatch(getUnderreviewCount(underReviewCount));
    dispatch(getRejectCount(rejectCount));
    dispatch(getArchieveCount(archieveCount));
    dispatch(
      getAllCount(approveCount + underReviewCount + rejectCount + archieveCount)
    );
  });

  useEffect(() => {
    dispatch(setActivePage(1));
  },[searchQuery, ownerNameFilter, searchDate, campaignNameFilter ])

  return (
    <>
      {popupStatus ? <PopupBox data={popupData} /> : null}
      <Cards leadData={filterArchieve} />
    </>
  );
};

export default Archive;
