import Cards from "./Cards";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Fuse from "fuse.js";
import moment from "moment";
import { getRejectCount } from "../../../redux/actions/approveRejectcount";
import { getUnderreviewCount } from "../../../redux/actions/approveRejectcount";
import { getApproveCount } from "../../../redux/actions/approveRejectcount";
import { getArchieveCount } from "../../../redux/actions/approveRejectcount";
import { useEffect } from "react";
import PopupBox from "./PopupBox";
import "./lead.scss";

const Lead = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.leadsFilter.searchQuery);
  const searchDate = useSelector((state) => state.leadsFilter.filterDate);
  const genratedLeadData = useSelector((state) => state.allLeads.leadsList);
  const campgainData = useSelector((state) => state.allCampaigns.campaignList);
  const rejectList = genratedLeadData.filter((ele) => ele.status === -1);
  const rejectCount = rejectList.length;
  const underReviewList = genratedLeadData.filter((ele) => ele.status === 0);
  const underReviewCount = underReviewList.length;
  const approveList = genratedLeadData.filter((ele) => ele.status === 1);
  const approveCount = approveList.length;
  const campaignNameFilter = useSelector(
    (state) => state.leadsFilter.campaignName
  );
  const ownerNameFilter = useSelector((state) => state.leadsFilter.ownerName);
  const popupStatus = useSelector((state) => state.popupStatus.popupStatus);
  const popupData = useSelector((state) => state.popupStatus.popupData);
  const archieveList = genratedLeadData.filter((ele) => ele.status === 2);
  const archieveCount = archieveList.length;

  if (
    (campaignNameFilter === "" && ownerNameFilter === "") ||
    (campaignNameFilter === "All Campaigns" && ownerNameFilter === "All Owners")
  ) {
    if (searchDate === "") {
      const fuse = new Fuse(genratedLeadData, {
        keys: ["title", "summary", "companyName"],
      });
      const results = fuse.search(searchQuery);
      var filterAllLeads = searchQuery
        ? results.map((results) => results.item)
        : genratedLeadData;
    }
    if (searchDate !== "") {
      var filterAllResults = [];
      for (let i = 0; i < genratedLeadData.length; i++) {
        const start = moment(searchDate.start).format("YYYY-MM-DD");
        const end = moment(searchDate.end).format("YYYY-MM-DD");
        const between = moment
          .unix(genratedLeadData[i].leadGeneratedDate.seconds)
          .format("YYYY-MM-DD");
        const unixTimestampStart = Math.floor(new Date(start).getTime() / 1000);
        const unixTimestampBetween = Math.floor(
          new Date(between).getTime() / 1000
        );
        const unixTimestampEnd = Math.floor(new Date(end).getTime() / 1000);

        if (
          unixTimestampStart < unixTimestampBetween &&
          unixTimestampBetween < unixTimestampEnd
        ) {
          filterAllResults.push(genratedLeadData[i]);
        }
      }
      const fuse = new Fuse(filterAllResults, {
        keys: ["title", "summary", "companyName"],
      });
      const results = fuse.search(searchQuery);
      var filterAllLeads = searchQuery
        ? results.map((results) => results.item)
        : filterAllResults;
    }
  }
  if (
    (campaignNameFilter === "All Campaigns" || campaignNameFilter === "") &&
    ownerNameFilter !== "All Owners"
  ) {
    var campaignID = campgainData.filter(
      (ele) => ele.owner === ownerNameFilter
    );
    if (searchDate === "") {
      var filterAllResults = [];
      for (let i = 0; i < campaignID.length; i++) {
        for (let j = 0; j < genratedLeadData.length; j++) {
          if (genratedLeadData[j].campaignId === campaignID[i].id) {
            filterAllResults.push(genratedLeadData[j]);
          }
        }
      }
      const fuse = new Fuse(filterAllResults, {
        keys: ["title", "summary", "companyName"],
      });
      const results = fuse.search(searchQuery);
      var filterAllLeads = searchQuery
        ? results.map((results) => results.item)
        : filterAllResults;
    }
    if (searchDate !== "") {
      var filterAllResults = [];
      for (let i = 0; i < campaignID.length; i++) {
        for (let j = 0; j < genratedLeadData.length; j++) {
          const start = moment(searchDate.start).format("YYYY-MM-DD");
          const end = moment(searchDate.end).format("YYYY-MM-DD");
          const between = moment
            .unix(genratedLeadData[i].leadGeneratedDate.seconds)
            .format("YYYY-MM-DD");
          const unixTimestampStart = Math.floor(
            new Date(start).getTime() / 1000
          );
          const unixTimestampBetween = Math.floor(
            new Date(between).getTime() / 1000
          );
          const unixTimestampEnd = Math.floor(new Date(end).getTime() / 1000);
          if (
            genratedLeadData[j].campaignId === campaignID[i].id &&
            unixTimestampStart < unixTimestampBetween &&
            unixTimestampBetween < unixTimestampEnd
          ) {
            filterAllResults.push(genratedLeadData[j]);
          }
        }
      }
      const fuse = new Fuse(filterAllResults, {
        keys: ["title", "summary", "companyName"],
      });
      const results = fuse.search(searchQuery);
      var filterAllLeads = searchQuery
        ? results.map((results) => results.item)
        : filterAllResults;
    }
  }

  if (
    campaignNameFilter !== "All Campaigns" &&
    ownerNameFilter === "All Owners"
  ) {
    var campaignID = campgainData.filter(
      (ele) => ele.name === campaignNameFilter
    );
    if (searchDate === "") {
      var filterAllResults = [];
      for (let i = 0; i < campaignID.length; i++) {
        for (let j = 0; j < genratedLeadData.length; j++) {
          if (genratedLeadData[j].campaignId === campaignID[i].id) {
            filterAllResults.push(genratedLeadData[j]);
          }
        }
      }
      const fuse = new Fuse(filterAllResults, {
        keys: ["title", "summary", "companyName"],
      });
      const results = fuse.search(searchQuery);
      var filterAllLeads = searchQuery
        ? results.map((results) => results.item)
        : filterAllResults;
    }
    if (searchDate !== "") {
      var filterAllResults = [];
      for (let i = 0; i < campaignID.length; i++) {
        for (let j = 0; j < genratedLeadData.length; j++) {
          const start = moment(searchDate.start).format("YYYY-MM-DD");
          const end = moment(searchDate.end).format("YYYY-MM-DD");
          const between = moment
            .unix(genratedLeadData[i].leadGeneratedDate.seconds)
            .format("YYYY-MM-DD");
          const unixTimestampStart = Math.floor(
            new Date(start).getTime() / 1000
          );
          const unixTimestampBetween = Math.floor(
            new Date(between).getTime() / 1000
          );
          const unixTimestampEnd = Math.floor(new Date(end).getTime() / 1000);
          if (
            genratedLeadData[j].campaignId === campaignID[i].id &&
            unixTimestampStart < unixTimestampBetween &&
            unixTimestampBetween < unixTimestampEnd
          ) {
            filterAllResults.push(genratedLeadData[j]);
          }
        }
      }
      const fuse = new Fuse(filterAllResults, {
        keys: ["title", "summary", "companyName"],
      });
      const results = fuse.search(searchQuery);
      var filterAllLeads = searchQuery
        ? results.map((results) => results.item)
        : filterAllResults;
    }
  }

  if (
    campaignNameFilter !== "All Campaigns" &&
    ownerNameFilter !== "All Owners"
  ) {
    var campaignID = campgainData.filter(
      (ele) => ele.name === campaignNameFilter && ele.owner === ownerNameFilter
    );
    if (searchDate === "") {
      var filterAllResults = [];
      for (let i = 0; i < campaignID.length; i++) {
        for (let j = 0; j < genratedLeadData.length; j++) {
          if (genratedLeadData[j].campaignId === campaignID[i].id) {
            filterAllResults.push(genratedLeadData[j]);
          }
        }
      }
      const fuse = new Fuse(filterAllResults, {
        keys: ["title", "summary", "companyName"],
      });
      const results = fuse.search(searchQuery);
      var filterAllLeads = searchQuery
        ? results.map((results) => results.item)
        : filterAllResults;
    }
    if (searchDate !== "") {
      var filterAllResults = [];
      for (let i = 0; i < campaignID.length; i++) {
        for (let j = 0; j < genratedLeadData.length; j++) {
          const start = moment(searchDate.start).format("YYYY-MM-DD");
          const end = moment(searchDate.end).format("YYYY-MM-DD");
          const between = moment
            .unix(genratedLeadData[i].leadGeneratedDate.seconds)
            .format("YYYY-MM-DD");
          const unixTimestampStart = Math.floor(
            new Date(start).getTime() / 1000
          );
          const unixTimestampBetween = Math.floor(
            new Date(between).getTime() / 1000
          );
          const unixTimestampEnd = Math.floor(new Date(end).getTime() / 1000);
          if (
            genratedLeadData[j].campaignId === campaignID[i].id &&
            unixTimestampStart < unixTimestampBetween &&
            unixTimestampBetween < unixTimestampEnd
          ) {
            filterAllResults.push(genratedLeadData[j]);
          }
        }
      }
      const fuse = new Fuse(filterAllResults, {
        keys: ["title", "summary", "companyName"],
      });
      const results = fuse.search(searchQuery);
      var filterAllLeads = searchQuery
        ? results.map((results) => results.item)
        : filterAllResults;
    }
  }

  useEffect(() => {
    dispatch(getApproveCount(approveCount));
    dispatch(getUnderreviewCount(underReviewCount));
    dispatch(getRejectCount(rejectCount));
    dispatch(getArchieveCount(archieveCount));
  });

  return (
    <>
      {popupStatus ? <PopupBox data={popupData} /> : null}
      <Cards leadData={filterAllLeads} />
    </>
  );
};

export default Lead;
