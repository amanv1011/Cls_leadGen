import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import { Divider } from "@mui/material";
import CampaignHeader from "./CampaignHeader";
import CampaignSearch from "./CampaignSearch";
import CampaignDisplay from "./CampaignDisplay";
import CampaignDescription from "./CampaignDescription";
import "./campaign.scss";

const Campaign = () => {
  const campaignsListData = useSelector(
    (state) => state.allCampaigns.campaignList
  );
  const campaignDocData = useSelector(
    (state) => state.allCampaigns.campaignDoc
  );
  const leadsListData = useSelector((state) => state.allLeads.leadsList);
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
  const campgaignId = useSelector(
    (state) => state.allCampaigns.a__campgaign__Id
  );

  const allUsers = useSelector((state) => state.users.users);
  const [campaignsList, setCampaignList] = useState([]);
  const [campaignDoc, setCampaignDoc] = useState([]);
  const [leadsList, setLeadsList] = useState([]);

  // useEffect(() => {
  //   dispatch(campaignActions.getAllCampaignsAction());
  //   // dispatch(getAllLeadsAction());
  //   // dispatch(getLeadsFullDescriptionAction());
  // }, [campaignsListData, campaignDocData, leadsListData]);

  useEffect(() => {
    setCampaignList(campaignsListData);
    setCampaignDoc(campaignDocData);
    setLeadsList(leadsListData);
  }, [campaignsListData, campaignDocData, leadsListData]);

  return (
    <Box component="div" className="campaign-container">
      <Box component={"div"} className="campaign-header">
        <CampaignHeader
          campaignsList={campaignsList}
          searchedCampaignList={searchedCampaignList}
          leadsList={leadsList}
        />
      </Box>
      <Divider
        light={true}
        sx={{
          height: "1px",
          background: "#1F4173",
          opacity: "0.15",
        }}
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
            campgaignId={campgaignId}
          />
        </Box>
        <Box component={"div"} className="section campaign-details">
          <CampaignDescription
            campaignDoc={campaignDoc}
            campgaignId={campgaignId}
            leadsList={leadsList}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Campaign;
