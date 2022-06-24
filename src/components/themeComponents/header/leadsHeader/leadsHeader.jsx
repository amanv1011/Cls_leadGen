import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DateModal from "../../../pageComponents/leads/DateModal";
import DownArrow from "../../../../assets/jsxIcon/DownArrow";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import Tooltip from "@mui/material/Tooltip";
import "./leadsHeader.scss";
import {
  leadsFilterCampaignName,
  leadsFilterOwnerName,
  clearFilters,
  datePickerState,
} from "../../../../redux/actions/leadsFilter";
import moment from "moment";
import * as commonFunctions from "../../../pageComponents/campaign/commonFunctions";
import AdvanceDatePicker from "../../AdvanceDatePicker/advanceDatePicker";
import NewDateRangePicker from "../../AdvanceDatePicker/newDatePickerCompo";

const LeadsHeader = () => {
  const dispatch = useDispatch();
  const leadData = useSelector((state) => state.allCampaigns.campaignList);
  const campaignNameFilter = useSelector(
    (state) => state.leadsFilter.campaignName
  );
  const ownerNameFilter = useSelector((state) => state.leadsFilter.ownerName);
  const cardsToDisplay = useSelector((state) => state.allLeads.cardsToDisplay);
  // const searchQuery = useSelector((state) => state.leadsFilter.searchQuery);

  const [allCampgainsMenu, setAllCampgainsMenu] = React.useState(null);
  const [allCampaignsFilter, setAllCampgainsFilter] = useState("All Campgains");
  const [allOwnersFilter, setAllOwnersFilter] = useState("All Owners");
  const openAllCampgainsMenu = Boolean(allCampgainsMenu);
  const handleClickAllCampgainsMenu = (event) => {
    setAllCampgainsMenu(event.currentTarget);
  };

  const uniqueOwner = [];

  leadData.forEach((c) => {
    if (!uniqueOwner.includes(c.owner)) {
      uniqueOwner.push(c.owner);
    }
  });

  useEffect(() => {
    setAllCampgainsFilter(campaignNameFilter);
    setAllOwnersFilter(ownerNameFilter);
    setAllCampgainsMenu(null);
  }, [campaignNameFilter, ownerNameFilter]);

  const handleCloseAllCampgainsMenu = (event) => {
    if (event.target.innerText === "") {
      dispatch(leadsFilterCampaignName("All Campaigns"));
      setAllCampgainsFilter("All Campaigns");
    } else {
      dispatch(leadsFilterCampaignName(event.target.innerText));
      setAllCampgainsFilter(event.target.innerText);
    }
    setAllCampgainsMenu(null);
  };

  const [ownerMenu, setOwnerMenu] = useState(null);
  const openOwnerMenu = Boolean(ownerMenu);
  const handleClickOwnerMenu = (event) => {
    setOwnerMenu(event.currentTarget);
  };
  const handleCloseOwnerMenu = (event) => {
    if (event.target.innerText === "") {
      dispatch(leadsFilterOwnerName("All Owners"));
      setAllOwnersFilter("All Owners");
    } else {
      dispatch(leadsFilterOwnerName(event.target.innerText));
      setAllOwnersFilter(event.target.innerText);
    }
    setOwnerMenu(null);
  };

  const clearFilterTab = () => {
    dispatch(clearFilters());
    dispatch(datePickerState(0));
  };
  // Export to leads functions
  const downloadLeads = (leadsList, excelFileName) => {
    let updatedleadsListDataToDownload = [];
    leadsList.forEach((lead) => {
      let campaignListDataToDownload = {
        "Company name": lead.companyName !== null ? lead.companyName : "NA",
        Location: lead.location !== "No location" ? lead.location : "NA",
        "Lead generated date":
          lead.leadGeneratedDate !== null
            ? moment
                .unix(
                  lead.leadGeneratedDate.seconds,
                  lead.leadGeneratedDate.nanoseconds
                )
                .format("MM/DD/YYYY")
            : "NA",
        "Lead posted date":
          lead.leadPostedDate !== null
            ? moment(lead.leadPostedDate).format("MM/DD/YYYY")
            : "NA",
        Link: lead.link,
        Summary: lead.summary !== "No summary" ? lead.summary : "NA",
        Title: lead.title,
        "Status of the lead":
          lead.status === 1
            ? "Approved"
            : lead.status === -1
            ? "Rejected"
            : lead.status === 2
            ? "Archived"
            : "Under review",
      };

      updatedleadsListDataToDownload = [
        ...updatedleadsListDataToDownload,
        campaignListDataToDownload,
      ];
    });

    commonFunctions.downloadInExcel(
      updatedleadsListDataToDownload,
      `${excelFileName}`
    );
  };

  const exportLeadsToExcel = () => {
    if (window.location.pathname === "/leads") {
      downloadLeads(cardsToDisplay, "All leads");
    }
    if (window.location.pathname === "/leads/approve") {
      downloadLeads(cardsToDisplay, "Approved leads");
    }

    if (window.location.pathname === "/leads/reject") {
      downloadLeads(cardsToDisplay, "Rejected leads");
    }
    if (window.location.pathname === "/leads/underreview") {
      downloadLeads(cardsToDisplay, "Under review leads");
    }
    if (window.location.pathname === "/leads/archive") {
      downloadLeads(cardsToDisplay, "Archived leads");
    }
  };

  return (
    <>
      <div className="leads-header-container">
        <div style={{ display: "flex" }} className="left-section">
          <div className="select-container">
            <Button
              id="basic-button"
              onClick={handleClickAllCampgainsMenu}
              className="select-button"
            >
              <span className="select-btn-title">{allCampaignsFilter}</span>
              <span>
                <DownArrow />
              </span>
            </Button>
            <Menu
              className="menu"
              id="basic-menu"
              anchorEl={allCampgainsMenu}
              PaperProps={{
                style: {
                  width: "auto",
                  borderRadius: "10px",
                  marginTop: "3px",
                  boxshadow: "none",
                  // backgroundColor: "#E7E7E7",
                  backgroundColor: "rgb(233,236,241)",
                  color: "rgba(92, 117,154)",
                  zIndex: "1000",
                  overflow: "auto",
                  height: "210px",
                },
              }}
              open={openAllCampgainsMenu}
              onClose={handleCloseAllCampgainsMenu}
            >
              <MenuItem
                key={"abc"}
                className="menu-item"
                onClick={handleCloseAllCampgainsMenu}
                sx={{
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                All Campaigns
              </MenuItem>
              {leadData.map((ele) => {
                return (
                  <MenuItem
                    key={ele.id}
                    data-id={ele.id}
                    className="menu-item"
                    onClick={handleCloseAllCampgainsMenu}
                    sx={{
                      fontSize: "13px",
                      fontWeight: 600,
                    }}
                  >
                    {ele.name}
                  </MenuItem>
                );
              })}
            </Menu>
          </div>
          {/* <AdvanceDatePicker/> */}
          <NewDateRangePicker />
          {/* <DateModal/> */}
          <div className="select-container">
            <Button
              id="basic-button"
              className="select-button"
              onClick={handleClickOwnerMenu}
            >
              <span className="select-btn-title">{allOwnersFilter}</span>
              <span>
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
                  // backgroundColor: "#E7E7E7",
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
                key={"xyz"}
                className="menu-item"
                sx={{
                  fontSize: "13px",
                  fontWeight: 600,
                }}
                onClick={handleCloseOwnerMenu}
              >
                All Owners
              </MenuItem>
              {uniqueOwner.map((ele) => {
                return (
                  <MenuItem
                    key={ele.id}
                    data-id={ele.id}
                    className="menu-item"
                    onClick={handleCloseOwnerMenu}
                    sx={{
                      fontSize: "13px",
                      fontWeight: 600,
                    }}
                  >
                    {ele}
                  </MenuItem>
                );
              })}
            </Menu>
          </div>
        </div>
        <div className="right-section">
          <div className="filter-icon">
            <Tooltip title="Clear Filter" placement="top-start">
              <Button onClick={clearFilterTab} className="filter-btn">
                <FilterAltOffIcon />
              </Button>
            </Tooltip>
          </div>
          <span>
            <Button
              variant="outlined"
              onClick={exportLeadsToExcel}
              className="export-to-excel-button"
              disabled={cardsToDisplay.length === 0 ? true : false}
              style={
                cardsToDisplay.length === 0
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
    </>
  );
};

export default LeadsHeader;
