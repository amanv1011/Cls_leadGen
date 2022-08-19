import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as campaignActions from "../../../../redux/actions/campaignActions";
import search from "../../../../assets/icons/search.svg";
import "./campaignSearch.scss";

const CampaignSearch = ({ campaignsList, searchValue, campgaignId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(campaignActions.getSearchedCampaignList(campaignsList));
  }, [campaignsList]);

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
