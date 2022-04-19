import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import LinkedIn from "./LinkedIn";
import moment from "moment";
import React from "react";
import Cards from "./Cards";
import Fuse from "fuse.js";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getRejectCount } from "../../../redux/actions/approveRejectcount";
import { getUnderreviewCount } from "../../../redux/actions/approveRejectcount";
import { getApproveCount } from "../../../redux/actions/approveRejectcount";
import { getArchieveCount } from "../../../redux/actions/approveRejectcount";
import PopupBox from "./PopupBox";
import "./lead.scss";
const Approve = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.leadsFilter.searchQuery);
  const genratedLeadData = useSelector((state) => state.allLeads.leadsList);
  const campgainData = useSelector((state) => state.allCampaigns.campaignList);
  const campaignNameFilter = useSelector((state) => state.leadsFilter.campaignName);
  const ownerNameFilter = useSelector((state) => state.leadsFilter.ownerName);
  const rejectList = genratedLeadData.filter((ele) => ele.status === -1);
  const rejectCount = rejectList.length;
  const underReviewList = genratedLeadData.filter((ele) => ele.status === 0);
  const underReviewCount = underReviewList.length;
  const approveList = genratedLeadData.filter((ele) => ele.status === 1);
  const approveCount = approveList.length;
  if (
    (campaignNameFilter === "" && ownerNameFilter === "") ||
    (campaignNameFilter === "All Campaigns" && ownerNameFilter === "All Owners")
  ) {
    const fuse = new Fuse(approveList, {
      keys: ["title", "summary", "companyName"],
    });
    const results = fuse.search(searchQuery);
    var filterApprov = searchQuery
      ? results.map((results) => results.item)
      : approveList;
    
    
  }
  if (
    (campaignNameFilter === "All Campaigns" || campaignNameFilter === "") &&
    ownerNameFilter !== "All Owners"
  ) {
    var campaignID = campgainData.filter(
      (ele) => ele.owner === ownerNameFilter
    );
    var filterApprovResults = [];
    for (let i = 0; i < campaignID.length; i++) {
      for (let j = 0; j < approveList.length; j++) {
        if (approveList[j].campaignId === campaignID[i].id) {
          filterApprovResults.push(approveList[j]);
        }
      }
    }
    const fuse = new Fuse(filterApprovResults, {
      keys: ["title", "summary", "companyName"],
    });
    const results = fuse.search(searchQuery);
    var filterApprov = searchQuery
      ? results.map((results) => results.item)
      : filterApprovResults;
  }

  if (
    campaignNameFilter !== "All Campaigns" &&
    ownerNameFilter === "All Owners"
  ) {
    var campaignID = campgainData.filter(
      (ele) => ele.name === campaignNameFilter
    );
    var filterApprovResults = [];
    for (let i = 0; i < campaignID.length; i++) {
      for (let j = 0; j < approveList.length; j++) {
        if (approveList[j].campaignId === campaignID[i].id) {
          filterApprovResults.push(approveList[j]);
        }
      }
    }
    const fuse = new Fuse(filterApprovResults, {
      keys: ["title", "summary", "companyName"],
    });
    const results = fuse.search(searchQuery);
    var filterApprov = searchQuery
      ? results.map((results) => results.item)
      : filterApprovResults;
  }

  if (
    campaignNameFilter !== "All Campaigns" &&
    ownerNameFilter !== "All Owners"
  ) {
    var campaignID = campgainData.filter(
      (ele) => ele.name === campaignNameFilter && ele.owner === ownerNameFilter
    );
    var filterApprovResults = [];
    for (let i = 0; i < campaignID.length; i++) {
      for (let j = 0; j < approveList.length; j++) {
        if (approveList[j].campaignId === campaignID[i].id) {
          filterApprovResults.push(approveList[j]);
        }
      }
    }
    const fuse = new Fuse(filterApprovResults, {
      keys: ["title", "summary", "companyName"],
    });
    const results = fuse.search(searchQuery);
    var filterApprov = searchQuery
      ? results.map((results) => results.item)
      : filterApprovResults;
  }

  const archieveList = genratedLeadData.filter((ele) => ele.status === 2);
  const archieveCount = archieveList.length;

  const popupStatus = useSelector((state) => state.popupStatus.popupStatus);
  const popupData = useSelector((state) => state.popupStatus.popupData);

  useEffect(() => {
    dispatch(getApproveCount(approveCount));
    dispatch(getUnderreviewCount(underReviewCount));
    dispatch(getRejectCount(rejectCount));
    dispatch(getArchieveCount(archieveCount));
  });

  return (
    <>
      {popupStatus ? <PopupBox data={popupData} /> : null}
      <Cards leadData={filterApprov} />
    </>
  );
};

export default Approve;
