import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as campaignActions from "../../../../redux/actions/campaignActions";
import * as campaignCountActions from "../../../../redux/actions/campaignCountActions";
import search from "../../../../assets/icons/search.svg";
import "./campaignSearch.scss";
import { Tooltip } from "@mui/material";

const CampaignSearch = ({
  campaignsList,
  searchValue,
  campgaignId,
  campaignsListData,
  countryFilterValue,
  ownerFilterValue,
  campaignStateFilterValue,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    searchingTable(searchValue);
  }, [searchValue]);

  useEffect(() => {
    dispatch(campaignActions.getSearchedCampaignList(campaignsList));
  }, [campaignsList]);

  useEffect(() => {
    // dispatch(campaignActions.getSearchedCampaignList(campaignsList));
  }, [campaignsList]);

  const keysInJSON = ["name", "location", "owner"];

  const searchingTable = (searchTerm) => {
    const lowerCasedValue = searchTerm.toLowerCase().trim();
    let filteredData = [];

    if (lowerCasedValue === "") {
      dispatch(campaignActions.getSearchedCampaignList(campaignsList));
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
    } else {
      filteredData = campaignsList.filter((item) => {
        return keysInJSON.some((key) =>
          item[key].toString().toLowerCase().includes(lowerCasedValue)
        );
      });
      dispatch(campaignCountActions.getAllCampaignsCountAction(filteredData));
      dispatch(
        campaignCountActions.getActiveCampaignsCountAction(
          filteredData.filter((campaign) => campaign?.status === 1)
        )
      );
      dispatch(
        campaignCountActions.getInActiveCampaignsCountAction(
          filteredData.filter((campaign) => campaign?.status === 0)
        )
      );
      dispatch(campaignActions.getSearchedCampaignList(filteredData));
    }
  };

  return (
    <React.Fragment>
      {/* <Tooltip title={"Search the campaign by name, location and owner"}> */}
      <div className="campaign-search">
        <input
          placeholder="Search by name, location and owner"
          autoComplete="off"
          disabled={campgaignId ? true : false}
          onChange={(event) => {
            dispatch(
              campaignActions.searchInputValueAction(event.target.value)
            );
            searchingTable(searchValue);
          }}
          type="text"
          value={searchValue}
          className="search-box"
        />
        <img src={search} alt="search" className="search-icon" />
      </div>
      {/* </Tooltip> */}
    </React.Fragment>
  );
};

export default CampaignSearch;
