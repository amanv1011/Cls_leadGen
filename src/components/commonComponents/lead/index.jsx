import Cards from "./Cards";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterLeads, ownerAndAssignedCampaigns } from "../lead/filterLeads";
import { getRejectCount } from "../../../redux/actions/approveRejectcount";
import { getUnderreviewCount } from "../../../redux/actions/approveRejectcount";
import { getApproveCount } from "../../../redux/actions/approveRejectcount";
import { getArchieveCount } from "../../../redux/actions/approveRejectcount";
import { getAllCount } from "../../../redux/actions/approveRejectcount";
import { useEffect } from "react";
import "./lead.scss";
import { roles } from "../../../utils/constants";

const Lead = (props) => {
  const {
    option,
    campaign,
    userRole,
    assignedCampaigns,
    campaignList,
    assignedLeads,
  } = props;
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.leadsFilter.searchQuery);
  const searchDate = useSelector((state) => state.leadsFilter.filterDate);
  const genratedLeadData1 = useSelector((state) => state.allLeads.leadsList);
  // const campgainData = useSelector((state) => state.allCampaigns.campaignList);
  const campgainData = campaign;
  const allUsers = useSelector((state) => state.users.users);
  const campaignNameFilter = useSelector(
    (state) => state.leadsFilter.campaignName
  );
  const ownerNameFilter = useSelector((state) => state.leadsFilter.ownerName);
  const countriesNameFilter = useSelector(
    (state) => state.leadsFilter.countriesName
  );
  // const assignedLeads = useSelector(
  //   (state) => state.getAssignedLeadsReducer.assignedLeads
  // );
  const approveRejectResponse = useSelector(
    (state) => state.allLeads.approveRejectResponse
  );

  const loggedInUser = useSelector(
    (state) => state.getLoggedInUserAction.loggedInUser
  );
  const blockedCompaniesList = useSelector(
    (state) => state.blockedCompaniesReducer.blockedCompainesList
  );

  let array1 = [];

  blockedCompaniesList.length > 0 &&
    blockedCompaniesList.map((blocked) =>
      blocked.leadId.map((item) => array1.push(item))
    );

  let genratedLeadData = genratedLeadData1.filter(function (item) {
    return !array1.includes(item.id);
  });
  // .filter((lead) => lead.companyName !== null);
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

  var xyz = [];

  if (
    (campaignNameFilter === "" && ownerNameFilter === "") ||
    (campaignNameFilter === "All Campaigns" && ownerNameFilter === "All Owners")
  ) {
    const campaignIds = campgainData;
    filterAllLeads = filterLeads(
      campaignIds,
      genratedLeadData,
      searchDate,
      searchQuery
    );
    if (roles && !roles.all.includes(userRole)) {
      AppendAssignedLeadtoOwner(loggedInUser?.id);
    }
  }
  if (
    (campaignNameFilter === "All Campaigns" || campaignNameFilter === "") &&
    ownerNameFilter !== "All Owners"
  ) {
    // in owner filter dissabled this so we can get leads of assigned campaign too
    const owner = allUsers?.filter((user) => user.name === ownerNameFilter);

    const ownerNameFilterId = owner[0]?.userId;
    const ownerAndAssignedCamp = ownerAndAssignedCampaigns(
      campaignList,
      ownerNameFilter,
      ownerNameFilterId,
      assignedCampaigns
    );
    const campaignIds = ownerAndAssignedCamp;

    filterAllLeads = filterLeads(
      campaignIds,
      genratedLeadData,
      searchDate,
      searchQuery
    );
    AppendAssignedLeadtoOwner(ownerNameFilterId);
  }
  if (
    campaignNameFilter !== "All Campaigns" &&
    ownerNameFilter === "All Owners"
  ) {
    const campaignIds = campgainData?.filter(
      (ele) => ele.name === campaignNameFilter
    );

    filterAllLeads = filterLeads(
      campaignIds,
      genratedLeadData,
      searchDate,
      searchQuery
    );
    // AppendAssignedLeadtoOwner(ownerNameFilterId[0]?.userI);
  }

  if (
    campaignNameFilter !== "All Campaigns" &&
    ownerNameFilter !== "All Owners"
  ) {
    const owner = allUsers?.filter((user) => user.name === ownerNameFilter);
    const ownerNameFilterId = owner[0]?.userId;
    const ownerAndAssignedCamp = ownerAndAssignedCampaigns(
      campaignList,
      ownerNameFilter,
      ownerNameFilterId,
      assignedCampaigns
    );
    const campaignIds = ownerAndAssignedCamp?.filter(
      // (ele) => ele.owner === ownerNameFilter && ele.name === campaignNameFilter
      (ele) => ele.name === campaignNameFilter
    );

    filterAllLeads = filterLeads(
      campaignIds,
      genratedLeadData,
      searchDate,
      searchQuery
    );
    const campIds = campaignList?.filter(
      (ele) => ele.name === campaignNameFilter
    );
    /*getting assigned lead*/
    const arr = [];
    assignedLeads &&
      assignedLeads.length &&
      assignedLeads.forEach((lead) => {
        if (lead.userId.includes(ownerNameFilterId)) {
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
    /*filtering assigned leads of a perticular campaign */
    const fltdLdsofSlctCamp = filterLeads(
      campIds,
      filtered,
      searchDate,
      searchQuery
    );
    filterAllLeads = filterAllLeads.concat(
      fltdLdsofSlctCamp.filter((bo) =>
        filterAllLeads.every((ao) => ao.id !== bo.id)
      )
    );
    xyz = filterAllLeads;
  }

  if (countriesNameFilter !== "All Countries") {
    let arr = filterAllLeads?.filter(
      (ele) => ele.country === countriesNameFilter
    );
    filterAllLeads = arr;
  }

  function AppendAssignedLeadtoOwner(filterProp) {
    const arr = [];
    assignedLeads &&
      assignedLeads.length &&
      assignedLeads.forEach((lead) => {
        if (lead.userId.includes(filterProp)) {
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

    // filterAllLeads = [...filterAllLeads, ...filtered];
    /*For removing duplicate leads use below filter */
    filterAllLeads = filterAllLeads.concat(
      filtered.filter((bo) => filterAllLeads.every((ao) => ao.id !== bo.id))
    );
    xyz = filterAllLeads;
  }

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

  const rejectList = filterAllLeads?.filter((ele) => ele.status === -1);
  const rejectCount = rejectList.length;
  const underReviewList = filterAllLeads?.filter((ele) => ele.status === 0);
  const underReviewCount = underReviewList.length;
  const archieveList = filterAllLeads?.filter((ele) => ele.status === 2);
  const archieveCount = archieveList.length;
  const approveList = filterAllLeads?.filter((ele) => ele.status === 1);
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
      <Cards
        leadData={xyz}
        campaign={campaign}
        userRole={userRole}
        option={option}
      />
    </>
  );
};

export default Lead;
