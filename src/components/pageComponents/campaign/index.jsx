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
  const campaignSateStatus = useSelector(
    (state) => state.allCampaigns.campaignStateStatus
  );

  const [campaignsListData, setcampaignsListData] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedArray, setselectedArray] = useState([]);

  const ownerNameFilterId = allUsers.filter(
    (user) => user.name === ownerFilterValue
  );

  useEffect(() => {
    console.log("I'm possible");
    if (countryFilterValue === "Country" && ownerFilterValue === "Owner") {
      dispatch(campaignCountActions.getAllCampaignsCountAction(campaignsList));
      dispatch(
        campaignCountActions.getActiveCampaignsCountAction(
          campaignsList.filter((campaign) => campaign?.status === 1)
        )
      );
      dispatch(
        campaignCountActions.getInActiveCampaignsCountAction(
          campaignsList.filter((campaign) => campaign?.status === 0)
        )
      );
      if (campaignStateFilterValue === "AllCampaigns") {
        setcampaignsListData(campaignsList);
      }
      if (campaignStateFilterValue === "activeCampaigns") {
        const activeCampaigns = campaignsList.filter(
          (campaign) => campaign?.status === 1
        );
        setcampaignsListData(activeCampaigns);
      }
      if (campaignStateFilterValue === "inActiveCampaigns") {
        const inActiveCampaigns = campaignsList.filter(
          (campaign) => campaign?.status === 0
        );
        setcampaignsListData(inActiveCampaigns);
      }
    } else if (
      countryFilterValue !== "Country" &&
      ownerFilterValue !== "Owner"
    ) {
      const filteredCampaigns = campaignsList.filter(
        (campaign) =>
          campaign &&
          campaign?.country === countryFilterValue &&
          campaign?.owner === ownerFilterValue
      );
      dispatch(
        campaignCountActions.getAllCampaignsCountAction(filteredCampaigns)
      );
      dispatch(
        campaignCountActions.getActiveCampaignsCountAction(
          filteredCampaigns.filter((campaign) => campaign?.status === 1)
        )
      );
      dispatch(
        campaignCountActions.getInActiveCampaignsCountAction(
          filteredCampaigns.filter((campaign) => campaign?.status === 0)
        )
      );

      if (campaignStateFilterValue === "AllCampaigns") {
        setcampaignsListData(filteredCampaigns);
      } else if (campaignStateFilterValue === "activeCampaigns") {
        const activeCampaigns = filteredCampaigns.filter(
          (campaign) => campaign?.status === 1
        );
        setcampaignsListData(activeCampaigns);
      } else if (campaignStateFilterValue === "inActiveCampaigns") {
        const inActiveCampaigns = filteredCampaigns.filter(
          (campaign) => campaign?.status === 0
        );
        setcampaignsListData(inActiveCampaigns);
      }
    } else if (
      countryFilterValue === "Country" &&
      ownerFilterValue !== "Owner"
    ) {
      const filteredCampaigns = campaignsList.filter(
        (campaign) => campaign && campaign?.owner === ownerFilterValue
      );
      dispatch(
        campaignCountActions.getAllCampaignsCountAction(filteredCampaigns)
      );
      dispatch(
        campaignCountActions.getActiveCampaignsCountAction(
          filteredCampaigns.filter((campaign) => campaign?.status === 1)
        )
      );
      dispatch(
        campaignCountActions.getInActiveCampaignsCountAction(
          filteredCampaigns.filter((campaign) => campaign?.status === 0)
        )
      );

      if (campaignStateFilterValue === "AllCampaigns") {
        setcampaignsListData(filteredCampaigns);
      } else if (campaignStateFilterValue === "activeCampaigns") {
        const activeCampaigns = filteredCampaigns.filter(
          (campaign) => campaign?.status === 1
        );
        setcampaignsListData(activeCampaigns);
      } else if (campaignStateFilterValue === "inActiveCampaigns") {
        const inActiveCampaigns = filteredCampaigns.filter(
          (campaign) => campaign?.status === 0
        );
        setcampaignsListData(inActiveCampaigns);
      }
    } else if (
      countryFilterValue !== "Country" &&
      ownerFilterValue === "Owner"
    ) {
      const filteredCampaigns = campaignsList.filter(
        (campaign) => campaign?.country === countryFilterValue
      );

      dispatch(
        campaignCountActions.getAllCampaignsCountAction(filteredCampaigns)
      );
      dispatch(
        campaignCountActions.getActiveCampaignsCountAction(
          filteredCampaigns.filter((campaign) => campaign?.status === 1)
        )
      );
      dispatch(
        campaignCountActions.getInActiveCampaignsCountAction(
          filteredCampaigns.filter((campaign) => campaign?.status === 0)
        )
      );
      if (campaignStateFilterValue === "AllCampaigns") {
        setcampaignsListData(filteredCampaigns);
      } else if (campaignStateFilterValue === "activeCampaigns") {
        const activeCampaigns = filteredCampaigns.filter(
          (campaign) => campaign?.status === 1
        );
        setcampaignsListData(activeCampaigns);
      } else if (campaignStateFilterValue === "inActiveCampaigns") {
        const inActiveCampaigns = filteredCampaigns.filter(
          (campaign) => campaign?.status === 0
        );
        setcampaignsListData(inActiveCampaigns);
      }
    } else if (
      countryFilterValue !== "Country" &&
      ownerFilterValue !== "Owner"
    ) {
      const filteredCampaigns = campaignsList.filter(
        (campaign) =>
          campaign?.country === countryFilterValue &&
          campaign?.owner === ownerFilterValue
      );
      dispatch(
        campaignCountActions.getAllCampaignsCountAction(filteredCampaigns)
      );
      dispatch(
        campaignCountActions.getActiveCampaignsCountAction(
          filteredCampaigns.filter((campaign) => campaign?.status === 1)
        )
      );
      dispatch(
        campaignCountActions.getInActiveCampaignsCountAction(
          filteredCampaigns.filter((campaign) => campaign?.status === 0)
        )
      );
      if (campaignStateFilterValue === "AllCampaigns") {
        setcampaignsListData(filteredCampaigns);
      } else if (campaignStateFilterValue === "activeCampaigns") {
        const activeCampaigns = filteredCampaigns.filter(
          (campaign) => campaign?.status === 1
        );
        setcampaignsListData(activeCampaigns);
      } else if (campaignStateFilterValue === "inActiveCampaigns") {
        const inActiveCampaigns = filteredCampaigns.filter(
          (campaign) => campaign?.status === 0
        );
        setcampaignsListData(inActiveCampaigns);
      }
    }
    if (countryFilterValue === "Country" && ownerNameFilterId.length > 0) {
      const arr = [];
      assignedCampaigns &&
        ownerNameFilterId &&
        assignedCampaigns.forEach((campaign) => {
          if (campaign.userId.includes(ownerNameFilterId[0]?.userId)) {
            arr.push(campaign.campaignId);
          }
        });
      const filtered = [];
      arr.forEach((assignedCampaign) => {
        campaignsList.forEach((campaign) => {
          if (campaign.id === assignedCampaign) {
            filtered.push(campaign);
          }
        });
      });
      // setcampaignsListData(filtered);
      dispatch(campaignCountActions.getAllCampaignsCountAction(filtered));
      dispatch(
        campaignCountActions.getActiveCampaignsCountAction(
          filtered.filter((campaign) => campaign?.status === 1)
        )
      );
      dispatch(
        campaignCountActions.getInActiveCampaignsCountAction(
          filtered.filter((campaign) => campaign?.status === 0)
        )
      );
      if (campaignStateFilterValue === "AllCampaigns") {
        setcampaignsListData(filtered);
      } else if (campaignStateFilterValue === "activeCampaigns") {
        const activeCampaigns = filtered.filter(
          (campaign) => campaign?.status === 1
        );
        setcampaignsListData(activeCampaigns);
      } else if (campaignStateFilterValue === "inActiveCampaigns") {
        const inActiveCampaigns = filtered.filter(
          (campaign) => campaign?.status === 0
        );
        setcampaignsListData(inActiveCampaigns);
      }
    }
    if (countryFilterValue !== "Country" && ownerNameFilterId.length > 0) {
      const arr = [];
      assignedCampaigns &&
        ownerNameFilterId &&
        assignedCampaigns.forEach((campaign) => {
          if (campaign.userId.includes(ownerNameFilterId[0]?.userId)) {
            arr.push(campaign.campaignId);
          }
        });
      const filtered = [];
      arr.forEach((assignedCampaign) => {
        campaignsList.forEach((campaign) => {
          if (campaign.id === assignedCampaign) {
            filtered.push(campaign);
          }
        });
      });
      const finalFiltered = filtered.filter(
        (campaign) => campaign?.country === countryFilterValue
      );
      dispatch(campaignCountActions.getAllCampaignsCountAction(finalFiltered));
      dispatch(
        campaignCountActions.getActiveCampaignsCountAction(
          finalFiltered.filter((campaign) => campaign?.status === 1)
        )
      );
      dispatch(
        campaignCountActions.getInActiveCampaignsCountAction(
          finalFiltered.filter((campaign) => campaign?.status === 0)
        )
      );
      if (campaignStateFilterValue === "AllCampaigns") {
        setcampaignsListData(finalFiltered);
      } else if (campaignStateFilterValue === "activeCampaigns") {
        const activeCampaigns = finalFiltered.filter(
          (campaign) => campaign?.status === 1
        );
        setcampaignsListData(activeCampaigns);
      } else if (campaignStateFilterValue === "inActiveCampaigns") {
        const inActiveCampaigns = finalFiltered.filter(
          (campaign) => campaign?.status === 0
        );
        setcampaignsListData(inActiveCampaigns);
      }
    }
  }, [campaignDoc]);

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
            setcampaignsListData={setcampaignsListData}
            countryFilterValue={countryFilterValue}
            ownerFilterValue={ownerFilterValue}
            campaignStateFilterValue={campaignStateFilterValue}
            assignedCampaigns={assignedCampaigns}
            campaignsList={campaignsList}
            options={allUsers}
            campaignSateStatus={campaignSateStatus}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Campaign;
