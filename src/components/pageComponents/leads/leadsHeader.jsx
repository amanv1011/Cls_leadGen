import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useRef, useState } from "react";
import { Button, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DateModal from "./DateModal";
import DownArrow from "./DownArrow";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import Tooltip from "@mui/material/Tooltip";
import "./leadsHeader.scss";
import {
  leadsFilterCampaignName,
  leadsFilterOwnerName,
  leadsFilterSearch,
  clearFilters,
  datePickerState,
} from "../../../redux/actions/leadsFilter";

const LeadsHeader = () => {
  const dispatch = useDispatch();
  const SearchInput = useRef("");
  const matches = useMediaQuery("(max-width:1460px)");

  const leadData = useSelector((state) => state.allCampaigns.campaignList);
  const campaignNameFilter = useSelector(
    (state) => state.leadsFilter.campaignName
  );
  const ownerNameFilter = useSelector((state) => state.leadsFilter.ownerName);

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

  const handleSearch = () => {
    if (SearchInput.current.value.length > 1) {
      dispatch(leadsFilterSearch(SearchInput.current.value));
    }
  };

  const clearFilterTab = () => {
    dispatch(clearFilters());
    dispatch(datePickerState(0));
  };

  return (
    <>
      <div className="leads-header-container">
        <div style={{ display: "flex" }} className="left-section">
          <div className="leads-input">
            <input
              placeholder={`Search for "Keywords"`}
              onChange={handleSearch}
              type="text"
              className="search-input-leads"
              ref={SearchInput}
            />
            <div className="search-icon">
              <SearchIcon />
            </div>
          </div>

          <div className="select-container">
            <Button
              id="basic-button"
              aria-controls={openAllCampgainsMenu ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openAllCampgainsMenu ? "true" : undefined}
              onClick={handleClickAllCampgainsMenu}
              className="select-button"
            >
              {allCampaignsFilter}
              <span style={{ paddingLeft: "45px", paddingBottom: "3px" }}>
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
                  boxShadow: "none",
                  backgroundColor: "#E7E7E7",
                  color: "rgba(92, 117,154)",
                },
              }}
              open={openAllCampgainsMenu}
              onClose={handleCloseAllCampgainsMenu}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                className="menu-item"
                onClick={handleCloseAllCampgainsMenu}
                sx={{
                  fontSize: matches ? "12px" : "14px",
                }}
              >
                All Campaigns
              </MenuItem>
              {leadData.map((ele) => {
                return (
                  <React.Fragment key={ele.id}>
                    <MenuItem
                      data-id={ele.id}
                      className="menu-item"
                      onClick={handleCloseAllCampgainsMenu}
                      sx={{
                        fontSize: matches ? "12px" : "14px",
                      }}
                    >
                      {ele.name}
                    </MenuItem>
                  </React.Fragment>
                );
              })}
            </Menu>
          </div>
        </div>
        <div
          className="right-section"
          style={{ display: "flex", paddingRight: "27px" }}
        >
          <DateModal />
          <Button
            id="basic-button"
            className="select-container"
            aria-controls={openOwnerMenu ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openOwnerMenu ? "true" : undefined}
            onClick={handleClickOwnerMenu}
          >
            {allOwnersFilter}
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
                boxShadow: "none",
                backgroundColor: "#E7E7E7",
                color: "rgba(92, 117,154)",
              },
            }}
            open={openOwnerMenu}
            onClose={handleCloseOwnerMenu}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              className="menu-item"
              sx={{
                fontSize: matches ? "12px" : "14px",
              }}
              onClick={handleCloseOwnerMenu}
            >
              All Owners
            </MenuItem>
            {uniqueOwner.map((ele) => {
              return (
                <React.Fragment key={ele.id}>
                  <MenuItem
                    data-id={ele.id}
                    className="menu-item"
                    onClick={handleCloseOwnerMenu}
                    sx={{
                      fontSize: matches ? "12px" : "14px",
                    }}
                  >
                    {ele}
                  </MenuItem>
                </React.Fragment>
              );
            })}
          </Menu>
          <div className="filter-icon">
            <Tooltip title="Filter" placement="top-start">
              <Button onClick={clearFilterTab} className="filter-btn">
                <FilterAltOffIcon />
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeadsHeader;
