import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/system";
import { Divider } from "@mui/material";
import CampaignHeader from "./CampaignHeader";
import CampaignSearch from "./CampaignSearch";
import CampaignDisplay from "./CampaignDisplay";
import CampaignDescription from "./CampaignDescription";
import IAutocomplete from "../../themeComponents/autocomplete/autocomplete";
import * as campaignActions from "../../../redux/actions/campaignActions";
import CampaignButtonActions from "./CampaignButtonActions";
import "./campaign.scss";

const Campaign = () => {
  const dispatch = useDispatch();
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

  const onChangeOption = (e, option) => {
    console.log(option);
    if (campaignDoc && campaignDoc.id.length > 0 && option && option.empId) {
      //assign user to leadId here
      console.log("campaignDoc.id", campaignDoc.id);
      dispatch(
        campaignActions.assignCampaignToUsersAction(
          campaignDoc.id,
          option.empId
        )
      );
    }
  };
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
          />
        </Box>
        <Box component={"div"} className="section campaign-details">
          <CampaignDescription
            campaignDoc={campaignDoc}
            campgaignId={campgaignId}
            leadsList={leadsList}
          />
        </Box>
        <Box component={"div"} className="section campaign-actions">
          <Box className="autocomplete-container">
            <Box
              className="autocomplete-title"
              style={{
                width: "75px",
                height: "17px",
                fontStyle: "normal",
                fontWeight: "600",
                fontSize: "14px",
                lineHeight: "17px",
                color: "rgba(31, 65, 115, 0.7)",
                marginBottom: "12px",
              }}
            >
              Assign To
            </Box>
            <IAutocomplete options={allUsers} onChangeOption={onChangeOption} />
          </Box>

          <Box component={"div"} className="action-buttons">
            <CampaignButtonActions
              campaignDoc={campaignDoc}
              campgaignId={campgaignId}
              leadsList={leadsList}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Campaign;
