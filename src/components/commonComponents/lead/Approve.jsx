import React from "react";

import Cards from "./Cards";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getRejectCount } from "../../../redux/actions/approveRejectcount";
import { getUnderreviewCount } from "../../../redux/actions/approveRejectcount";
import { getApproveCount } from "../../../redux/actions/approveRejectcount";
import { getArchieveCount } from "../../../redux/actions/approveRejectcount";
import { getAllCount } from "../../../redux/actions/approveRejectcount";
import { filterLeads } from "../lead/filterLeads";
import { filterCount } from "../lead/filterCount";
import { getTotalCount } from "../lead/getTotalCount";
import { setActivePage } from "../../../redux/actions/paginationActions";
import "./lead.scss";

const Approve = (props) => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.leadsFilter.searchQuery);
  const searchDate = useSelector((state) => state.leadsFilter.filterDate);
  const genratedLeadData = useSelector((state) => state.allLeads.leadsList);
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

  const approveRejectResponse = useSelector(
    (state) => state.allLeads.approveRejectResponse
  );
  const approveList = genratedLeadData?.filter((ele) => ele.status === 1);
  const loggedInUser = useSelector(
    (state) => state.getLoggedInUserAction.loggedInUser
  );
  const ownerNameFilterId = allUsers?.filter(
    (user) => user.name === ownerNameFilter
  );
  const assignedLeads = useSelector(
    (state) => state.getAssignedLeadsReducer.assignedLeads
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

  var filterApprov;
  var leadListForCount;

  if (
    (campaignNameFilter === "" && ownerNameFilter === "") ||
    (campaignNameFilter === "All Campaigns" && ownerNameFilter === "All Owners")
  ) {
    const campaignIds = campgainData;
    leadListForCount = filterCount(campaignIds, genratedLeadData);
    filterApprov = filterLeads(
      campaignIds,
      approveList,
      searchDate,
      searchQuery
    );
    // AppendAssignedLeadtoOwner(loggedInUser?.id);
  }
  if (
    (campaignNameFilter === "All Campaigns" || campaignNameFilter === "") &&
    ownerNameFilter !== "All Owners"
  ) {
    const campaignIds = campgainData?.filter(
      (ele) => ele.owner === ownerNameFilter
    );
    leadListForCount = filterCount(campaignIds, genratedLeadData);
    filterApprov = filterLeads(
      campaignIds,
      approveList,
      searchDate,
      searchQuery
    );
    // AppendAssignedLeadtoOwner(loggedInUser?.id);
  }

  if (
    campaignNameFilter !== "All Campaigns" &&
    ownerNameFilter === "All Owners"
  ) {
    const campaignIds = campgainData?.filter(
      (ele) => ele.name === campaignNameFilter
    );
    leadListForCount = filterCount(campaignIds, genratedLeadData);
    filterApprov = filterLeads(
      campaignIds,
      approveList,
      searchDate,
      searchQuery
    );
    // AppendAssignedLeadtoOwner(loggedInUser?.id);
  }

  if (
    campaignNameFilter !== "All Campaigns" &&
    ownerNameFilter !== "All Owners"
  ) {
    const campaignIds = campgainData?.filter(
      (ele) => ele.name === campaignNameFilter && ele.owner === ownerNameFilter
    );
    leadListForCount = filterCount(campaignIds, genratedLeadData);
    filterApprov = filterLeads(
      campaignIds,
      approveList,
      searchDate,
      searchQuery
    );
    // AppendAssignedLeadtoOwner(loggedInUser?.id);
  }

  if (countriesNameFilter !== "All Countries") {
    let arr = filterApprov?.filter(
      (ele) => ele.country === countriesNameFilter
    );
    filterApprov = arr;
    leadListForCount = filterApprov;
  }

  // function AppendAssignedLeadtoOwner() {
  //   const arr = [];
  //   const ownerNameFilterId = allUsers?.filter(
  //     (user) => user.name === ownerNameFilter
  //   );
  //   assignedLeads &&
  //     ownerNameFilterId &&
  //     assignedLeads.forEach((lead) => {
  //       if (lead.userId.includes(ownerNameFilterId[0]?.userId)) {
  //         arr.push(lead.leadId);
  //       }
  //     });
  //   const filtered = [];
  //   arr.forEach((assignLead) => {
  //     genratedLeadData.forEach((genLead) => {
  //       if (genLead.id === assignLead) {
  //         filtered.push(genLead);
  //       }
  //     });
  //   });
  //   filterApprov = [...filterApprov, ...filtered];
  //   leadListForCount = filterApprov;
  // }
  // AppendAssignedLeadtoOwner();

  const rejectList = leadListForCount?.filter((ele) => ele.status === -1);
  const rejectCount = rejectList.length;
  const underReviewList = leadListForCount?.filter((ele) => ele.status === 0);
  const underReviewCount = underReviewList.length;
  const archieveList = leadListForCount?.filter((ele) => ele.status === 2);
  const archieveCount = archieveList.length;
  const approveListCount =
    searchQuery === "" && searchDate === ""
      ? leadListForCount?.filter((ele) => ele.status === 1)
      : filterApprov?.filter((ele) => ele.status === 1);
  const approveCount = approveListCount.length;

  useEffect(() => {
    dispatch(getApproveCount(approveCount));
    dispatch(getUnderreviewCount(underReviewCount));
    dispatch(getRejectCount(rejectCount));
    dispatch(getArchieveCount(archieveCount));
    if (searchQuery === "" && searchDate === "") {
      dispatch(
        getAllCount(
          approveCount + underReviewCount + rejectCount + archieveCount
        )
      );
    }
  });

  return (
    <>
      <Cards leadData={filterApprov} />
    </>
  );
};

export default Approve;
