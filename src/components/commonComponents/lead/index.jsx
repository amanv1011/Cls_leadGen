import Cards from "./Cards";
import React, { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterLeads } from "../lead/filterLeads";
import { filterCount } from "../lead/filterCount";
import { getRejectCount } from "../../../redux/actions/approveRejectcount";
import { getUnderreviewCount } from "../../../redux/actions/approveRejectcount";
import { getApproveCount } from "../../../redux/actions/approveRejectcount";
import { getArchieveCount } from "../../../redux/actions/approveRejectcount";
import { getAllCount } from "../../../redux/actions/approveRejectcount";
import { useEffect } from "react";
import "./lead.scss";
import { useState } from "react";

const Lead = (props) => {
  const { option } = props;
  const dispatch = useDispatch();
  const [leadsToProp, setleadsToProp] = useState([]);
  const searchQuery = useSelector((state) => state.leadsFilter.searchQuery);
  const searchDate = useSelector((state) => state.leadsFilter.filterDate);
  let genratedLeadData = useSelector((state) => state.allLeads.leadsList);
  // const campgainData = useSelector((state) => state.allCampaigns.campaignList);
  const campgainData = props.campaign;
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
  const approveRejectResponse = useSelector(
    (state) => state.allLeads.approveRejectResponse
  );

  useEffect(() => {
    if (
      approveRejectResponse &&
      approveRejectResponse.status &&
      approveRejectResponse.leadsId
    ) {
      approveRejectResponse.leadsId.forEach((ele) => {
        genratedLeadData &&
          genratedLeadData.forEach((lead) => {
            if (lead.id === ele) {
              lead.status = approveRejectResponse.status;
            }
          });
      });
    }
  }, [approveRejectResponse]);

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
      ownerNameFilterId &&
      assignedLeads.forEach((lead) => {
        if (lead.userId.includes(ownerNameFilterId[0]?.userId)) {
          arr.push(lead.leadId);
        }
      });
    const filtered = [];
    arr.forEach((assignLead) => {
      genratedLeadData.forEach((genLead) => {
        if (genLead.id === assignLead) {
          filtered.push(genLead);
        }
      });
    });
    filterAllLeads = [...filterAllLeads, ...filtered];
    leadListForCount = filterAllLeads;
  }
  AppendAssignedLeadtoOwner();

  var xyz = 0;
  function leadsCountByOption(option) {
    if (option === "AllLeads") {
      xyz = filterAllLeads;
    } else if (option === "UnderReveiwLeads") {
      let arr = filterAllLeads?.filter((ele) => ele.status === 0);
      xyz = arr;
    } else if (option === "ApprovedLeads") {
      let arr = filterAllLeads?.filter((ele) => ele.status === 1);
      xyz = arr;
    } else if (option === "RejectedLeads") {
      let arr = filterAllLeads?.filter((ele) => ele.status === -1);
      xyz = arr;
    } else if (option === "ArcheievdLeads") {
      let arr = filterAllLeads?.filter((ele) => ele.status === 2);
      xyz = arr;
    }
  }

  leadsCountByOption(option);
  console.log({ xyz });

  const rejectList = filterAllLeads.filter((ele) => ele.status === -1);
  const rejectCount = rejectList.length;
  const underReviewList = filterAllLeads.filter((ele) => ele.status === 0);
  const underReviewCount = underReviewList.length;
  const archieveList = filterAllLeads.filter((ele) => ele.status === 2);
  const archieveCount = archieveList.length;
  const approveList = filterAllLeads.filter((ele) => ele.status === 1);
  const approveCount = approveList.length;
  const totalCount =
    approveCount + underReviewCount + rejectCount + archieveCount;

  useEffect(() => {
    // setleadsToProp(filterAllLeads);
    dispatch(getApproveCount(approveCount));
    dispatch(getUnderreviewCount(underReviewCount));
    dispatch(getRejectCount(rejectCount));
    dispatch(getArchieveCount(archieveCount));
    dispatch(getAllCount(totalCount));
  }, [filterAllLeads]);

  return (
    <>
      <Cards leadData={xyz} />
    </>
  );
};

export default Lead;
