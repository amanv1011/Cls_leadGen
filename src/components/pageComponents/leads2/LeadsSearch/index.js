import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { leadsFilterSearch } from "../../../../redux/actions/leadsFilter";
import "./leadsSearch.scss";
import search from "../../../../assets/icons/search.svg";

const LeadsSearch = () => {
  const dispatch = useDispatch();

  const [SearchInput, setSearchInput] = useState("");

  const handleSearch = async (event) => {
    await setSearchInput(event.target.value);
    if (event.target.value.length > 2) {
      dispatch(leadsFilterSearch(event.target.value));
    } else if (event.target.value.length === 0) {
      dispatch(leadsFilterSearch(""));
    }
  };

  return (
    <div className="lead-search">
      <input
        placeholder={`Search`}
        onChange={handleSearch}
        type="text"
        value={SearchInput}
        className="search-box"
      />
      <img src={search} alt="search" className="search-icon" />
    </div>
  );
};

export default LeadsSearch;
