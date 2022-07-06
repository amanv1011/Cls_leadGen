import React, { useState, useEffect } from "react";
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
  setCampaignsListData,
  campaignsListData,
  countryFilterValue,
  ownerFilterValue,
  campaignStateFilterValue,
  allUsers,
  assignedCampaigns,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(campaignActions.getSearchedCampaignList(campaignsList));
  }, [campaignsList]);

  const keysInJSON = ["name", "location", "owner"];
  return (
    <React.Fragment>
      {/* <Tooltip title={"Search the campaign by name, location and owner"}> */}
      <div className="campaign-search">
        <input
          placeholder="Search by campaign name & location"
          autoComplete="off"
          disabled={campgaignId ? true : false}
          onChange={(event) => {
            dispatch(
              campaignActions.searchInputValueAction(event.target.value)
            );
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
