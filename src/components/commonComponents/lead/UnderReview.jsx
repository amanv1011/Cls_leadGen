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
import { filterCount } from "../lead/filterCount";
import PopupBox from "./PopupBox";

const UnderReview = (props) => {
  const dispatch = useDispatch();
  const genratedLeadData = props.currentLeads;
  const campgainData = useSelector((state) => state.allCampaigns.campaignList);
  const campaignNameFilter = useSelector(
    (state) => state.leadsFilter.campaignName
  );
  const ownerNameFilter = useSelector((state) => state.leadsFilter.ownerName);
  const searchQuery = useSelector((state) => state.leadsFilter.searchQuery);
  const searchDate = useSelector((state) => state.leadsFilter.filterDate);

  const underReviewList = genratedLeadData.filter((ele) => ele.status === 0);

  var filterUnderreview;
  var leadListForCount;

  if (
    (campaignNameFilter === "" && ownerNameFilter === "") ||
    (campaignNameFilter === "All Campaigns" && ownerNameFilter === "All Owners")
  ) {
    let campaignIds = campgainData;
    leadListForCount = filterCount(campaignIds, genratedLeadData);
    filterUnderreview = filterLeads(
      campaignIds,
      underReviewList,
      searchDate,
      searchQuery,
      false
    );
  }
  if (
    (campaignNameFilter === "All Campaigns" || campaignNameFilter === "") &&
    ownerNameFilter !== "All Owners"
  ) {
    let campaignIds = campgainData.filter(
      (ele) => ele.owner === ownerNameFilter
    );
    leadListForCount = filterCount(campaignIds, genratedLeadData);
    filterUnderreview = filterLeads(
      campaignIds,
      underReviewList,
      searchDate,
      searchQuery,
      true
    );
  }

  if (
    campaignNameFilter !== "All Campaigns" &&
    ownerNameFilter === "All Owners"
  ) {
    let campaignIds = campgainData.filter(
      (ele) => ele.name === campaignNameFilter
    );
    leadListForCount = filterCount(campaignIds, genratedLeadData);
    filterUnderreview = filterLeads(
      campaignIds,
      underReviewList,
      searchDate,
      searchQuery,
      true
    );
  }

  if (
    campaignNameFilter !== "All Campaigns" &&
    ownerNameFilter !== "All Owners"
  ) {
    let campaignIds = campgainData.filter(
      (ele) => ele.name === campaignNameFilter && ele.owner === ownerNameFilter
    );
    leadListForCount = filterCount(campaignIds, genratedLeadData);
    filterUnderreview = filterLeads(
      campaignIds,
      underReviewList,
      searchDate,
      searchQuery,
      true
    );
  }

  const rejectList = leadListForCount.filter((ele) => ele.status === -1);
  const rejectCount = rejectList.length;
  const underReviewListCount = leadListForCount.filter(
    (ele) => ele.status === 0
  );
  const underReviewCount = underReviewListCount.length;
  const archieveList = leadListForCount.filter((ele) => ele.status === 2);
  const archieveCount = archieveList.length;
  const approveList = leadListForCount.filter((ele) => ele.status === 1);
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
  return (
    <>
      {popupStatus ? <PopupBox data={popupData} /> : null}
      <Cards leadData={filterUnderreview} />
    </>
  );
};

export default UnderReview;
