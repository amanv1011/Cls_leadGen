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
const Reject = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.leadsFilter.searchQuery);
  const searchDate = useSelector((state) => state.leadsFilter.filterDate);
  const genratedLeadData = useSelector((state) => state.allLeads.leadsList);
  const campgainData = useSelector((state) => state.allCampaigns.campaignList);
  const campaignNameFilter = useSelector(
    (state) => state.leadsFilter.campaignName
  );
  const ownerNameFilter = useSelector((state) => state.leadsFilter.ownerName);
  const underReviewList = genratedLeadData.filter((ele) => ele.status === -1);
  const rejectCount = underReviewList.length;
  const rejectList = genratedLeadData.filter((ele) => ele.status === 0);
  const underReviewCount = rejectList.length;
  const approveList = genratedLeadData.filter((ele) => ele.status === 1);
  const approveCount = approveList.length;

  if (
    (campaignNameFilter === "" && ownerNameFilter === "") ||
    (campaignNameFilter === "All Campaigns" && ownerNameFilter === "All Owners")
  ) {
    if(searchDate === ""){
      const fuse = new Fuse(rejectList, {
        keys: ["title", "summary", "companyName"],
      });
      const results = fuse.search(searchQuery);
      var filterReject = searchQuery
        ? results.map((results) => results.item)
        : rejectList;
    }
    if(searchDate !== ""){
      

      var filterRejectResults = []
      for (let i = 0; i < rejectList.length; i++){
        const start = moment(searchDate.start).format("YYYY-MM-DD")
        const end = moment(searchDate.end).format("YYYY-MM-DD")
        const between =  moment.unix(rejectList[i].leadGeneratedDate.seconds).format("YYYY-MM-DD")
        const unixTimestampStart = Math.floor((new Date(start)).getTime() / 1000);
        const unixTimestampBetween = Math.floor((new Date(between)).getTime() / 1000);
        const unixTimestampEnd = Math.floor((new Date(end)).getTime() / 1000);
        

        if(unixTimestampStart < unixTimestampBetween && unixTimestampBetween < unixTimestampEnd){
          filterRejectResults.push(rejectList[i])
        }
      }
      const fuse = new Fuse(filterRejectResults, {
        keys: ["title", "summary", "companyName"],
      });
      const results = fuse.search(searchQuery);
      var filterReject = searchQuery
        ? results.map((results) => results.item)
        : filterRejectResults;
    
      
     
    }
    


  }
  if (
    (campaignNameFilter === "All Campaigns" || campaignNameFilter === "") &&
    ownerNameFilter !== "All Owners"
  ) {
    var campaignID = campgainData.filter(
      (ele) => ele.owner === ownerNameFilter
    );
    if(searchDate === ""){
      var filterRejectResults = [];
      for (let i = 0; i < campaignID.length; i++) {
        for (let j = 0; j < rejectList.length; j++) {
          if (rejectList[j].campaignId === campaignID[i].id) {
            filterRejectResults.push(rejectList[j]);
          }
        }
      }
      const fuse = new Fuse(filterRejectResults, {
        keys: ["title", "summary", "companyName"],
      });
      const results = fuse.search(searchQuery);
      var filterReject = searchQuery
        ? results.map((results) => results.item)
        : filterRejectResults;
    }
    if(searchDate !== ""){
      var filterRejectResults = [];
      for (let i = 0; i < campaignID.length; i++) {
        for (let j = 0; j < rejectList.length; j++) {
          const start = moment(searchDate.start).format("YYYY-MM-DD")
          const end = moment(searchDate.end).format("YYYY-MM-DD")
          const between =  moment.unix(rejectList[i].leadGeneratedDate.seconds).format("YYYY-MM-DD")
          const unixTimestampStart = Math.floor((new Date(start)).getTime() / 1000);
          const unixTimestampBetween = Math.floor((new Date(between)).getTime() / 1000);
          const unixTimestampEnd = Math.floor((new Date(end)).getTime() / 1000);
          if ((rejectList[j].campaignId === campaignID[i].id) && (unixTimestampStart < unixTimestampBetween && unixTimestampBetween < unixTimestampEnd)) {
            filterRejectResults.push(rejectList[j]);
          }
        }
      }
      const fuse = new Fuse(filterRejectResults, {
        keys: ["title", "summary", "companyName"],
      });
      const results = fuse.search(searchQuery);
      var filterReject = searchQuery
        ? results.map((results) => results.item)
        : filterRejectResults;
    }

  }

  if (
    campaignNameFilter !== "All Campaigns" &&
    ownerNameFilter === "All Owners"
  ) {
    var campaignID = campgainData.filter(
      (ele) => ele.name === campaignNameFilter
    );
    if(searchDate === ""){
      var filterRejectResults = [];
      for (let i = 0; i < campaignID.length; i++) {
        for (let j = 0; j < rejectList.length; j++) {
          if (rejectList[j].campaignId === campaignID[i].id) {
            filterRejectResults.push(rejectList[j]);
          }
        }
      }
      const fuse = new Fuse(filterRejectResults, {
        keys: ["title", "summary", "companyName"],
      });
      const results = fuse.search(searchQuery);
      var filterReject = searchQuery
        ? results.map((results) => results.item)
        : filterRejectResults;
    }
    if(searchDate !== ""){
      var filterRejectResults = [];
      for (let i = 0; i < campaignID.length; i++) {
        for (let j = 0; j < rejectList.length; j++) {
          const start = moment(searchDate.start).format("YYYY-MM-DD")
          const end = moment(searchDate.end).format("YYYY-MM-DD")
          const between =  moment.unix(rejectList[i].leadGeneratedDate.seconds).format("YYYY-MM-DD")
          const unixTimestampStart = Math.floor((new Date(start)).getTime() / 1000);
          const unixTimestampBetween = Math.floor((new Date(between)).getTime() / 1000);
          const unixTimestampEnd = Math.floor((new Date(end)).getTime() / 1000);
          if ((rejectList[j].campaignId === campaignID[i].id) && (unixTimestampStart < unixTimestampBetween && unixTimestampBetween < unixTimestampEnd)) {
            filterRejectResults.push(rejectList[j]);
          }
        }
      }
      const fuse = new Fuse(filterRejectResults, {
        keys: ["title", "summary", "companyName"],
      });
      const results = fuse.search(searchQuery);
      var filterReject = searchQuery
        ? results.map((results) => results.item)
        : filterRejectResults;
    }

  }

  if (
    campaignNameFilter !== "All Campaigns" &&
    ownerNameFilter !== "All Owners"
  ) {
    var campaignID = campgainData.filter(
      (ele) => ele.name === campaignNameFilter && ele.owner === ownerNameFilter
    );
    if(searchDate === ""){
      var filterRejectResults = [];
      for (let i = 0; i < campaignID.length; i++) {
        for (let j = 0; j < rejectList.length; j++) {
          if (rejectList[j].campaignId === campaignID[i].id) {
            filterRejectResults.push(rejectList[j]);
          }
        }
      }
      const fuse = new Fuse(filterRejectResults, {
        keys: ["title", "summary", "companyName"],
      });
      const results = fuse.search(searchQuery);
      var filterReject = searchQuery
        ? results.map((results) => results.item)
        : filterRejectResults;
    }
    if(searchDate !== ""){
      var filterRejectResults = [];
      for (let i = 0; i < campaignID.length; i++) {
        for (let j = 0; j < rejectList.length; j++) {
          const start = moment(searchDate.start).format("YYYY-MM-DD")
          const end = moment(searchDate.end).format("YYYY-MM-DD")
          const between =  moment.unix(rejectList[i].leadGeneratedDate.seconds).format("YYYY-MM-DD")
          const unixTimestampStart = Math.floor((new Date(start)).getTime() / 1000);
          const unixTimestampBetween = Math.floor((new Date(between)).getTime() / 1000);
          const unixTimestampEnd = Math.floor((new Date(end)).getTime() / 1000);
          if ((rejectList[j].campaignId === campaignID[i].id) && (unixTimestampStart < unixTimestampBetween && unixTimestampBetween < unixTimestampEnd)) {
            filterRejectResults.push(rejectList[j]);
          }
        }
      }
      const fuse = new Fuse(filterRejectResults, {
        keys: ["title", "summary", "companyName"],
      });
      const results = fuse.search(searchQuery);
      var filterReject = searchQuery
        ? results.map((results) => results.item)
        : filterRejectResults;
    }
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
      <Cards leadData={filterReject} />
    </>
  );
};

export default Reject;
