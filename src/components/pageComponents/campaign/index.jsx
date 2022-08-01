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
import {
  getAllLeadsAction,
  getLeadsFullDescriptionAction,
} from "../../../redux/actions/leadActions";
import { getCountryAction } from "../../../redux/actions/countryActions";
import { getlastCrawledDateAction } from "../../../redux/actions/lastCrawledDateActions";
import * as campaignFilterActions from "../../../redux/actions/campaignFilterActions";
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
  const campaignSateStatus = useSelector(
    (state) => state.allCampaigns.campaignStateStatus
  );
  const loggedInUser = useSelector(
    (state) => state.getLoggedInUserAction.loggedInUser
  );

  const [campaignsListData, setCampaignsListData] = useState([]);
  const [campaignDocument, setCampaignDocument] = useState({});
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedArray, setselectedArray] = useState([]);
  const [selectedBatchAssignUsers, setSelectedBatchAssignUsers] = useState([]);

  useEffect(() => {
    dispatch(campaignActions.getAllCampaignsAction());
    dispatch(getAllLeadsAction());
    dispatch(getLeadsFullDescriptionAction());
    dispatch(getCountryAction());
    dispatch(campaignActions.getAssignedCampaignsAction());
    dispatch(getlastCrawledDateAction());
    dispatch(campaignFilterActions.campaignFilterClearAction());
  }, []);

  // useEffect(() => {
  //   dispatch(campaignActions.getAssignedCampaignsAction());
  // }, [assignedCampaigns]);

  useEffect(() => {
    setCampaignsListData(campaignsList);
  }, [campaignsList]);

  useEffect(() => {
    setCampaignDocument(campaignDoc);
  }, [campaignDoc]);

  useEffect(() => {
    if (
      countryFilterValue === "Country" &&
      ownerFilterValue === "Owner" &&
      searchValue === ""
    ) {
      dispatch(campaignCountActions.getAllCampaignsCountAction(campaignsList));
      dispatch(
        campaignCountActions.getActiveCampaignsCountAction(
          campaignsList?.filter((campaign) => campaign?.status === 1)
        )
      );
      dispatch(
        campaignCountActions.getInActiveCampaignsCountAction(
          campaignsList?.filter((campaign) => campaign?.status === 0)
        )
      );
      if (campaignStateFilterValue === "AllCampaigns") {
        setCampaignsListData(campaignsList);
      }
      if (campaignStateFilterValue === "activeCampaigns") {
        setCampaignsListData(
          campaignsList?.filter((campaign) => campaign?.status === 1)
        );
      }
      if (campaignStateFilterValue === "inActiveCampaigns") {
        setCampaignsListData(
          campaignsList?.filter((campaign) => campaign?.status === 0)
        );
      }
    }
  }, [campaignsList]);

  useEffect(() => {
    setSelectedUsers([]);
    if (assignedCampaigns && campaignDocument && campaignDocument.id) {
      assignedCampaigns.forEach((assignedCampaign) => {
        if (assignedCampaign.campaignId === campaignDocument.id) {
          let selectedId = assignedCampaign.userId;
          const filteredArray = allUsers?.filter((value) =>
            selectedId.includes(value.userId)
          );
          setSelectedUsers(filteredArray);
        }
      });
    }
  }, [campaignDocument, allUsers, assignedCampaigns]);

  const onChangeOption = async (e, option) => {
    setSelectedUsers(option);
    let arr = [];
    option &&
      option.forEach((e) => {
        arr.push(e.userId);
      });
    await dispatch(
      campaignActions.assignCampaignToUsersAction([campaignDocument.id], arr)
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
              searchValue={searchValue}
              campgaignId={campgaignId}
            />
          </div>
          <CampaignDisplay
            campaignsList={campaignsList}
            campaignsListData={campaignsListData}
            setCampaignsListData={setCampaignsListData}
            campaignDocument={campaignDocument}
            searchValue={searchValue}
            searchedCampaignList={searchedCampaignList}
            campaignLoader={campaignLoader}
            leadsList={leadsList}
            countryFilterValue={countryFilterValue}
            ownerFilterValue={ownerFilterValue}
            campaignStateFilterValue={campaignStateFilterValue}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
            options={allUsers}
            assignedCampaigns={assignedCampaigns}
            campaignViewStatus={campaignViewStatus}
            campgaignId={campgaignId}
            selectedArray={selectedArray}
            setselectedArray={setselectedArray}
            allCamapignsCount={allCamapignsCount}
            activeCamapignsCount={activeCamapignsCount}
            inActiveCamapignsCount={inActiveCamapignsCount}
            loggedInUser={loggedInUser}
            selectedBatchAssignUsers={selectedBatchAssignUsers}
            setSelectedBatchAssignUsers={setSelectedBatchAssignUsers}
          />
        </Box>
        <Box component={"div"} className="section campaign-details">
          <CampaignDescription
            campaignDocument={campaignDocument}
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
            setCampaignsListData={setCampaignsListData}
            countryFilterValue={countryFilterValue}
            ownerFilterValue={ownerFilterValue}
            campaignStateFilterValue={campaignStateFilterValue}
            assignedCampaigns={assignedCampaigns}
            campaignsList={campaignsList}
            options={allUsers}
            campaignSateStatus={campaignSateStatus}
            loggedInUser={loggedInUser}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Campaign;
