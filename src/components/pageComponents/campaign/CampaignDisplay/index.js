import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { Popover } from "@mui/material";
import * as campaignActions from "../../../../redux/actions/campaignActions";
import { openAlertAction } from "../../../../redux/actions/alertActions";
import PaginationComponent from "../../../commonComponents/PaginationComponent";
import DownArrow from "../../../../assets/jsxIcon/DownArrow";
import * as paginationActions from "../../../../redux/actions/paginationActions";
import Download from "../../../themeComponents/campTable/Download";
import Delete from "../../../themeComponents/campTable/Delete";
import * as commonFunctions from "../commonFunctions";
import "./campaignDisplay.scss";

const CampaignDisplay = ({
  campaignsList,
  searchedCampaignList,
  campaignLoader,
  searchValue,
  campaignDoc,
  campgaignId,
  currentPage,
  dataPerPage,
  leadsList,
  countryFilterValue,
  ownerFilterValue,
}) => {
  const dispatch = useDispatch();
  const [campaignsListData, setcampaignsListData] = useState([]);
  const [selectedArray, setselectedArray] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const getNumOfLeads = (id) => {
    const val = leadsList.filter((valID) => {
      return valID.campaignId === id;
    });
    return val.length;
  };

  const Viewed = async (campaignListItemId) => {
    try {
      await dispatch(campaignActions.getACampaignAction(campaignListItemId));
    } catch (error) {
      dispatch(openAlertAction(`${error.message}`, true, "error"));
    }
  };
  // console.log("campaignDoc.id", campaignDoc.id);

  const handlePopClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    setcampaignsListData(searchedCampaignList);
    campaignDoc.id
      ? Viewed(campaignDoc.id)
      : searchedCampaignList &&
        searchedCampaignList[0]?.id &&
        Viewed(searchedCampaignList[0].id);
  }, [searchedCampaignList]);

  const handleOnCheckboxChange = (event) => {
    if (event.target.checked) {
      setselectedArray([...selectedArray, event.target.value]);
    } else {
      const filtered = selectedArray.filter(
        (item) => item !== event.target.value
      );
      setselectedArray(filtered);
    }
  };

  const handleAllCheck = (e) => {
    setIsChecked(!isChecked);
    if (e.target.checked) {
      let arr = [];
      campaignsListData.forEach((element) => {
        arr.push(element.id);
      });
      setselectedArray(arr);
    } else {
      setselectedArray([]);
    }
  };

  useEffect(() => {
    if (ownerFilterValue === "Owner") {
      setcampaignsListData(searchedCampaignList);
    } else {
      const ownerFiltered = searchedCampaignList.filter(
        (campaign) => campaign.owner === ownerFilterValue
      );

      setcampaignsListData(ownerFiltered);
    }
  }, [ownerFilterValue]);

  const indexOfLastLead = currentPage * dataPerPage;
  const indexOfFirstLead = indexOfLastLead - dataPerPage;
  const currentCampaigns = campaignsListData.slice(
    indexOfFirstLead,
    indexOfLastLead
  );

  // To download selected campaigns
  const downloadSelectedCampaigns = () => {
    const filteredcampaignsForDownload = campaignsListData.filter((campaign) =>
      selectedArray.find((item) => campaign.id === item)
    );
    // console.log("filteredcampaignsForDownload", filteredcampaignsForDownload);
    let updatedcampaignListDataToDownload = [];

    filteredcampaignsForDownload.forEach((campaign) => {
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
          .unix(campaign.start_date.seconds, campaign.start_date.nanoseconds)
          .format("MM/DD/YYYY"),
        "Start Time": campaign.start_time,
        "End Date": moment
          .unix(campaign.end_date.seconds, campaign.end_date.nanoseconds)
          .format("MM/DD/YYYY"),
        "End Time": campaign.end_time,
        "Number of times the campign runs per day": campaign.frequency,
        "Number of leads generated": getNumOfLeads(campaign.id),
        "Campaign created by": campaign.owner,
        "Source of the campaign": sourceType,
        "Status of the campaign":
          campaign.status && campaign.status === 1 ? "Active" : "In-Active",
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
  };

  if (campaignLoader === false && searchedCampaignList.length === 0) {
    if (searchValue) {
      return (
        <React.Fragment>
          <div className="campaign-checkbox-menu-container">
            <div className="campaign-checkbox-container">
              <input type="checkbox" checked={false} disabled="true" />
              <label className="all-label">All</label>
            </div>
          </div>
          <div className="campaign-display-container">
            <div className="campaign-display-subcontainers">
              <div className="campaign-display-subcontainer1">
                <div
                  className="display-cont"
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="campaign-display-btn-text searched-campaign-empty">
                    Campaign(s) not found
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className="campaign-checkbox-menu-container">
            <div className="campaign-checkbox-container">
              <input type="checkbox" checked={false} disabled="true" />
              <label className="all-label">All</label>
            </div>
          </div>
          <div className="campaign-display-container">
            <div className="campaign-display-subcontainers">
              <div className="campaign-display-subcontainer1">
                <div
                  className="display-cont"
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="campaign-display-btn-text searched-campaign-empty">
                    No Campaign(s) found
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
  } else {
    return (
      <React.Fragment>
        <div className="campaign-checkbox-menu-container">
          <div className="campaign-checkbox-menu-container">
            <div className="campaign-checkbox-container">
              <div>
                <input
                  type="checkbox"
                  name="allCheck"
                  checked={
                    selectedArray.length !== campaignsListData.length
                      ? false
                      : true
                  }
                  onChange={handleAllCheck}
                  className="campaign-checkbox"
                />
              </div>
              <label className="all-label">All</label>
            </div>
            <button
              className="campaign-display-actions"
              onClick={handlePopClick}
              disabled={selectedArray.length === 0 ? true : false}
            >
              Action
              <DownArrow />
            </button>
          </div>

          <div>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              PaperProps={{
                boxshadow: "0px 6px 10px rgba(180, 180, 180, 0.35)",
                borderRadius: "10px",
              }}
            >
              <div className="popover-body">
                <button
                  className="campaign-btn download-btn"
                  onClick={downloadSelectedCampaigns}
                >
                  <Download />
                  <span className="campaign-btn-text">
                    Download selected campaigns
                  </span>
                </button>

                <button className="campaign-btn delete-btn">
                  <Delete />
                  <span className="campaign-btn-text">
                    Delete selected campaigns
                  </span>
                </button>
              </div>
            </Popover>
          </div>
        </div>
        <div className="campaign-display-container">
          {currentCampaigns.length !== 0 &&
            currentCampaigns.map((campaign) => (
              <div
                onClick={() => Viewed(campaign.id)}
                className={`campaign-display-subcontainers ${
                  campaignDoc.id === campaign.id ? "selected" : ""
                }`}
                key={campaign.id}
              >
                <div className="campaign-display-check">
                  <input
                    type="checkbox"
                    name={campaign.id}
                    value={campaign.id}
                    className="check box"
                    checked={
                      selectedArray &&
                      selectedArray.filter((it) => it === campaign.id).length >
                        0
                        ? true
                        : false
                    }
                    onChange={handleOnCheckboxChange}
                  />
                </div>
                <div
                  className={`campaign-display-subcontainer1 ${
                    campaignDoc.id === campaign.id ? "selected" : ""
                  }`}
                >
                  <div
                    className="display-cont"
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      className={`campaign-display-btn-text ${
                        campaignDoc.id === campaign.id ? "selected" : ""
                      }`}
                    >
                      {campaign.name}
                    </div>
                  </div>

                  <div
                    className={`campaign-display-subcontainer2 ${
                      campaignDoc.id === campaign.id ? "selected-sub" : ""
                    }`}
                  >
                    <p>
                      {campaign.location === null ? "NA" : campaign.location}
                    </p>
                    <span
                      className={`campaign-display-timestamp ${
                        campaignDoc.id === campaign.id ? "selected-sub" : ""
                      } `}
                    >
                      {campaignDoc.id === campaign.id
                        ? campaignDoc?.campaignCreatedAt
                          ? moment
                              .unix(
                                campaignDoc.campaignCreatedAt.seconds,
                                campaignDoc.campaignCreatedAt.nanoseconds
                              )
                              .fromNow()
                          : "long back"
                        : `${getNumOfLeads(campaign.id)} leads`}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <PaginationComponent
          dataPerPage={dataPerPage}
          dataLength={campaignsListData.length}
        />
      </React.Fragment>
    );
  }
};

export default CampaignDisplay;
