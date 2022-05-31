import React from "react";
import "./header.scss";
import { Box } from "@mui/system";
import BasicTabs from "../tabs";
import Popup from "../../themeComponents/popup";
import { useSelector } from "react-redux";
import * as commonFunctions from "../../pageComponents/campaign/commonFunctions";
import moment from "moment";

const Header = () => {
  const searchedCampaignList = useSelector(
    (state) => state.allCampaigns.searchedCampaignList
  );

  return (
    <Box className="header-container">
      <Box className="tabs">
        <BasicTabs type="dashboardTabs" />
      </Box>
      {window.location.pathname === "/campaign" ? (
        <>
          <Box>
            <Popup />
            <button
              className="exportToExcel"
              disabled={
                searchedCampaignList && searchedCampaignList.length === 0
                  ? true
                  : false
              }
              style={
                searchedCampaignList && searchedCampaignList.length === 0
                  ? {
                      pointerEvents: "auto",
                      cursor: "not-allowed",
                      background: "#87bc97",
                    }
                  : {}
              }
              onClick={() => {
                let updatedcampaignListDataToDownload = [];

                searchedCampaignList.forEach((campaign) => {
                  let sourceType = "";

                  if (campaign.source === "seek_aus") {
                    sourceType = "Seek Australia";
                  } else if (campaign.source === "indeed_aus") {
                    sourceType = "Indeed Australia";
                  } else if (campaign.source === "indeed_ca") {
                    sourceType = "Indeed Canada";
                  } else if (campaign.source === "indeed_uk") {
                    sourceType = "Indeed United";
                  } else if (campaign.source === "indeed_il") {
                    sourceType = "Indeed Italy";
                  } else if (campaign.source === "indeed_ae") {
                    sourceType = "Indeed UAE";
                  } else if (campaign.source === "indeed_fi") {
                    sourceType = "Indeed Finland";
                  } else if (campaign.source === "indeed_ch") {
                    sourceType = "Indeed China";
                  } else if (campaign.source === "indeed_pt") {
                    sourceType = "Indeed Portugal";
                  } else if (campaign.source === "indeed_sg") {
                    sourceType = "Indeed Singapore";
                  } else {
                    sourceType = "LinkedIn";
                  }

                  let campaignListDataToDownload = {
                    "Campaign Name": campaign.name,
                    Location: campaign.location,
                    "Start Date": moment
                      .unix(
                        campaign.start_date.seconds,
                        campaign.start_date.nanoseconds
                      )
                      .format("MM/DD/YYYY"),
                    "Start Time": campaign.start_time,
                    "End Date": moment
                      .unix(
                        campaign.end_date.seconds,
                        campaign.end_date.nanoseconds
                      )
                      .format("MM/DD/YYYY"),
                    "End Time": campaign.end_time,
                    "Number of times the campign runs per day":
                      campaign.frequency,
                    "Number of leads generated": campaign.leadsNo,
                    "Campaign created by": campaign.owner,
                    "Source of the campaign": sourceType,
                    "Status of the campaign":
                      campaign.status && campaign.status === 1
                        ? "Active"
                        : "In-Active",
                    Tags: campaign.tags.toString(),
                  };
                  updatedcampaignListDataToDownload = [
                    ...updatedcampaignListDataToDownload,
                    campaignListDataToDownload,
                  ];
                });
                commonFunctions.downloadInExcel(
                  updatedcampaignListDataToDownload,
                  "List of Campigns"
                );
              }}
            >
              Export to Excel
            </button>
          </Box>
        </>
      ) : null}
    </Box>
  );
};

export default Header;
