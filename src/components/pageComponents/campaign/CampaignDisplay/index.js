import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { Popover } from "@mui/material";
import * as campaignActions from "../../../../redux/actions/campaignActions";
import { openAlertAction } from "../../../../redux/actions/alertActions";
import DownArrow from "../../../../assets/jsxIcon/DownArrow";
import * as commonFunctions from "../commonFunctions";
import * as leadsFilterActions from "../../../../redux/actions/leadsFilter";
import { Link } from "react-router-dom";
import CampaignPopup from "../../../themeComponents/popup/CampaignPopup";
import ActivePopUp from "../../../themeComponents/popup/CampaignPopup/ActivePopUp";
import DeActivatePopUp from "../../../themeComponents/popup/CampaignPopup/DeActivatePopUp";
import CampaignMenu from "../CampaignMenu";
import { get_a_feild_in_a_document } from "../../../../services/api/campaign";
import * as campaignCountActions from "../../../../redux/actions/campaignCountActions";
import "./campaignDisplay.scss";

const CampaignDisplay = ({
  searchedCampaignList,
  campaignLoader,
  campaignDoc,
  leadsList,
  countryFilterValue,
  ownerFilterValue,
  campaignStateFilterValue,
  selectedUsersForFilter,
}) => {
  const dispatch = useDispatch();
  const [campaignsListData, setcampaignsListData] = useState([]);
  const [selectedArray, setselectedArray] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openCampaignPopup, setOpenCampaignPopup] = useState(false);
  const [disableApplyBtn, setDisableApplyBtn] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [openCampaignPopupActive, setOpenCampaignPopupActive] = useState(false);
  const [openCampaignPopupDeActivate, setOpenCampaignPopupDeActivate] =
    useState(false);
  console.log("selectedUsersForFilter for dropdown", selectedUsersForFilter);
  useEffect(() => {
    setcampaignsListData(searchedCampaignList);
    campaignDoc.id
      ? Viewed(campaignDoc.id)
      : searchedCampaignList &&
        searchedCampaignList[0]?.id &&
        Viewed(searchedCampaignList[0].id);
  }, [searchedCampaignList]);

  useEffect(() => {
    if (countryFilterValue === "Country" && ownerFilterValue === "Owner") {
      setcampaignsListData(searchedCampaignList);
    } else if (
      countryFilterValue !== "Country" &&
      ownerFilterValue !== "Owner"
    ) {
      const filteredCampaigns = searchedCampaignList.filter(
        (campaign) =>
          campaign &&
          campaign?.country === countryFilterValue &&
          campaign?.owner === ownerFilterValue
      );
      setcampaignsListData(filteredCampaigns);
    } else if (
      countryFilterValue !== "Country" &&
      ownerFilterValue !== "Owner"
    ) {
      const filteredCampaigns = searchedCampaignList.filter(
        (campaign) =>
          campaign &&
          campaign?.country === countryFilterValue &&
          campaign?.owner === ownerFilterValue &&
          campaign?.status === 0
      );
      setcampaignsListData(filteredCampaigns);
    } else if (
      countryFilterValue !== "Country" &&
      ownerFilterValue === "Owner"
    ) {
      const filteredCampaigns = searchedCampaignList.filter(
        (campaign) => campaign?.country === countryFilterValue
      );
      setcampaignsListData(filteredCampaigns);
    } else if (
      countryFilterValue === "Country" &&
      ownerFilterValue !== "Owner"
    ) {
      const filteredCampaigns = searchedCampaignList.filter(
        (campaign) => campaign.owner === ownerFilterValue
      );
      setcampaignsListData(filteredCampaigns);
    }
  }, [countryFilterValue, ownerFilterValue]);

  useEffect(() => {
    if (campaignStateFilterValue === "AllCampaigns") {
      setcampaignsListData(searchedCampaignList);
      dispatch(
        campaignCountActions.getAllCampaignsCountAction(searchedCampaignList)
      );
    }
    if (campaignStateFilterValue === "activeCampaigns") {
      const filteredCampaigns = searchedCampaignList.filter(
        (campaign) => campaign?.status === 1
      );
      setcampaignsListData(filteredCampaigns);
      dispatch(
        campaignCountActions.getActiveCampaignsCountAction(filteredCampaigns)
      );
    }
    if (campaignStateFilterValue === "inActiveCampaigns") {
      const filteredCampaigns = searchedCampaignList.filter(
        (campaign) => campaign?.status === 0
      );
      setcampaignsListData(filteredCampaigns);
      dispatch(
        campaignCountActions.getInActiveCampaignsCountAction(filteredCampaigns)
      );
    }
  }, [searchedCampaignList, campaignStateFilterValue]);

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

  const handlePopClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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

  // To download selected campaigns
  const downloadSelectedCampaigns = () => {
    // handleClickOpenCampaignPopup();
    const filteredcampaignsForDownload = campaignsListData.filter((campaign) =>
      selectedArray.find((item) => campaign.id === item)
    );
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

  const handleClickOpenCampaignPopup = () => {
    setOpenCampaignPopup(true);
  };
  const handleCloseCampaignPopup = () => {
    setOpenCampaignPopup(false);
  };
  const handleClickOpenCampaignPopupActive = () => {
    setOpenCampaignPopupActive(true);
  };
  const handleCloseCampaignPopupActive = () => {
    setOpenCampaignPopupActive(false);
  };
  const handleClickOpenCampaignPopupDeActivate = () => {
    setOpenCampaignPopupDeActivate(true);
  };
  const handleCloseCampaignPopupDeActivate = () => {
    setOpenCampaignPopupDeActivate(false);
  };

  const onDeleteMulitpleCampaign = () => {
    handleClickOpenCampaignPopup();

    selectedArray.map((selectedCampaign) => {
      if (getNumOfLeads(selectedCampaign)) {
        setDisableApplyBtn(true);
        return;
      } else {
        setDisableApplyBtn(false);
        return;
      }
    });
  };

  const onAssignMulitpleCampaign = () => {
    if (campaignDoc.id.length > 0 && selectedUsers.length > 0) {
      let arr = [];
      selectedUsers &&
        selectedUsers.forEach((e) => {
          arr.push(e.userId);
        });
      dispatch(
        campaignActions.assignCampaignToUsersAction([campaignDoc.id], arr)
      );
      setSelectedUsers([]);
    }
  };

  const onActivateMulitpleCampaign = () => {
    handleClickOpenCampaignPopupActive();
  };

  const onDeActivateMulitpleCampaign = () => {
    handleClickOpenCampaignPopupDeActivate();
  };

  const statusUpdate = async (event, a__campgaignId) => {
    try {
      await get_a_feild_in_a_document(a__campgaignId, { campaignSeen: true });
      await dispatch(campaignActions.getAllCampaignsAction());
    } catch (error) {
      dispatch(openAlertAction(`${error.message}`, true, "error"));
    }
  };

  if (
    campaignLoader === false &&
    campaignsListData &&
    campaignsListData.length === 0
  ) {
    return (
      <React.Fragment>
        <div className="campaign-checkbox-menu-container">
          <div className="campaign-checkbox-container">
            <input type="checkbox" disabled={true} />
            <label className="all-label">All</label>
          </div>
          <CampaignMenu />
        </div>
        <div className="campaign-display-container">
          <div className="campaign-display-subcontainers">
            <div className="campaign-display-subcontainer1">
              <div className="display-count">
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
              {selectedArray.length === 0 ? (
                <label className="all-label">All</label>
              ) : (
                <div
                  className="campaign-display-actions"
                  onClick={handlePopClick}
                >
                  Action
                  <DownArrow />
                </div>
              )}
            </div>
            <CampaignMenu />
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
              <div className="popover-body-campaign">
                <button
                  className="campaign-btn download-btn"
                  onClick={downloadSelectedCampaigns}
                >
                  <span className="campaign-btn-text">Download</span>
                </button>

                <button
                  className="campaign-btn delete-btn"
                  onClick={onDeleteMulitpleCampaign}
                >
                  <span className="campaign-btn-text">Delete</span>
                </button>
                <button
                  className="campaign-btn assign-btn"
                  onClick={onAssignMulitpleCampaign}
                >
                  <span className="campaign-btn-text">Assign</span>
                </button>
                <button
                  className="campaign-btn activate-btn"
                  onClick={onActivateMulitpleCampaign}
                >
                  <span className="campaign-btn-text">Activate</span>
                </button>
                <button
                  className="campaign-btn deActivate-btn"
                  onClick={onDeActivateMulitpleCampaign}
                >
                  <span className="campaign-btn-text ">De-Activate</span>
                </button>
              </div>
            </Popover>
          </div>
        </div>
        <div className="campaign-display-container">
          {campaignsListData.length !== 0 &&
            campaignsListData.map((campaign) => (
              <div
                key={campaign.id}
                onClick={(event) => {
                  Viewed(campaign.id);
                  statusUpdate(event, campaign.id);
                }}
                className={`campaign-display-subcontainers ${
                  campaignDoc.id === campaign.id ? "selected" : ""
                } ${campaign?.campaignSeen === true ? "campaign-seen" : ""}`}
              >
                <div className="campaign-display-check">
                  <input
                    type="checkbox"
                    name={campaign.id}
                    value={campaign.id}
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
                  <div className="display-count">
                    <div
                      className={`campaign-display-btn-text ${
                        campaignDoc.id === campaign.id ? "selected" : ""
                      } ${
                        campaign?.campaignSeen === true ? "campaign-seen" : ""
                      }`}
                    >
                      {campaign.name}
                    </div>
                    <div
                      onClick={() => {
                        if (getNumOfLeads(campaign.id)) {
                          dispatch(
                            leadsFilterActions.leadsFilterCampaignName(
                              campaign.name
                            )
                          );
                          dispatch(
                            leadsFilterActions.leadsFilterOwnerName(
                              campaign.owner
                            )
                          );
                        } else {
                          dispatch(
                            leadsFilterActions.leadsFilterCampaignName(
                              "All Campaigns"
                            )
                          );
                          dispatch(
                            leadsFilterActions.leadsFilterOwnerName(
                              "All Owners"
                            )
                          );
                        }
                      }}
                    >
                      <Link
                        to={getNumOfLeads(campaign.id) ? "/leads" : false}
                        style={
                          getNumOfLeads(campaign.id) === 0
                            ? {
                                pointerEvents: "auto",
                                cursor: "not-allowed",
                                color: "var(--rs-text-link)",
                                textDecoration: "none",
                                fontSize: "12px",
                              }
                            : {}
                        }
                      >
                        <span
                          className={`${
                            campaign?.campaignSeen === true
                              ? "campaign-seen"
                              : ""
                          }`}
                        >
                          {getNumOfLeads(campaign.id)
                            ? `${getNumOfLeads(campaign.id)} leads`
                            : "No Leads"}
                        </span>
                      </Link>
                    </div>
                  </div>

                  <div
                    className={`campaign-display-subcontainer2 ${
                      campaignDoc.id === campaign.id ? "selected-sub" : ""
                    }`}
                  >
                    <p className="location-text">
                      {campaign.location === null ? "NA" : campaign.location}
                    </p>
                    <span>
                      {campaignDoc?.campaignCreatedAt
                        ? moment
                            .unix(
                              campaign.campaignCreatedAt.seconds,
                              campaign.campaignCreatedAt.nanoseconds
                            )
                            .fromNow()
                        : "long back"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <CampaignPopup
          openCampaignPopup={openCampaignPopup}
          handleClickOpen={handleClickOpenCampaignPopup}
          handleClose={handleCloseCampaignPopup}
          disableApplyBtn={disableApplyBtn}
          selectedArray={selectedArray}
        />
        <ActivePopUp
          openCampaignPopupActive={openCampaignPopupActive}
          handleClickOpen={handleClickOpenCampaignPopupActive}
          handleClose={handleCloseCampaignPopupActive}
          selectedArray={selectedArray}
        />
        <DeActivatePopUp
          openCampaignPopupDeActivate={openCampaignPopupDeActivate}
          handleClickOpen={handleClickOpenCampaignPopupDeActivate}
          handleClose={handleCloseCampaignPopupDeActivate}
          selectedArray={selectedArray}
        />
      </React.Fragment>
    );
  }
};

export default CampaignDisplay;
