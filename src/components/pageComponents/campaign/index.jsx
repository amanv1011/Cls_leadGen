import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import { Divider } from "@mui/material";
import CampaignHeader from "./CampaignHeader";
import CampaignSearch from "./CampaignSearch";
import CampaignDisplay from "./CampaignDisplay";
import CampaignDescription from "./CampaignDescription";
import "./campaign.scss";
import Table from "./../../themeComponents/campTable/Table";

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

  const campgaignId = useSelector(
    (state) => state.allCampaigns.a__campgaign__Id
  );
  const allUsers = useSelector((state) => state.users.users);

  const countryFilterValue = useSelector(
    (state) => state.campaignFilters.country
  );
  const ownerFilterValue = useSelector((state) => state.campaignFilters.owner);
  const countryList = useSelector((state) => state.country.countryList);

  return (
    <Box component="div" className="campaign-container">
      <Box component={"div"} className="campaign-header">
        <CampaignHeader
          campaignsList={campaignsList}
          searchedCampaignList={searchedCampaignList}
          leadsList={leadsList}
          countryList={countryList}
          allUsers={allUsers}
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
              countryFilterValue={countryFilterValue}
              searchedCampaignList={searchedCampaignList}
              ownerFilterValue={ownerFilterValue}
            />
          </div>
          <CampaignDisplay
            campaignDoc={campaignDoc}
            searchValue={searchValue}
            searchedCampaignList={searchedCampaignList}
            campaignLoader={campaignLoader}
            leadsList={leadsList}
            countryFilterValue={countryFilterValue}
            ownerFilterValue={ownerFilterValue}
          />
        </Box>
        <Box component={"div"} className="section campaign-details">
          <CampaignDescription
            campaignDoc={campaignDoc}
            campgaignId={campgaignId}
            leadsList={leadsList}
            allUsers={allUsers}
            countryList={countryList}
          />
        </Box>
      </Box>
      <Table />
    </Box>
  );
};

export default Campaign;
