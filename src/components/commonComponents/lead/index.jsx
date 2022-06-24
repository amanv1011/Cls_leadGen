import Cards from "./Cards";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterLeads } from "../lead/filterLeads";
import { filterCount } from "../lead/filterCount";
import { getRejectCount } from "../../../redux/actions/approveRejectcount";
import { getUnderreviewCount } from "../../../redux/actions/approveRejectcount";
import { getApproveCount } from "../../../redux/actions/approveRejectcount";
import { getArchieveCount } from "../../../redux/actions/approveRejectcount";
import { getAllCount } from "../../../redux/actions/approveRejectcount";
import { setActivePage } from "../../../redux/actions/paginationActions";
import { getAllUsersAction } from "../../../redux/actions/usersAction";
import { useEffect } from "react";
import "./lead.scss";

const Lead = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.leadsFilter.searchQuery);
  const searchDate = useSelector((state) => state.leadsFilter.filterDate);
  const genratedLeadData = useSelector((state) => state.allLeads.leadsList);
  const campgainData = useSelector((state) => state.allCampaigns.campaignList);
  const allUsers = useSelector((state) => state.users.users);
  const campaignNameFilter = useSelector(
    (state) => state.leadsFilter.campaignName
  );
  const ownerNameFilter = useSelector((state) => state.leadsFilter.ownerName);
  const countriesNameFilter = useSelector(
    (state) => state.leadsFilter.countriesName
  );
  const assignedLeads = useSelector(
    (state) => state.getAssignedLeadsReducer.assignedLeads
  );

  var filterAllLeads;
  var leadListForCount;

  if (
    (campaignNameFilter === "" && ownerNameFilter === "") ||
    (campaignNameFilter === "All Campaigns" && ownerNameFilter === "All Owners")
  ) {
    const campaignIds = campgainData;
    leadListForCount = filterCount(campaignIds, genratedLeadData);
    filterAllLeads = filterLeads(
      campaignIds,
      genratedLeadData,
      searchDate,
      searchQuery
    );
  }
  if (
    (campaignNameFilter === "All Campaigns" || campaignNameFilter === "") &&
    ownerNameFilter !== "All Owners"
  ) {
    const campaignIds = campgainData.filter(
      (ele) => ele.owner === ownerNameFilter
    );
    leadListForCount = filterCount(campaignIds, genratedLeadData);
    filterAllLeads = filterLeads(
      campaignIds,
      genratedLeadData,
      searchDate,
      searchQuery
    );
  }

  if (
    campaignNameFilter !== "All Campaigns" &&
    ownerNameFilter === "All Owners"
  ) {
    const campaignIds = campgainData.filter(
      (ele) => ele.name === campaignNameFilter
    );
    leadListForCount = filterCount(campaignIds, genratedLeadData);
    filterAllLeads = filterLeads(
      campaignIds,
      genratedLeadData,
      searchDate,
      searchQuery
    );
  }

  if (
    campaignNameFilter !== "All Campaigns" &&
    ownerNameFilter !== "All Owners"
  ) {
    const campaignIds = campgainData.filter(
      (ele) => ele.name === campaignNameFilter && ele.owner === ownerNameFilter
    );
    leadListForCount = filterCount(campaignIds, genratedLeadData);
    filterAllLeads = filterLeads(
      campaignIds,
      genratedLeadData,
      searchDate,
      searchQuery
    );
  }

  if (countriesNameFilter !== "All Countries") {
    let arr = filterAllLeads.filter(
      (ele) => ele.country === countriesNameFilter
    );
    filterAllLeads = arr;
    leadListForCount = filterAllLeads;
  }

  function AppendAssignedLeadtoOwner() {
    const arr = [];
    const ownerNameFilterId = allUsers.filter(
      (user) => user.name === ownerNameFilter
    );
    assignedLeads &&
      assignedLeads.forEach((lead) => {
        if (lead.userId.includes(ownerNameFilterId[0])) {
          arr.push(lead.leadId);
        }
      });
    console.log({ arr });
  }
  AppendAssignedLeadtoOwner();

  const rejectList =
    searchDate === "" && searchQuery === ""
      ? leadListForCount.filter((ele) => ele.status === -1)
      : filterAllLeads.filter((ele) => ele.status === -1);
  const rejectCount = rejectList.length;
  const underReviewList =
    searchDate === "" && searchQuery === ""
      ? leadListForCount.filter((ele) => ele.status === 0)
      : filterAllLeads.filter((ele) => ele.status === 0);
  const underReviewCount = underReviewList.length;
  const archieveList =
    searchDate === "" && searchQuery === ""
      ? leadListForCount.filter((ele) => ele.status === 2)
      : filterAllLeads.filter((ele) => ele.status === 2);
  const archieveCount = archieveList.length;
  const approveList =
    searchDate === "" && searchQuery === ""
      ? leadListForCount.filter((ele) => ele.status === 1)
      : filterAllLeads.filter((ele) => ele.status === 1);
  const approveCount = approveList.length;

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
      <Cards leadData={filterAllLeads} />
    </>
  );
};

export default Lead;
