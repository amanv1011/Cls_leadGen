import React from 'react'

import Cards from "./Cards";
import { useSelector, useDispatch } from "react-redux";
import  { useEffect, useState } from "react";
import {getRejectCount} from "../../../redux/actions/approveRejectcount"
import {getUnderreviewCount} from "../../../redux/actions/approveRejectcount"
import {getApproveCount} from "../../../redux/actions/approveRejectcount"
import {getArchieveCount} from "../../../redux/actions/approveRejectcount"
import Fuse from "fuse.js";
import PopupBox from "./PopupBox";
const Archive = () => {
  const dispatch = useDispatch()
  const genratedLeadData = useSelector((state) => state.allLeads.leadsList)
  const searchQuery = useSelector((state) => state.leadsFilter.searchQuery);
  const campgainData = useSelector((state) => state.allCampaigns.campaignList);
  const campaignNameFilter = useSelector((state) => state.leadsFilter.campaignName);
  const ownerNameFilter = useSelector((state) => state.leadsFilter.ownerName);
  const rejectList = genratedLeadData.filter((ele) => ele.status === -1 )
  const rejectCount = rejectList.length;
  const underReviewList = genratedLeadData.filter((ele) => ele.status === 0 )
  const underReviewCount = underReviewList.length;
  const approveList = genratedLeadData.filter((ele) => ele.status === 1 )
  const approveCount = approveList.length;
  const archieveList = genratedLeadData.filter((ele) => ele.status === 2)
  const archieveCount = archieveList.length;


  if (
    (campaignNameFilter === "" && ownerNameFilter === "") ||
    (campaignNameFilter === "All Campaigns" && ownerNameFilter === "All Owners")
  ) {
    const fuse = new Fuse(archieveList, {
      keys: ["title", "summary", "companyName"],
    });
    const results = fuse.search(searchQuery);
    var filterArchieve = searchQuery
      ? results.map((results) => results.item)
      : archieveList;
    
  }
  if (
    (campaignNameFilter === "All Campaigns" || campaignNameFilter === "") &&
    ownerNameFilter !== "All Owners"
  ) {
    var campaignID = campgainData.filter(
      (ele) => ele.owner === ownerNameFilter
    );
    var filterArchieveResults = [];
    for (let i = 0; i < campaignID.length; i++) {
      for (let j = 0; j < archieveList.length; j++) {
        if (archieveList[j].campaignId === campaignID[i].id) {
          filterArchieveResults.push(archieveList[j]);
        }
      }
    }
    const fuse = new Fuse(filterArchieveResults, {
      keys: ["title", "summary", "companyName"],
    });
    const results = fuse.search(searchQuery);
    var filterArchieve = searchQuery
      ? results.map((results) => results.item)
      : filterArchieveResults;
  }

  if (
    campaignNameFilter !== "All Campaigns" &&
    ownerNameFilter === "All Owners"
  ) {
    var campaignID = campgainData.filter(
      (ele) => ele.name === campaignNameFilter
    );
    var filterArchieveResults = [];
    for (let i = 0; i < campaignID.length; i++) {
      for (let j = 0; j < archieveList.length; j++) {
        if (archieveList[j].campaignId === campaignID[i].id) {
          filterArchieveResults.push(archieveList[j]);
        }
      }
    }
    const fuse = new Fuse(filterArchieveResults, {
      keys: ["title", "summary", "companyName"],
    });
    const results = fuse.search(searchQuery);
    var filterArchieve = searchQuery
      ? results.map((results) => results.item)
      : filterArchieveResults;
  }

  if (
    campaignNameFilter !== "All Campaigns" &&
    ownerNameFilter !== "All Owners"
  ) {
    var campaignID = campgainData.filter(
      (ele) => ele.name === campaignNameFilter && ele.owner === ownerNameFilter
    );
    var filterArchieveResults = [];
    for (let i = 0; i < campaignID.length; i++) {
      for (let j = 0; j < archieveList.length; j++) {
        if (archieveList[j].campaignId === campaignID[i].id) {
          filterArchieveResults.push(archieveList[j]);
        }
      }
    }
    const fuse = new Fuse(filterArchieveResults, {
      keys: ["title", "summary", "companyName"],
    });
    const results = fuse.search(searchQuery);
    var filterArchieve = searchQuery
      ? results.map((results) => results.item)
      : filterArchieveResults;
  }




  const popupStatus = useSelector((state) => state.popupStatus.popupStatus)
  const popupData = useSelector((state) => state.popupStatus.popupData)

  useEffect(() => {
    dispatch(getApproveCount(approveCount));
    dispatch(getUnderreviewCount(underReviewCount));
    dispatch(getRejectCount(rejectCount));
    dispatch(getArchieveCount(archieveCount))
})

  return (
      <>
          {popupStatus ? <PopupBox data={popupData} />: null}
          <Cards leadData={filterArchieve} />
      </>
  )
}

export default Archive