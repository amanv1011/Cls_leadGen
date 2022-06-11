import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/system";
import { Divider, Button, Menu, MenuItem } from "@mui/material";
import CampTable from "../../themeComponents/campTable/Table";
import IButton from "../../themeComponents/button";
import DownArrow from "../../pageComponents/leads/DownArrow";
import CampaignHeader from "./CampaignHeader";
import CampaignSearch from "./CampaignSearch";
import CampaignDisplay from "./CampaignDisplay";
import CampaignDescription from "./CampaignDescription";
import * as paginationActions from "../../../redux/actions/paginationActions";
import "./campaign.scss";

const Campaign = () => {
  const campaignsList = useSelector((state) => state.allCampaigns.campaignList);
  const campaignDoc = useSelector((state) => state.allCampaigns.campaignDoc);
  const leadsList = useSelector((state) => state.allLeads.leadsList);
  const searchValue = useSelector(
    (state) => state.allCampaigns.initialSearchValue
  );
  const searchedCampaignList = useSelector(
    (state) => state.allCampaigns.searchedCampaignList
  );
  const campaignLoader = useSelector((state) => state.allCampaigns.loading);
  const currentPage = useSelector((state) => state.paginationStates.activePage);
  const dataPerPage = useSelector(
    (state) => state.paginationStates.dataPerPage
  );

  return (
    <Box component="div" className="campaign-container">
      <Box component={"div"} className="campaign-header">
        <CampaignHeader campaignsList={campaignsList} />
      </Box>
      <Divider
        light={true}
        sx={{ height: "1px", background: "#1F4173", opacity: "0.15" }}
      />
      <Box component={"div"} className="campaign-body">
        <Box component={"div"} className="section campaign-list">
          <div
            style={{
              padding: "2px 12px",
            }}
          >
            <CampaignSearch
              campaignsList={campaignsList}
              searchValue={searchValue}
            />
          </div>
          <CampaignDisplay
            campaignsList={campaignsList}
            campaignDoc={campaignDoc}
            searchValue={searchValue}
            searchedCampaignList={searchedCampaignList}
            campaignLoader={campaignLoader}
            currentPage={currentPage}
            dataPerPage={dataPerPage}
            leadsList={leadsList}
          />
        </Box>
        <Box component={"div"} className="section campaign-details">
          <CampaignDescription
            campaignDoc={campaignDoc}
            // campaignsList={campaignsList}
            // leadsList={campaignsList}
          />
        </Box>
        <Box component={"div"} className="section campaign-actions">
          <Box component={"div"} className="action-title">
            Assign To:
          </Box>

          <div className="select-container">
            <Button
              id="basic-button"
              // onClick={handleClickAllCampgainsMenu}
              className="select-button"
            >
              {/* {allCampaignsFilter} */}
              <span style={{ paddingLeft: "45px", paddingBottom: "3px" }}>
                <DownArrow />
              </span>
            </Button>
            <Menu
              className="menu"
              id="basic-menu"
              // anchorEl={allCampgainsMenu}
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
              // open={openAllCampgainsMenu}
              // onClose={handleCloseAllCampgainsMenu}
            >
              <MenuItem
                className="menu-item"
                // onClick={handleCloseAllCampgainsMenu}
                sx={
                  {
                    // fontSize: matches ? "13px" : "14px",
                  }
                }
              >
                All Campaigns
              </MenuItem>
              Heelo
            </Menu>
          </div>
          <Box component={"div"} className="action-buttons">
            <IButton
              type={"green"}
              name={"Save"}
              children="Save"
              // onclick={approveButton}
              // disabled={
              //   displayLeadData &&
              //   displayLeadData.status &&
              //   displayLeadData.status === 1
              //     ? true
              //     : false
              // }
            />
            <IButton
              type={"yellow"}
              name={"Cancel"}
              children="Cancel"
              // onclick={archieveButton}
              // disabled={
              //   displayLeadData &&
              //   displayLeadData.status &&
              //   displayLeadData.status === 2
              //     ? true
              //     : false
              // }
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Campaign;
