import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as campaignActions from "../../../../redux/actions/campaignActions";
import * as paginationActions from "../../../../redux/actions/paginationActions";
import "./campaignSearch.scss";

const CampaignSearch = ({ campaignsList, searchValue }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    searchingTable(searchValue);
    dispatch(paginationActions.setActivePage(1));
  }, [searchValue]);

  useEffect(() => {
    dispatch(campaignActions.getSearchedCampaignList(campaignsList));
  }, [campaignsList]);

  const keysInJSON = ["name", "location", "owner"];

  const searchingTable = (searchTerm) => {
    const lowerCasedValue = searchTerm.toLowerCase().trim();
    let filteredData = [];
    if (lowerCasedValue === "") {
      dispatch(campaignActions.getSearchedCampaignList(campaignsList));
    } else {
      filteredData = campaignsList.filter((item) => {
        return keysInJSON.some((key) =>
          item[key].toString().toLowerCase().includes(lowerCasedValue)
        );
      });
      dispatch(campaignActions.getSearchedCampaignList(filteredData));
    }
  };

  return (
    <React.Fragment>
      <input
        type={"text"}
        placeholder={"Search"}
        isSearch={true}
        onChange={(event) => {
          dispatch(campaignActions.searchInputValueAction(event.target.value));
          searchingTable(searchValue);
        }}
        className="campaign-search"
        autoComplete="off"
      />
    </React.Fragment>
  );
};

export default CampaignSearch;
