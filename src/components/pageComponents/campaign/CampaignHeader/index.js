import React, { useEffect, useState } from "react";
import { Button, Menu, MenuItem, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DownArrow from "../../../pageComponents/leads/DownArrow";

import "./campaignHeader.scss";
import {
  leadsFilterCampaignName,
  leadsFilterOwnerName,
} from "../../../../redux/actions/leadsFilter";
import * as campaignActions from "../../../../redux/actions/campaignActions";
import AddCampaginModal from "../../../themeComponents/popup/index";

const CampaignHeader = ({ campaignsList }) => {
  const dispatch = useDispatch();
  const matches = useMediaQuery("(max-width:1460px)");

  const leadData = useSelector((state) => state.allCampaigns.campaignList);
  const campaignNameFilter = useSelector(
    (state) => state.leadsFilter.campaignName
  );
  const ownerNameFilter = useSelector((state) => state.leadsFilter.ownerName);
  const searchQuery = useSelector((state) => state.leadsFilter.searchQuery);

  const [allCampgainsMenu, setAllCampgainsMenu] = useState(null);
  const [allCampaignsFilter, setAllCampgainsFilter] = useState("Country");
  const [allOwnersFilter, setAllOwnersFilter] = useState("Owner");
  const openAllCampgainsMenu = Boolean(allCampgainsMenu);
  const handleClickAllCampgainsMenu = (event) => {
    setAllCampgainsMenu(event.currentTarget);
  };

  const uniqueOwner = [];

  campaignsList.forEach((campaign) => {
    if (!uniqueOwner.includes(campaign.owner)) {
      uniqueOwner.push(campaign.owner);
    }
  });

  useEffect(() => {
    setAllCampgainsFilter(campaignNameFilter);
    setAllOwnersFilter(ownerNameFilter);
    setAllCampgainsMenu(null);
  }, [campaignNameFilter, ownerNameFilter]);

  const handleCloseAllCampgainsMenu = (event) => {
    if (event.target.innerText === "") {
      dispatch(leadsFilterCampaignName("All Locations"));
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

  return (
    <React.Fragment>
      <div className="campaign-header-container">
        <div style={{ display: "flex" }} className="left-section">
          <div className="select-container">
            <Button
              id="basic-button"
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
                className="menu-item"
                onClick={handleCloseAllCampgainsMenu}
                sx={{
                  fontSize: matches ? "13px" : "14px",
                }}
              >
                All Locations
              </MenuItem>
              {campaignsList.map((campaign) => {
                return (
                  <MenuItem
                    key={campaign.id}
                    data-id={campaign.id}
                    className="menu-item"
                    onClick={handleCloseAllCampgainsMenu}
                    sx={{
                      fontSize: matches ? "13px" : "14px",
                    }}
                  >
                    {campaign.location}
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
                className="menu-item"
                sx={{
                  fontSize: matches ? "13px" : "14px",
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
                      fontSize: matches ? "13px" : "14px",
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
          <span>
            <AddCampaginModal />
            <Button
              variant="outlined"
              // onClick={exportLeadsToExcel}
              className="export-to-excel-button"
              // disabled={cardsToDisplay.length === 0 ? true : false}
              // style={
              //   cardsToDisplay.length === 0
              //     ? {
              //         pointerEvents: "auto",
              //         cursor: "not-allowed",
              //       }
              //     : {}
              // }
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
