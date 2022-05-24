import React from "react";
import "./header.scss";
import { Box } from "@mui/system";
import BasicTabs from "../tabs";
import Popup from "../../themeComponents/popup";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";

const Header = () => {
  const searchedCampaignList = useSelector(
    (state) => state.allCampaigns.searchedCampaignList
  );

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [day, month, year].join("/");
  }

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
                  let campaignListDataToDownload = {
                    "Campaign name": campaign.name,
                    Location: campaign.location,
                    "Start date": formatDate(campaign.start_date.toDate()),
                    "Start time": campaign.start_time,
                    "End date": formatDate(campaign.end_date.toDate()),
                    "End time": campaign.end_time,
                    "Number of times the campign runs per day":
                      campaign.frequency,
                    "Number of leads generated": campaign.leadsNo,
                    "Campaign created by": campaign.owner,
                    "Source of the campaign": campaign.source,
                    "Status of the campaign":
                      campaign.status && campaign.status === 1
                        ? "Active"
                        : "In-Active",
                    Tags: campaign.tags.map((tag) => tag),
                  };
                  updatedcampaignListDataToDownload = [
                    ...updatedcampaignListDataToDownload,
                    campaignListDataToDownload,
                  ];
                });

                let workBook = XLSX.utils.book_new();
                let workSheet = XLSX.utils.json_to_sheet(
                  updatedcampaignListDataToDownload
                );
                XLSX.utils.book_append_sheet(
                  workBook,
                  workSheet,
                  `List of Campigns`
                );
                XLSX.writeFile(workBook, `List of Campigns.xlsx`);
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
