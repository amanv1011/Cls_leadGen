import React from 'react'

import Cards from "./Cards";
import { useSelector, useDispatch } from "react-redux";
import  { useEffect } from "react";
import moment from "moment";
import {getRejectCount} from "../../../redux/actions/approveRejectcount"
import {getUnderreviewCount} from "../../../redux/actions/approveRejectcount"
import {getApproveCount} from "../../../redux/actions/approveRejectcount"
import {getArchieveCount} from "../../../redux/actions/approveRejectcount"
import { getAllCount } from "../../../redux/actions/approveRejectcount";
import Fuse from "fuse.js";
import PopupBox from "./PopupBox";
const Archive = () => {
  const dispatch = useDispatch()
  const genratedLeadData = useSelector((state) => state.allLeads.leadsList)
  const searchQuery = useSelector((state) => state.leadsFilter.searchQuery);
  const searchDate = useSelector((state) => state.leadsFilter.filterDate);
  const campgainData = useSelector((state) => state.allCampaigns.campaignList);
  const campaignNameFilter = useSelector((state) => state.leadsFilter.campaignName);
  const ownerNameFilter = useSelector((state) => state.leadsFilter.ownerName);
  const archieveList = genratedLeadData.filter((ele) => ele.status === 2)

  var filterArchieve;
  var filterArchieveResults;
  var campaignID;
  var leadListForCount;
  var campaignIdCount;

   //For Counting Leads

   //For Counting Leads

   if (
    campaignNameFilter === "All Campaigns" &&
    ownerNameFilter === "All Owners"
  ) {
    leadListForCount = [];
     leadListForCount = genratedLeadData;
  }
  if (
    campaignNameFilter !== "All Campaigns" ||
    ownerNameFilter !== "All Owners"
  ) {
     
    if (
      campaignNameFilter !== "All Campaigns" &&
      ownerNameFilter === "All Owners"
    ) {
      leadListForCount = [];
       campaignIdCount = campgainData.filter(
        (ele) => ele.name === campaignNameFilter
      );
      for (let i = 0; i < campaignIdCount.length; i++) {
        for (let j = 0; j < genratedLeadData.length; j++) {
          if (genratedLeadData[j].campaignId === campaignIdCount[i].id) {
            leadListForCount.push(genratedLeadData[j]);
          }
        }
      }
    }
    if (
      campaignNameFilter === "All Campaigns" &&
      ownerNameFilter !== "All Owners"
    ) {
      leadListForCount = [];
       campaignIdCount = campgainData.filter(
        (ele) => ele.owner === ownerNameFilter
      );
      for (let i = 0; i < campaignIdCount.length; i++) {
        for (let j = 0; j < genratedLeadData.length; j++) {
          if (genratedLeadData[j].campaignId === campaignIdCount[i].id) {
            leadListForCount.push(genratedLeadData[j]);
          }
        }
      }
    }
    if (
      campaignNameFilter !== "All Campaigns" &&
      ownerNameFilter !== "All Owners"
    ) {
      leadListForCount = [];
       campaignIdCount = campgainData.filter(
        (ele) =>
          ele.name === campaignNameFilter && ele.owner === ownerNameFilter
      );
      for (let i = 0; i < campaignIdCount.length; i++) {
        for (let j = 0; j < genratedLeadData.length; j++) {
          if (genratedLeadData[j].campaignId === campaignIdCount[i].id) {
            leadListForCount.push(genratedLeadData[j]);
          }
        }
      }
    }
  }


  if (
    (campaignNameFilter === "" && ownerNameFilter === "") ||
    (campaignNameFilter === "All Campaigns" && ownerNameFilter === "All Owners")
  ) {
    if(searchDate === ""){
      const fuse = new Fuse(archieveList, {
        keys: ["title", "summary", "companyName"],
      });
      const results = fuse.search(searchQuery);
       filterArchieve = searchQuery
        ? results.map((results) => results.item)
        : archieveList;
    }
    if(searchDate !== ""){
      

       filterArchieveResults = []
      for (let i = 0; i < archieveList.length; i++){
        const start = moment(searchDate.start).format("YYYY-MM-DD")
        const end = moment(searchDate.end).format("YYYY-MM-DD")
        const between =  moment.unix(archieveList[i].leadGeneratedDate.seconds).format("YYYY-MM-DD")
        const unixTimestampStart = Math.floor((new Date(start)).getTime() / 1000);
        const unixTimestampBetween = Math.floor((new Date(between)).getTime() / 1000);
        const unixTimestampEnd = Math.floor((new Date(end)).getTime() / 1000);
        

        if(unixTimestampStart < unixTimestampBetween && unixTimestampBetween < unixTimestampEnd){
          filterArchieveResults.push(archieveList[i])
        }
      }
      const fuse = new Fuse(filterArchieveResults, {
        keys: ["title", "summary", "companyName"],
      });
      const results = fuse.search(searchQuery);
       filterArchieve = searchQuery
        ? results.map((results) => results.item)
        : filterArchieveResults;
    
      
     
    }
    


  }
  if (
    (campaignNameFilter === "All Campaigns" || campaignNameFilter === "") &&
    ownerNameFilter !== "All Owners"
  ) {
     campaignID = campgainData.filter(
      (ele) => ele.owner === ownerNameFilter
    );
    if(searchDate === ""){
       filterArchieveResults = [];
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
       filterArchieve = searchQuery
        ? results.map((results) => results.item)
        : filterArchieveResults;
    }
    if(searchDate !== ""){
       filterArchieveResults = [];
      for (let i = 0; i < campaignID.length; i++) {
        for (let j = 0; j < archieveList.length; j++) {
          const start = moment(searchDate.start).format("YYYY-MM-DD")
          const end = moment(searchDate.end).format("YYYY-MM-DD")
          const between =  moment.unix(archieveList[i].leadGeneratedDate.seconds).format("YYYY-MM-DD")
          const unixTimestampStart = Math.floor((new Date(start)).getTime() / 1000);
          const unixTimestampBetween = Math.floor((new Date(between)).getTime() / 1000);
          const unixTimestampEnd = Math.floor((new Date(end)).getTime() / 1000);
          if ((archieveList[j].campaignId === campaignID[i].id) && (unixTimestampStart < unixTimestampBetween && unixTimestampBetween < unixTimestampEnd)) {
            filterArchieveResults.push(archieveList[j]);
          }
        }
      }
      const fuse = new Fuse(filterArchieveResults, {
        keys: ["title", "summary", "companyName"],
      });
      const results = fuse.search(searchQuery);
       filterArchieve = searchQuery
        ? results.map((results) => results.item)
        : filterArchieveResults;
    }

  }

  if (
    campaignNameFilter !== "All Campaigns" &&
    ownerNameFilter === "All Owners"
  ) {
     campaignID = campgainData.filter(
      (ele) => ele.name === campaignNameFilter
    );
    if(searchDate === ""){
       filterArchieveResults = [];
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
       filterArchieve = searchQuery
        ? results.map((results) => results.item)
        : filterArchieveResults;
    }
    if(searchDate !== ""){
       filterArchieveResults = [];
      for (let i = 0; i < campaignID.length; i++) {
        for (let j = 0; j < archieveList.length; j++) {
          const start = moment(searchDate.start).format("YYYY-MM-DD")
          const end = moment(searchDate.end).format("YYYY-MM-DD")
          const between =  moment.unix(archieveList[i].leadGeneratedDate.seconds).format("YYYY-MM-DD")
          const unixTimestampStart = Math.floor((new Date(start)).getTime() / 1000);
          const unixTimestampBetween = Math.floor((new Date(between)).getTime() / 1000);
          const unixTimestampEnd = Math.floor((new Date(end)).getTime() / 1000);
          if ((archieveList[j].campaignId === campaignID[i].id) && (unixTimestampStart < unixTimestampBetween && unixTimestampBetween < unixTimestampEnd)) {
            filterArchieveResults.push(archieveList[j]);
          }
        }
      }
      const fuse = new Fuse(filterArchieveResults, {
        keys: ["title", "summary", "companyName"],
      });
      const results = fuse.search(searchQuery);
       filterArchieve = searchQuery
        ? results.map((results) => results.item)
        : filterArchieveResults;
    }

  }

  if (
    campaignNameFilter !== "All Campaigns" &&
    ownerNameFilter !== "All Owners"
  ) {
     campaignID = campgainData.filter(
      (ele) => ele.name === campaignNameFilter && ele.owner === ownerNameFilter
    );
    if(searchDate === ""){
       filterArchieveResults = [];
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
       filterArchieve = searchQuery
        ? results.map((results) => results.item)
        : filterArchieveResults;
    }
    if(searchDate !== ""){
       filterArchieveResults = [];
      for (let i = 0; i < campaignID.length; i++) {
        for (let j = 0; j < archieveList.length; j++) {
          const start = moment(searchDate.start).format("YYYY-MM-DD")
          const end = moment(searchDate.end).format("YYYY-MM-DD")
          const between =  moment.unix(archieveList[i].leadGeneratedDate.seconds).format("YYYY-MM-DD")
          const unixTimestampStart = Math.floor((new Date(start)).getTime() / 1000);
          const unixTimestampBetween = Math.floor((new Date(between)).getTime() / 1000);
          const unixTimestampEnd = Math.floor((new Date(end)).getTime() / 1000);
          if ((archieveList[j].campaignId === campaignID[i].id) && (unixTimestampStart < unixTimestampBetween && unixTimestampBetween < unixTimestampEnd)) {
            filterArchieveResults.push(archieveList[j]);
          }
        }
      }
      const fuse = new Fuse(filterArchieveResults, {
        keys: ["title", "summary", "companyName"],
      });
      const results = fuse.search(searchQuery);
       filterArchieve = searchQuery
        ? results.map((results) => results.item)
        : filterArchieveResults;
    }
  }

  const rejectList = leadListForCount.filter((ele) => ele.status === -1);
  const rejectCount = rejectList.length;
  const underReviewList = leadListForCount.filter((ele) => ele.status === 0);
  const underReviewCount = underReviewList.length;
  const archieveListCount = leadListForCount.filter((ele) => ele.status === 2);
  const archieveCount = archieveListCount.length;
  const approveList = leadListForCount.filter((ele) => ele.status === 1);
  const approveCount = approveList.length;


  const popupStatus = useSelector((state) => state.popupStatus.popupStatus)
  const popupData = useSelector((state) => state.popupStatus.popupData)

  useEffect(() => {
    dispatch(getApproveCount(approveCount));
    dispatch(getUnderreviewCount(underReviewCount));
    dispatch(getRejectCount(rejectCount));
    dispatch(getArchieveCount(archieveCount))
    dispatch(getAllCount(approveCount+underReviewCount+rejectCount+archieveCount));
})

  return (
      <>
          {popupStatus ? <PopupBox data={popupData} />: null}
          <Cards leadData={filterArchieve} />
      </>
  )
}

export default Archive