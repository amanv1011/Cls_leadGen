import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { leadsFilterSearch } from "../../../../redux/actions/leadsFilter";
import "./leadsSearch.scss";

const LeadsSearch = () => {
  const dispatch = useDispatch();

  const [SearchInput, setSearchInput] = useState("");

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
    if (event.target.value.length > 1) {
      dispatch(leadsFilterSearch(event.target.value));
    }
  };

  return (
    <React.Fragment>
      <input
        placeholder={`Search`}
        onChange={handleSearch}
        type="text"
        value={SearchInput}
        className="leadsSearch"
      />
    </React.Fragment>
  );
};

export default LeadsSearch;
