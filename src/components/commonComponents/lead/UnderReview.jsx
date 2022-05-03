import React from "react";
import Cards from "./Cards";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Fuse from "fuse.js";
import moment from "moment";
import { getRejectCount } from "../../../redux/actions/approveRejectcount";
import { getUnderreviewCount } from "../../../redux/actions/approveRejectcount";
import { getApproveCount } from "../../../redux/actions/approveRejectcount";
import { getArchieveCount } from "../../../redux/actions/approveRejectcount";
import { getAllCount } from "../../../redux/actions/approveRejectcount";
import PopupBox from "./PopupBox";
const UnderReview = () => {
  const dispatch = useDispatch();
  const genratedLeadData = useSelector((state) => state.allLeads.leadsList);
  const campgainData = useSelector((state) => state.allCampaigns.campaignList);
  const campaignNameFilter = useSelector(
    (state) => state.leadsFilter.campaignName
  );
  const ownerNameFilter = useSelector((state) => state.leadsFilter.ownerName);
  const searchQuery = useSelector((state) => state.leadsFilter.searchQuery);
  const searchDate = useSelector((state) => state.leadsFilter.filterDate);

  const underReviewList = genratedLeadData.filter((ele) => ele.status === 0);


  var filterUnderreview;
  var filterUnderreviewresults;
  var campaignID;
  var leadListForCount;
  var campaignIdCount;

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
      const fuse = new Fuse(underReviewList, {
        keys: ["title", "summary", "companyName"],
      });
      const results = fuse.search(searchQuery);
       filterUnderreview = searchQuery
        ? results.map((results) => results.item)
        : underReviewList;
    }
    if(searchDate !== ""){
      

       filterUnderreviewresults = []
      for (let i = 0; i < underReviewList.length; i++){
        const start = moment(searchDate.start).format("YYYY-MM-DD")
        const end = moment(searchDate.end).format("YYYY-MM-DD")
        const between =  moment.unix(underReviewList[i].leadGeneratedDate.seconds).format("YYYY-MM-DD")
        const unixTimestampStart = Math.floor((new Date(start)).getTime() / 1000);
        const unixTimestampBetween = Math.floor((new Date(between)).getTime() / 1000);
        const unixTimestampEnd = Math.floor((new Date(end)).getTime() / 1000);
        

        if(unixTimestampStart < unixTimestampBetween && unixTimestampBetween < unixTimestampEnd){
          filterUnderreviewresults.push(underReviewList[i])
        }
      }
      const fuse = new Fuse(filterUnderreviewresults, {
        keys: ["title", "summary", "companyName"],
      });
      const results = fuse.search(searchQuery);
       filterUnderreview = searchQuery
        ? results.map((results) => results.item)
        : filterUnderreviewresults;
    
      
     
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
       filterUnderreviewresults = [];
      for (let i = 0; i < campaignID.length; i++) {
        for (let j = 0; j < underReviewList.length; j++) {
          if (underReviewList[j].campaignId === campaignID[i].id) {
            filterUnderreviewresults.push(underReviewList[j]);
          }
        }
      }
      const fuse = new Fuse(filterUnderreviewresults, {
        keys: ["title", "summary", "companyName"],
      });
      const results = fuse.search(searchQuery);
       filterUnderreview = searchQuery
        ? results.map((results) => results.item)
        : filterUnderreviewresults;
    }
    if(searchDate !== ""){
       filterUnderreviewresults = [];
      for (let i = 0; i < campaignID.length; i++) {
        for (let j = 0; j < underReviewList.length; j++) {
          const start = moment(searchDate.start).format("YYYY-MM-DD")
          const end = moment(searchDate.end).format("YYYY-MM-DD")
          const between =  moment.unix(underReviewList[i].leadGeneratedDate.seconds).format("YYYY-MM-DD")
          const unixTimestampStart = Math.floor((new Date(start)).getTime() / 1000);
          const unixTimestampBetween = Math.floor((new Date(between)).getTime() / 1000);
          const unixTimestampEnd = Math.floor((new Date(end)).getTime() / 1000);
          if ((underReviewList[j].campaignId === campaignID[i].id) && (unixTimestampStart < unixTimestampBetween && unixTimestampBetween < unixTimestampEnd)) {
            filterUnderreviewresults.push(underReviewList[j]);
          }
        }
      }
      const fuse = new Fuse(filterUnderreviewresults, {
        keys: ["title", "summary", "companyName"],
      });
      const results = fuse.search(searchQuery);
       filterUnderreview = searchQuery
        ? results.map((results) => results.item)
        : filterUnderreviewresults;
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
       filterUnderreviewresults = [];
      for (let i = 0; i < campaignID.length; i++) {
        for (let j = 0; j < underReviewList.length; j++) {
          if (underReviewList[j].campaignId === campaignID[i].id) {
            filterUnderreviewresults.push(underReviewList[j]);
          }
        }
      }
      const fuse = new Fuse(filterUnderreviewresults, {
        keys: ["title", "summary", "companyName"],
      });
      const results = fuse.search(searchQuery);
       filterUnderreview = searchQuery
        ? results.map((results) => results.item)
        : filterUnderreviewresults;
    }
    if(searchDate !== ""){
       filterUnderreviewresults = [];
      for (let i = 0; i < campaignID.length; i++) {
        for (let j = 0; j < underReviewList.length; j++) {
          const start = moment(searchDate.start).format("YYYY-MM-DD")
          const end = moment(searchDate.end).format("YYYY-MM-DD")
          const between =  moment.unix(underReviewList[i].leadGeneratedDate.seconds).format("YYYY-MM-DD")
          const unixTimestampStart = Math.floor((new Date(start)).getTime() / 1000);
          const unixTimestampBetween = Math.floor((new Date(between)).getTime() / 1000);
          const unixTimestampEnd = Math.floor((new Date(end)).getTime() / 1000);
          if ((underReviewList[j].campaignId === campaignID[i].id) && (unixTimestampStart < unixTimestampBetween && unixTimestampBetween < unixTimestampEnd)) {
            filterUnderreviewresults.push(underReviewList[j]);
          }
        }
      }
      const fuse = new Fuse(filterUnderreviewresults, {
        keys: ["title", "summary", "companyName"],
      });
      const results = fuse.search(searchQuery);
       filterUnderreview = searchQuery
        ? results.map((results) => results.item)
        : filterUnderreviewresults;
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
       filterUnderreviewresults = [];
      for (let i = 0; i < campaignID.length; i++) {
        for (let j = 0; j < underReviewList.length; j++) {
          if (underReviewList[j].campaignId === campaignID[i].id) {
            filterUnderreviewresults.push(underReviewList[j]);
          }
        }
      }
      const fuse = new Fuse(filterUnderreviewresults, {
        keys: ["title", "summary", "companyName"],
      });
      const results = fuse.search(searchQuery);
       filterUnderreview = searchQuery
        ? results.map((results) => results.item)
        : filterUnderreviewresults;
    }
    if(searchDate !== ""){
       filterUnderreviewresults = [];
      for (let i = 0; i < campaignID.length; i++) {
        for (let j = 0; j < underReviewList.length; j++) {
          const start = moment(searchDate.start).format("YYYY-MM-DD")
          const end = moment(searchDate.end).format("YYYY-MM-DD")
          const between =  moment.unix(underReviewList[i].leadGeneratedDate.seconds).format("YYYY-MM-DD")
          const unixTimestampStart = Math.floor((new Date(start)).getTime() / 1000);
          const unixTimestampBetween = Math.floor((new Date(between)).getTime() / 1000);
          const unixTimestampEnd = Math.floor((new Date(end)).getTime() / 1000);
          if ((underReviewList[j].campaignId === campaignID[i].id) && (unixTimestampStart < unixTimestampBetween && unixTimestampBetween < unixTimestampEnd)) {
            filterUnderreviewresults.push(underReviewList[j]);
          }
        }
      }
      const fuse = new Fuse(filterUnderreviewresults, {
        keys: ["title", "summary", "companyName"],
      });
      const results = fuse.search(searchQuery);
       filterUnderreview = searchQuery
        ? results.map((results) => results.item)
        : filterUnderreviewresults;
    }
  }

 
  const rejectList = leadListForCount.filter((ele) => ele.status === -1);
  const rejectCount = rejectList.length;
  const underReviewListCount = leadListForCount.filter((ele) => ele.status === 0);
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
    dispatch(getAllCount(approveCount+underReviewCount+rejectCount+archieveCount));
  });
  return (
    <>
      {popupStatus ? <PopupBox data={popupData} /> : null}
      <Cards leadData={filterUnderreview} />
    </>
  );
};

export default UnderReview;
