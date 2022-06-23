import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { Popover } from "@mui/material";
import * as campaignActions from "../../../../redux/actions/campaignActions";
import { openAlertAction } from "../../../../redux/actions/alertActions";
import DownArrow from "../../../../assets/jsxIcon/DownArrow";
import Download from "../../../themeComponents/campTable/Download";
import Delete from "../../../themeComponents/campTable/Delete";
import * as commonFunctions from "../commonFunctions";
import { get_a_feild_in_a_document } from "../../../../services/api/campaign";
import CampaignPopup from "../../../themeComponents/popup/CampaignPopup";
import "./campaignDisplay.scss";
import LeadsMenu from "../../leads2/LeadsMenu";
import CampaignMenu from "../CampaignMenu";

const CampaignDisplay = ({
  searchedCampaignList,
  campaignLoader,
  searchValue,
  campaignDoc,
  leadsList,
  countryFilterValue,
  ownerFilterValue,
}) => {
  const dispatch = useDispatch();
  const [campaignsListData, setcampaignsListData] = useState([]);
  const [selectedArray, setselectedArray] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openCampaignPopup, setOpenCampaignPopup] = useState(false);
  const [disableApplyBtn, setDisableApplyBtn] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  // const [multipleFilterValue, setMultipleFilterValue] = useState("All");

  useEffect(() => {
    setcampaignsListData(searchedCampaignList);
    campaignDoc.id
      ? Viewed(campaignDoc.id)
      : searchedCampaignList &&
        searchedCampaignList[0]?.id &&
        Viewed(searchedCampaignList[0].id);
  }, [searchedCampaignList]);
  console.log("campaignsListData", campaignsListData);

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
          campaign?.owner === ownerFilterValue
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

  // useEffect(() => {
  //   if (multipleFilterValue === "All") {
  //     setcampaignsListData(searchedCampaignList);
  //   }
  //   if (multipleFilterValue === "Active") {
  //     const filteredCampaigns = searchedCampaignList.filter(
  //       (campaign) => campaign?.status === 1
  //     );
  //     setcampaignsListData(filteredCampaigns);
  //   }
  //   if (multipleFilterValue === "In-Active") {
  //     const filteredCampaigns = searchedCampaignList.filter(
  //       (campaign) => campaign?.status === 0
  //     );
  //     setcampaignsListData(filteredCampaigns);
  //   }
  // }, [multipleFilterValue]);

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
    selectedArray.map((seletedCampaigns) => {
      try {
        get_a_feild_in_a_document(seletedCampaigns, { status: 1 });
        dispatch(campaignActions.getAllCampaignsAction());
      } catch (error) {
        dispatch(openAlertAction(`${error.message}`, true, "error"));
      }
    });
  };

  const onDeActivateMulitpleCampaign = () => {
    selectedArray.map((seletedCampaigns) => {
      try {
        get_a_feild_in_a_document(seletedCampaigns, { status: 0 });
        dispatch(campaignActions.getAllCampaignsAction());
      } catch (error) {
        dispatch(openAlertAction(`${error.message}`, true, "error"));
      }
    });
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
        </div>
        <div className="campaign-display-container">
          <div className="campaign-display-subcontainers">
            <div className="campaign-display-subcontainer1">
              <div
                className="display-count"
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
                  Actions
                  <DownArrow />
                </div>
              )}
            </div>

            {/* <select
              className="addCampaign-selects"
              style={{
                border: "none",
                outline: "none",
                background:
                  "linear-gradient(270deg, #f1f1f1 0%, rgba(248, 248, 249, 0.8) 134.62%)",
                width: "113px",
                height: "18px",
                fontStyle: "normal",
                fontWeight: "600",
                fontSize: "14px",
                lineHeight: "16px",
                color: "#003ad2",
              }}
              name="multipleFilterValue"
              value={multipleFilterValue}
              onChange={(event) => {
                setMultipleFilterValue(event.target.value);
              }}
              autoComplete="off"
            >
              <option value="All" default>
                {`All(${searchedCampaignList.length})`}
              </option>
              <option value="Active">
                {`Active(${campaignsListData.length})`}
              </option>
              <option value="In-Active">{`In-Active(${campaignsListData.length})`}</option>
            </select> */}
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
                  <span className="campaign-btn-text">Download</span>
                </button>

                <button
                  className="campaign-btn delete-btn"
                  onClick={onDeleteMulitpleCampaign}
                >
                  <Delete />
                  <span className="campaign-btn-text">Delete</span>
                </button>
                <button
                  className="campaign-btn delete-btn"
                  onClick={onAssignMulitpleCampaign}
                >
                  <Delete />
                  <span className="campaign-btn-text">Assign</span>
                </button>
                <button
                  className="campaign-btn delete-btn"
                  onClick={onActivateMulitpleCampaign}
                >
                  <Delete />
                  <span className="campaign-btn-text">Activate</span>
                </button>
                <button
                  className="campaign-btn delete-btn"
                  onClick={onDeActivateMulitpleCampaign}
                >
                  <Delete />
                  <span className="campaign-btn-text">De-Activate</span>
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
                onClick={() => Viewed(campaign.id)}
                className={`campaign-display-subcontainers ${
                  campaignDoc.id === campaign.id ? "selected" : ""
                }`}
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
                    className="display-count"
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

        <CampaignPopup
          openCampaignPopup={openCampaignPopup}
          handleClickOpen={handleClickOpenCampaignPopup}
          handleClose={handleCloseCampaignPopup}
          disableApplyBtn={disableApplyBtn}
          selectedArray={selectedArray}
        />
      </React.Fragment>
    );
  }
};

export default CampaignDisplay;
