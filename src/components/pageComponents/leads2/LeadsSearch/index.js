import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { leadsFilterSearch } from "../../../../redux/actions/leadsFilter";
import "../../leads/leads.scss";

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
        placeholder={`Search for "Keywords"`}
        onChange={handleSearch}
        type="text"
        value={SearchInput}
        className="search-input-leads"
        style={{
          width: "100%",
          height: "40px",
          borderRadius: "10px",
          backgroundColor: "#E7E7E7",
          border: "none",
          fontWeight: "600",
          color: "rgba(92, 117,154)",
          fontSize: "14px",
          paddingLeft: "10px",
          minWidth: "158px",
          maxWidth: "300px",
        }}
      />
    </React.Fragment>
  );
};

export default LeadsSearch;
