import React, { useEffect, useState } from "react";
import { Button, Menu, MenuItem, useMediaQuery, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import * as commonFunctions from "../../../pageComponents/campaign/commonFunctions";
import * as campaignFilterActions from "../../../../redux/actions/campaignFilterActions";
import * as campaignActions from "../../../../redux/actions/campaignActions";
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
  campgaignId,
  allUsers,
}) => {
  const dispatch = useDispatch();
  const matches = useMediaQuery("(max-width:1460px)");
  const countryFilterValue = useSelector(
    (state) => state.campaignFilters.country
  );
  const ownerFilterValue = useSelector((state) => state.campaignFilters.owner);

  const [uniqueOwner, setUniqueOwner] = useState([]);
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
  console.log(countryList);
  console.log(allUsers);

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

  const finalUniqueOwnerArray = [];
  const uniqueCountries = [];

  campaignsList &&
    campaignsList.forEach((campaign) => {
      if (!finalUniqueOwnerArray.includes(campaign.owner)) {
        finalUniqueOwnerArray.push(campaign.owner);
      }

      if (!uniqueCountries.includes(campaign.country)) {
        uniqueCountries.push(campaign.country);
      }
    });

  // useEffect(() => {
  //   const tempArray = [...finalUniqueOwnerArray];
  //   allUsers.map((user) => {
  //     if (!tempArray.includes(user.name)) {
  //       // tempArray.push(user.name);
  //     }
  //   });
  //   setUniqueOwner(tempArray);
  // }, [allUsers, searchedCampaignList]);

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
          "Start Time": moment(campaign.start_time, ["HH:mm"]).format(
            "hh:mm A"
          ),
          "End Date": moment
            .unix(campaign.end_date.seconds, campaign.end_date.nanoseconds)
            .format("MM/DD/YYYY"),
          "End Time": moment(campaign.end_time, ["HH:mm"]).format("hh:mm A"),
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
              disabled={campgaignId ? true : false}
              style={
                campgaignId
                  ? {
                      pointerEvents: "auto",
                      cursor: "not-allowed",
                    }
                  : {}
              }
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
                  zIndex: "1",
                  overflow: "auto",
                  height: "fitContent",
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
              {uniqueCountries &&
                uniqueCountries.map((country) => {
                  return (
                    <MenuItem
                      key={country}
                      data-id={country}
                      className="menu-item"
                      onClick={handleClosecountryMenu}
                      sx={{
                        fontSize: matches ? "13px" : "14px",
                      }}
                    >
                      {country && country}
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
              disabled={campgaignId ? true : false}
              style={
                campgaignId
                  ? {
                      pointerEvents: "auto",
                      cursor: "not-allowed",
                    }
                  : {}
              }
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
                  zIndex: "1",
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
              {allUsers &&
                allUsers.sort().map((user) => {
                  return (
                    <MenuItem
                      key={user.name}
                      data-id={user.name}
                      className="menu-item"
                      onClick={handleCloseOwnerMenu}
                      sx={{
                        fontSize: matches ? "13px" : "14px",
                      }}
                    >
                      {user.name}
                    </MenuItem>
                  );
                })}
            </Menu>
          </div>
          <div></div>
        </div>
        <div className="right-section">
          <div className="filter-icon-campaign ">
            <Tooltip title="Clear Filter" placement="top-start">
              <Button
                disabled={campgaignId ? true : false}
                onClick={() => {
                  dispatch(campaignActions.getAllCampaignsAction());
                  dispatch(campaignActions.searchInputValueAction(""));
                  dispatch(campaignFilterActions.campaignFilterClearAction());
                }}
                className="filter-btn"
                style={{
                  textTransform: "none",
                  height: "40px",
                  width: "25px",
                  fontWeight: "600",
                  padding: "0px",
                  borderRadius: "10px",
                  color: "rgb(92, 117, 154)",
                }}
              >
                <FilterAltOffIcon fontSize="small" />
              </Button>
            </Tooltip>
          </div>
          <span>
            <AddCampaginModal countryList={countryList} />
            <Button
              variant="outlined"
              onClick={exportCampaignToExcel}
              className="export-to-excel-button"
              disabled={
                campgaignId
                  ? true
                  : searchedCampaignList && searchedCampaignList.length === 0
                  ? true
                  : false
              }
              style={
                campgaignId
                  ? {
                      pointerEvents: "auto",
                      cursor: "not-allowed",
                    }
                  : searchedCampaignList && searchedCampaignList.length === 0
                  ? { pointerEvents: "auto", cursor: "not-allowed" }
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
