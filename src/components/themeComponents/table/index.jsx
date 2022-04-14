import { Box } from "@mui/material";
import { display } from "@mui/system";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import React, { useState } from "react";
import Status from "./status";
import "./table.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import moment from "moment";
import { useSelector } from "react-redux";

const Table = (props) => {
  let [currentSort, setCurrentSort] = useState("startdefault");
  let [sortColumn, setSortColumn] = useState();
  let leadData = props.leadData;
  const GenratedleadData = useSelector((state) => state.allLeads.leadsList);

  const sortTypes = {
    startup: {
      class: "sort-up",
      fn: (a, b) => a.start_date.seconds - b.start_date.seconds,
    },
    endup: {
      class: "sort-up",
      fn: (a, b) => a.end_date.seconds - b.end_date.seconds,
    },
    startdown: {
      class: "sort-down",
      fn: (a, b) => b.start_date.seconds - a.start_date.seconds,
    },
    enddown: {
      class: "sort-down",
      fn: (a, b) => b.end_date.seconds - a.end_date.seconds,
    },
    startdefault: {
      class: "sort",
      fn: (a, b) => a,
    },
    enddefault: {
      class: "sort",
      fn: (a, b) => a,
    },
  };

  const onSortStart = () => {
    let nextSort;

    if (currentSort === "startdown") nextSort = "startup";
    else if (currentSort === "startup") nextSort = "startdefault";
    else if (currentSort === "startdefault") nextSort = "startdown";
    else if (currentSort === "endup" || "enddown" || "enddefault")
      nextSort = "startdefault";

    setCurrentSort(nextSort);
  };

  const onSortEnd = () => {
    let nextSort;

    if (currentSort === "enddown") nextSort = "endup";
    else if (currentSort === "endup") nextSort = "enddefault";
    else if (currentSort === "enddefault") nextSort = "enddown";
    else if (currentSort === "startup" || "startdown" || "startdefault")
      nextSort = "enddefault";

    setCurrentSort(nextSort);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p className="table-heading" style={{ paddingLeft: "20px", paddingTop: "10px" }}>
          My Campaign(s)
        </p>
        <MoreVertIcon
          sx={{ color: "#1F4173" }}
          style={{ marginTop: "20px", paddingRight: "20px" }}
        />
      </div>
      <div className="table-scroll">
        <table className="table-main" width="100%">
          <thead style={{ backgroundColor: "#FAFAFA" }}>
            <tr className="table-header-row">
              <th
                style={{ paddingLeft: "20px" }}
                className="table-header-row-data"
              >
                Campaign
              </th>
              <th className="table-header-row-data">No. of Leads</th>
              <th className="table-header-row-data" onClick={onSortStart}>
                Start Date
                <KeyboardArrowDownIcon
                  viewBox="0 0 30 10"
                  style={{ width: "16px", height: "16px" }}
                />
              </th>
              <th className="table-header-row-data" onClick={onSortEnd}>
                End Date
                <KeyboardArrowDownIcon
                  viewBox="0 0 30 10"
                  style={{ width: "16px", height: "16px" }}
                />
              </th>
              <th className="table-header-row-data">
                Status
                <KeyboardArrowDownIcon
                  viewBox="0 0 30 10"
                  style={{ width: "16px", height: "16px" }}
                />
              </th>
              <th className="table-header-row-data">Created By</th>
            </tr>
          </thead>

          <tbody style={{ width: "100%" }}>
            {[...leadData].sort(sortTypes[currentSort].fn).map((element) => {
              {
                let timestampStart = element.start_date.seconds;
                let timestampEnd = element.end_date.seconds;
                var leadsCount = 0;
                var startDate = moment
                  .unix(timestampStart)
                  .format("MM/DD/YYYY");
                var endDate = moment.unix(timestampEnd).format("MM/DD/YYYY");
                GenratedleadData.map((ele) => {
                  if (element.id === ele.campaignId) {
                    leadsCount++;
                  }
                  
                });
              }

              return (
                <tr className="table-body-row">
                  <td
                    style={{ paddingLeft: "20px" }}
                    className="table-body-row-data"
                  >
                    {element.name}
                  </td>
                  <td className="table-body-row-data">{leadsCount}</td>
                  <td className="table-body-row-data">{startDate}</td>
                  <td className="table-body-row-data">{endDate}</td>
                  <td className="table-body-row-data">
                    <Status status={element.status} />
                  </td>
                  <td className="table-body-row-data">{element.owner}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
