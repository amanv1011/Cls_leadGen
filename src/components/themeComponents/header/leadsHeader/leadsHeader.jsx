import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DownArrow from "../../../../assets/jsxIcon/DownArrow";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import Tooltip from "@mui/material/Tooltip";
import "./leadsHeader.scss";
import {
  leadsFilterCampaignName,
  leadsFilterOwnerName,
  clearFilters,
  datePickerState,
  leadsFilterCountiresName,
} from "../../../../redux/actions/leadsFilter";
import * as commonFunctions from "../../../pageComponents/campaign/commonFunctions";
import NewDateRangePicker from "../../AdvanceDatePicker/newDatePickerCompo";
import { leadsFilterDate } from "../../../../redux/actions/leadsFilter";
import { connect } from "react-redux";
import RestrictedComponent from "../../../higherOrderComponents/restrictedComponent";

import Moment from "moment";
import { extendMoment } from "moment-range";
import { roles } from "../../../../utils/constants";

const moment = extendMoment(Moment);

const LeadsHeader = (props) => {
  const { campaign, userRole } = props;
  const dispatch = useDispatch();
  const [uniqueOwner, setUniqueOwner] = useState([]);
  // const leadData = useSelector((state) => state.allCampaigns.campaignList);
  const allUsers = useSelector((state) => state.users.users);
  const campaignNameFilter = useSelector(
    (state) => state.leadsFilter.campaignName
  );
  const ownerNameFilter = useSelector((state) => state.leadsFilter.ownerName);
  const countriesNameFilter = useSelector(
    (state) => state.leadsFilter.countriesName
  );
  const cardsToDisplay = useSelector((state) => state.allLeads.cardsToDisplay);
  // const searchQuery = useSelector((state) => state.leadsFilter.searchQuery);

  const [allCampgainsMenu, setAllCampgainsMenu] = React.useState(null);
  const [allCampaignsFilter, setAllCampgainsFilter] = useState("All Campgains");
  const [allOwnersFilter, setAllOwnersFilter] = useState("All Owners");
  const [allCountriesFilter, setAllCountriesFilter] = useState("All Countries");
  const [allCountriesMenu, setAllCountriesMenu] = React.useState(null);

  // dateRangePicker state

  const [clearDateFilter, setClearDateFilter] = useState();
  //const filterDate = useSelector((state) => state.leadsFilter.filterDate);

  const applyOkButton = (value1) => {
    setClearDateFilter(value1);
    const calender1 = moment.range(value1[0], value1[1]);
    // const calender1 =
    //   props.leadsFilter.datePickerState === 0
    //     ? moment.range(today.clone(), today.clone())
    //     : moment.range(value1[0], value1[1]);
    props.leadsFilterDate(calender1);
    props.datePickerState(1);
  };

  const openAllCampgainsMenu = Boolean(allCampgainsMenu);
  const handleClickAllCampgainsMenu = (event) => {
    setAllCampgainsMenu(event.currentTarget);
  };
  const openAllCountriesMenu = Boolean(allCountriesMenu);
  const handleClickAllCountriesMenu = (event) => {
    setAllCountriesMenu(event.currentTarget);
  };

  const handleCloseAllCountriesMenu = (event) => {
    if (event.target.innerText === "") {
      dispatch(leadsFilterCountiresName("All Countries"));
      setAllCountriesFilter("All Countries");
    } else {
      dispatch(leadsFilterCountiresName(event.target.innerText));
      setAllCountriesFilter(event.target.innerText);
    }
    setAllCountriesMenu(null);
  };

  const arr = [];
  const uniqueCountries = [];

  campaign.forEach((c) => {
    // if (!arr.includes(c.owner)) {
    //   arr.push(c.owner);
    // }

    if (!uniqueCountries.includes(c.country)) {
      uniqueCountries.push(c.country);
    }
  });

  useEffect(() => {
    const array = [...arr];
    allUsers.map((user) => {
      if (!array.includes(user.name)) {
        array.push(user.name);
      }
    });
    setUniqueOwner(array);
  }, [allUsers, campaign]);

  useEffect(() => {
    setAllCampgainsFilter(campaignNameFilter);
    setAllOwnersFilter(ownerNameFilter);
    setAllCountriesFilter(countriesNameFilter);
    setAllCampgainsMenu(null);
  }, [campaignNameFilter, ownerNameFilter, countriesNameFilter]);

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
    setClearDateFilter([]);
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
                  boxSizing: "border-box",
                  marginTop: "3px",
                  boxshadow: "none",
                  background: "rgba(248, 248, 249, 1)",
                  color: "rgba(92, 117,154)",
                  zIndex: "1",
                  overflow: "auto",
                  height: "auto",
                  minWidth: "160px",
                  maxHeight: "200px",
                },
              }}
              open={openAllCampgainsMenu}
              onClose={handleCloseAllCampgainsMenu}
            >
              <MenuItem
                disableRipple
                key={"abc"}
                className="menu-item"
                onClick={handleCloseAllCampgainsMenu}
                sx={{
                  boxSizing: "border-box",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                All Campaigns
              </MenuItem>
              {campaign &&
                campaign.map((ele, idx) => {
                  return (
                    <MenuItem
                      key={idx}
                      disableRipple
                      className="menu-item"
                      onClick={handleCloseAllCampgainsMenu}
                      sx={{
                        boxSizing: "border-box",
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    >
                      {ele.name}
                    </MenuItem>
                  );
                })}
            </Menu>
          </div>
          <NewDateRangePicker
            // rangeFunc={rangeFunc}
            clearDateFilter={clearDateFilter}
            applyOkButton={applyOkButton}
          />
          {/* <DateModal/> */}

          <div className="select-container">
            <Button
              id="basic-button"
              className="select-button"
              onClick={handleClickAllCountriesMenu}
            >
              <span className="select-btn-title">{allCountriesFilter}</span>
              <span>
                <DownArrow />
              </span>
            </Button>
          </div>
          <Menu
            className="menu"
            id="basic-menu"
            anchorEl={allCountriesMenu}
            PaperProps={{
              style: {
                width: "auto",
                borderRadius: "10px",
                marginTop: "3px",
                boxshadow: "none",
                // backgroundColor: "#E7E7E7",
                background: "rgba(248, 248, 249, 1)",
                color: "rgba(92, 117,154)",
                zIndex: "1",
                overflow: "auto",
                height: "auto",
                minWidth: "160px",
                maxHeight: "200px",
              },
            }}
            open={openAllCountriesMenu}
            onClose={handleCloseAllCountriesMenu}
          >
            <MenuItem
              key={"abc"}
              className="menu-item"
              onClick={handleCloseAllCountriesMenu}
              sx={{
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              All Countries
            </MenuItem>
            {uniqueCountries &&
              uniqueCountries &&
              uniqueCountries.map((ele, idx) => {
                return (
                  <MenuItem
                    key={idx}
                    data-id={idx}
                    className="menu-item"
                    onClick={handleCloseAllCountriesMenu}
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
          {roles && roles.all.includes(userRole && userRole) ? (
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
                    background: "rgba(248, 248, 249, 1)",
                    color: "rgba(92, 117,154)",
                    zIndex: "1",
                    overflow: "auto",
                    maxHeight: "200px",
                    minWidth: "160px",
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
                {uniqueOwner &&
                  uniqueOwner.sort().map((ele, idx) => {
                    return (
                      <MenuItem
                        key={idx}
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
          ) : null}
        </div>
        <div className="right-section">
          <div className="filter-icon">
            <Tooltip title="Clear Filter" placement="top-start">
              <Button onClick={clearFilterTab} className="filter-btn">
                <FilterAltOffIcon fontSize="small" />
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

const mapDispatchToProps = {
  leadsFilterDate,
  datePickerState,
  clearFilters,
};
const mapStateToProps = (state) => {
  return { leadsFilter: state.leadsFilter };
};
export default connect(mapStateToProps, mapDispatchToProps)(LeadsHeader);

//export default LeadsHeader;
