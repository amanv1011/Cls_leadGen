import React, { useEffect, useState } from "react";
import { Button, Menu, MenuItem, useMediaQuery, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import * as commonFunctions from "../../../pageComponents/campaign/commonFunctions";
import * as campaignFilterActions from "../../../../redux/actions/campaignFilterActions";
import DownArrow from "../../../../assets/jsxIcon/DownArrow";
import AddCampaginModal from "../../../themeComponents/popup/index";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import moment from "moment";
import "./campaignHeader.scss";

const CampaignHeader = ({
  campaignsList,
  searchedCampaignList,
  leadsList,
  countryList,
}) => {
  const dispatch = useDispatch();
  const matches = useMediaQuery("(max-width:1460px)");

  const countryFilterValue = useSelector(
    (state) => state.campaignFilters.country
  );
  const ownerFilterValue = useSelector((state) => state.campaignFilters.owner);

  const [countryFilter, setCountryFilter] = useState("Country");
  const [ownerFilter, setOwnerFilter] = useState("Owner");
  const [ownerMenu, setOwnerMenu] = useState(null);
  const [countryMenu, setCountryMenu] = useState(null);
  const openCountryMenu = Boolean(countryMenu);
  const openOwnerMenu = Boolean(ownerMenu);

  useEffect(() => {
    setCountryFilter(countryFilterValue);
    setOwnerFilter(ownerFilterValue);
    setCountryMenu(null);
  }, [countryFilterValue, ownerFilterValue]);

  const handleClickCountryMenu = (event) => {
    setCountryMenu(event.currentTarget);
  };

  const handleClickOwnerMenu = (event) => {
    setOwnerMenu(event.currentTarget);
  };

  const handleClosecountryMenu = (event) => {
    if (event.target.innerText === "") {
      dispatch(
        campaignFilterActions.campaignCountryFilterValueAction("Country")
      );
      setCountryFilter("Country");
    } else {
      dispatch(
        campaignFilterActions.campaignCountryFilterValueAction(
          event.target.innerText
        )
      );
      setCountryFilter(event.target.innerText);
    }
    setCountryMenu(null);
  };

  const handleCloseOwnerMenu = (event) => {
    if (event.target.innerText === "") {
      dispatch(campaignFilterActions.campaignOwnerFilterValueAction("Owner"));
      setOwnerFilter("Owner");
    } else {
      dispatch(
        campaignFilterActions.campaignOwnerFilterValueAction(
          event.target.innerText
        )
      );
      setOwnerFilter(event.target.innerText);
    }
    setOwnerMenu(null);
  };

  const uniqueOwner = [];

  campaignsList &&
    campaignsList.forEach((campaign) => {
      if (!uniqueOwner.includes(campaign.owner)) {
        uniqueOwner.push(campaign.owner);
      }
    });

  const getNumOfLeads = (id) => {
    const val = leadsList.filter((valID) => {
      return valID.campaignId === id;
    });
    return val.length;
  };

  const exportCampaignToExcel = () => {
    let updatedcampaignListDataToDownload = [];

    searchedCampaignList &&
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

  return (
    <React.Fragment>
      <div className="campaign-header-container">
        <div style={{ display: "flex" }} className="left-section">
          <div className="select-container">
            <Button
              id="basic-button"
              onClick={handleClickCountryMenu}
              className="select-button"
            >
              {countryFilter}
              <span style={{ paddingLeft: "45px", paddingBottom: "3px" }}>
                <DownArrow />
              </span>
            </Button>
            <Menu
              className="menu"
              id="basic-menu"
              anchorEl={countryMenu}
              PaperProps={{
                style: {
                  width: "auto",
                  borderRadius: "10px",
                  marginTop: "3px",
                  boxshadow: "none",
                  backgroundColor: "rgb(233,236,241)",
                  color: "rgba(92, 117,154)",
                  zIndex: "1000",
                  overflow: "auto",
                  height: "210px",
                },
              }}
              open={openCountryMenu}
              onClose={handleClosecountryMenu}
            >
              <MenuItem
                key="Country"
                className="menu-item"
                onClick={handleClosecountryMenu}
                sx={{
                  fontSize: matches ? "13px" : "14px",
                }}
              >
                Country
              </MenuItem>
              {countryList &&
                countryList.map((country) => {
                  return (
                    <MenuItem
                      key={country.id}
                      data-id={country.id}
                      className="menu-item"
                      onClick={handleClosecountryMenu}
                      sx={{
                        fontSize: matches ? "13px" : "14px",
                      }}
                    >
                      {country.country_name}
                    </MenuItem>
                  );
                })}
            </Menu>
          </div>
          <div className="select-container">
            <Button
              id="basic-button"
              className="select-button"
              onClick={handleClickOwnerMenu}
            >
              {ownerFilter}
              <span style={{ paddingLeft: "70px", paddingBottom: "3px" }}>
                <DownArrow />
              </span>
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={ownerMenu}
              className="menu"
              PaperProps={{
                style: {
                  width: "auto",
                  borderRadius: "10px",
                  marginTop: "3px",
                  boxshadow: "none",
                  backgroundColor: "rgb(233,236,241)",

                  color: "rgba(92, 117,154)",
                  zIndex: "1000",
                  overflow: "auto",
                  maxHeight: "150px",
                },
              }}
              open={openOwnerMenu}
              onClose={handleCloseOwnerMenu}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                key="Owner"
                className="menu-item"
                sx={{
                  fontSize: matches ? "13px" : "14px",
                }}
                onClick={handleCloseOwnerMenu}
              >
                Owner
              </MenuItem>
              {uniqueOwner &&
                uniqueOwner.map((owner) => {
                  return (
                    <MenuItem
                      key={owner.id}
                      data-id={owner && owner.id}
                      className="menu-item"
                      onClick={handleCloseOwnerMenu}
                      sx={{
                        fontSize: matches ? "13px" : "14px",
                      }}
                    >
                      {owner}
                    </MenuItem>
                  );
                })}
            </Menu>
          </div>
          <div>
            <div className="filter-icon">
              <Tooltip title="Clear Filter" placement="top-start">
                <Button
                  onClick={() => {
                    dispatch(campaignFilterActions.campaignFilterClearAction());
                  }}
                  className="filter-btn"
                >
                  <FilterAltOffIcon />
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="right-section">
          <span>
            <AddCampaginModal countryList={countryList} />
            <Button
              variant="outlined"
              onClick={exportCampaignToExcel}
              className="export-to-excel-button"
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
                    }
                  : {}
              }
            >
              Export to Excel
            </Button>
          </span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CampaignHeader;
