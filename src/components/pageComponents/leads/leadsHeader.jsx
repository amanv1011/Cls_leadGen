import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
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
  // const SearchInput = useRef("");
  const [SearchInput, setSearchInput] = useState("");

  const leadData = useSelector((state) => state.allCampaigns.campaignList);
  const campaignNameFilter = useSelector(
    (state) => state.leadsFilter.campaignName
  );
  const ownerNameFilter = useSelector((state) => state.leadsFilter.ownerName);
  const searchQuery = useSelector((state) => state.leadsFilter.searchQuery);

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

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
    if (event.target.value.length > 1) {
      dispatch(leadsFilterSearch(event.target.value));
    }
  };

  const clearFilterTab = () => {
    dispatch(clearFilters());
    dispatch(datePickerState(0));
  };

  const clearSearch = () => {
    if (searchQuery === "") {
      setSearchInput("");
    }
  };

  useEffect(() => {
    clearSearch();
  }, [searchQuery]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",

        }}
      >
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              backgroundColor: "#E7E7E7",
              height: "40px",
              borderRadius: "10px",

            }}
          >
            <input
              placeholder={`Search for "Keywords"`}
              onChange={handleSearch}
              type="text"
              value={SearchInput}
              className="search-input-leads"
              style={{
                width: "100%",
                height: "40px",
                borderRadius: "10px",
                backgroundColor: "#E7E7E7",
                border: "none",
                fontWeight: "600",
                color: "rgba(92, 117,154)",
                fontSize: "14px",
                paddingLeft: "10px",
                minWidth: "158px",
                maxWidth: "300px"
              }}
            />
            <div
              className="search-icon"
              style={{ paddingTop: "9px", paddingRight: "4px" }}
            >
              <SearchIcon />
            </div>
          </div>

          <div>
            <Button
              id="basic-button"
              aria-controls={openAllCampgainsMenu ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openAllCampgainsMenu ? "true" : undefined}
              onClick={handleClickAllCampgainsMenu}
              style={{
                textTransform: "none",
                minWidth: "181px",
                justifyContent: "space-between",
                padding: "6px",
                fontWeight: "600",
                borderRadius: "10px",
                marginLeft: "10px",
                backgroundColor: "#E7E7E7",
                color: "rgba(92, 117,154)",
                marginRight: "10px"
              }}
            >
              {allCampaignsFilter}
              <span style={{ paddingLeft: "45px", paddingBottom: "3px" }}>
                <DownArrow />
              </span>
            </Button>
            <Menu
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
                  zIndex: "1000",
                  overflow: "auto",
                  height: "210px"


                },
              }}
              open={openAllCampgainsMenu}
              onClose={handleCloseAllCampgainsMenu}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                sx={{
                  fontSize: "14px",
                  fontWeight: "600",
                }}
                onClick={handleCloseAllCampgainsMenu}
              >
                All Campaigns
              </MenuItem>
              {leadData.map((ele) => {
                return (
                  <React.Fragment key={ele.id}>
                    <MenuItem
                      data-id={ele.id}
                      sx={{
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                      onClick={handleCloseAllCampgainsMenu}
                    >
                      {ele.name}
                    </MenuItem>
                  </React.Fragment>
                );
              })}
            </Menu>
          </div>
        </div>
        <div style={{ display: "flex", paddingRight: "27px" }}>
          <DateModal />
          <Button
            id="basic-button"
            aria-controls={openOwnerMenu ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openOwnerMenu ? "true" : undefined}
            onClick={handleClickOwnerMenu}
            style={{
              textTransform: "none",
              height: "40px",
              minWidth: "181px",
              justifyContent: "space-between",
              padding: "10px",
              fontWeight: "600",
              borderRadius: "10px",
              marginLeft: "10px",
              backgroundColor: "#E7E7E7",
              color: "rgba(92, 117,154)",
            }}
          >
            {allOwnersFilter}
            <span style={{ paddingLeft: "70px", paddingBottom: "3px" }}>
              <DownArrow />
            </span>
          </Button>

          <Menu
            id="basic-menu"
            anchorEl={ownerMenu}
            PaperProps={{
              style: {
                width: "auto",
                borderRadius: "10px",
                marginTop: "3px",
                boxShadow: "none",
                backgroundColor: "#E7E7E7",
                color: "rgba(92, 117,154)",
                zIndex: "1000",
                overflow: "auto",
                maxHeight:"150px",
                
              },
            }}
            open={openOwnerMenu}
            onClose={handleCloseOwnerMenu}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              sx={{
                fontSize: "14px",
                fontWeight: "600",
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
                    sx={{
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                    onClick={handleCloseOwnerMenu}
                  >
                    {ele}
                  </MenuItem>
                </React.Fragment>
              );
            })}
          </Menu>

          <div className="filter-icon">
            <Tooltip title={"Clear all Filter"} arrow placement="top">
              <Button onClick={clearFilterTab}
                style={{
                  fontFamily: "Segoe UI",
                  textTransform: "none",
                  height: "40px",
                  width: "35px",
                  fontWeight: "600",
                  padding: "10px",
                  borderRadius: "10px",
                  marginLeft: "5px",
                  backgroundColor: "rgba(231, 231, 231)",
                  color: "rgba(92, 117, 154)",
                }}
              >
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
