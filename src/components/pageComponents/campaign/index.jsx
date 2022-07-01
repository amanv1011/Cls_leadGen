import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/system";
import { Divider } from "@mui/material";
import CampaignHeader from "./CampaignHeader";
import CampaignSearch from "./CampaignSearch";
import CampaignDisplay from "./CampaignDisplay";
import CampaignDescription from "./CampaignDescription";
import * as campaignActions from "../../../redux/actions/campaignActions";
import * as campaignCountActions from "../../../redux/actions/campaignCountActions";
import "./campaign.scss";

const Campaign = () => {
  const dispatch = useDispatch();

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
  const campaignStateFilterValue = useSelector(
    (state) => state.campaignFilters.campaignState
  );
  const countryList = useSelector((state) => state.country.countryList);

  const assignedCampaigns = useSelector(
    (state) => state.allCampaigns.assignedCampaigns
  );
  const campaignViewStatus = useSelector(
    (state) => state.allCampaigns.campaignViewStatus
  );
  const lastCrawledDateList = useSelector(
    (state) => state.lastCrawledDateList.lastCrawledDateList
  );

  const allCamapignsCount = useSelector(
    (state) => state.campaignsCount.allCamapignsCount
  );
  const activeCamapignsCount = useSelector(
    (state) => state.campaignsCount.activeCamapignsCount
  );
  const inActiveCamapignsCount = useSelector(
    (state) => state.campaignsCount.inActiveCamapignsCount
  );

  useEffect(() => {
    dispatch(campaignCountActions.getAllCampaignsCountAction(campaignsList));
    const activeCampaigns = campaignsList.filter(
      (campaign) => campaign?.status === 1
    );
    dispatch(
      campaignCountActions.getActiveCampaignsCountAction(activeCampaigns)
    );
    const inActiveCampaigns = campaignsList.filter(
      (campaign) => campaign?.status === 0
    );
    dispatch(
      campaignCountActions.getInActiveCampaignsCountAction(inActiveCampaigns)
    );
  }, [campaignsList]);

  const [campaignsListData, setcampaignsListData] = useState([]);

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedArray, setselectedArray] = useState([]);

  useEffect(() => {
    setSelectedUsers([]);
    if (assignedCampaigns && campaignDoc && campaignDoc.id) {
      assignedCampaigns.forEach((assignedCampaign) => {
        if (assignedCampaign.campaignId === campaignDoc.id) {
          let selectedId = assignedCampaign.userId;
          const filteredArray = allUsers.filter((value) =>
            selectedId.includes(value.userId)
          );
          setSelectedUsers(filteredArray);
        }
      });
    }
  }, [campaignDoc]);

  const onChangeOption = async (e, option) => {
    setSelectedUsers(option);
    let arr = [];
    option &&
      option.forEach((e) => {
        arr.push(e.userId);
      });
    await dispatch(
      campaignActions.assignCampaignToUsersAction([campaignDoc.id], arr)
    );
    await dispatch(campaignActions.getAssignedCampaignsAction());
  };

  return (
    <Box component="div" className="campaign-container">
      <Box component={"div"} className="campaign-header">
        <CampaignHeader
          campaignsList={campaignsList}
          searchedCampaignList={searchedCampaignList}
          leadsList={leadsList}
          countryList={countryList}
          allUsers={allUsers}
          campgaignId={campgaignId}
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
              campaignsListData={campaignsListData}
              searchValue={searchValue}
              countryFilterValue={countryFilterValue}
              searchedCampaignList={searchedCampaignList}
              ownerFilterValue={ownerFilterValue}
              campaignStateFilterValue={campaignStateFilterValue}
              campgaignId={campgaignId}
            />
          </div>
          <CampaignDisplay
            campaignsListData={campaignsListData}
            setcampaignsListData={setcampaignsListData}
            campaignDoc={campaignDoc}
            campaignsList={campaignsList}
            searchValue={searchValue}
            searchedCampaignList={searchedCampaignList}
            campaignLoader={campaignLoader}
            leadsList={leadsList}
            countryFilterValue={countryFilterValue}
            ownerFilterValue={ownerFilterValue}
            campaignStateFilterValue={campaignStateFilterValue}
            selectedUsersForFilter={selectedUsers}
            options={allUsers}
            assignedCampaigns={assignedCampaigns}
            campaignViewStatus={campaignViewStatus}
            campgaignId={campgaignId}
            selectedArray={selectedArray}
            setselectedArray={setselectedArray}
            allCamapignsCount={allCamapignsCount}
            activeCamapignsCount={activeCamapignsCount}
            inActiveCamapignsCount={inActiveCamapignsCount}
          />
        </Box>
        <Box component={"div"} className="section campaign-details">
          <CampaignDescription
            campaignDoc={campaignDoc}
            campaignsListData={campaignsListData}
            searchedCampaignList={searchedCampaignList}
            campgaignId={campgaignId}
            leadsList={leadsList}
            countryList={countryList}
            allUsers={allUsers}
            onChangeOption={onChangeOption}
            selectedUsers={selectedUsers}
            lastCrawledDateList={lastCrawledDateList}
            selectedArray={selectedArray}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Campaign;
