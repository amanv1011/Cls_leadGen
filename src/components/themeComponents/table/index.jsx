import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React, { useState } from "react";
import Status from "./status";
import "./table.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import moment from "moment";
import { useSelector } from "react-redux";

const Table = (props) => {
  let [currentSort, setCurrentSort] = useState("startdefault");
  let leadData = props.leadData;

  const GenratedleadData1 = useSelector((state) => state.allLeads.leadsList);
  const blockedCompaniesList = useSelector(
    (state) => state.blockedCompaniesReducer.blockedCompainesList
  );

  let array1 = [];

  blockedCompaniesList.length > 0 &&
    blockedCompaniesList.map((blocked) =>
      blocked.leadId.map((item) => array1.push(item))
    );

  let GenratedleadData = GenratedleadData1.filter(function (item) {
    return !array1.includes(item.id);
  }).filter((lead) => lead.companyName !== null);

  leadData.forEach((element) => {
    let leadsCount = 0;
    GenratedleadData.map((ele) => {
      if (element.id === ele.campaignId) {
        leadsCount++;
      }
    });
    element.leadsNo = leadsCount;
  });

  const sortTypes = {
    startup: {
      class: "sort-up",
      fn: (a, b) => a.start_date.seconds - b.start_date.seconds,
    },
    endup: {
      class: "sort-up",
      fn: (a, b) => a.end_date.seconds - b.end_date.seconds,
    },
    leadsup: {
      class: "sort-up",
      fn: (a, b) => a.leadsNo - b.leadsNo,
    },
    statussup: {
      class: "sort-up",
      fn: (a, b) => a.status - b.status,
    },
    startdown: {
      class: "sort-down",
      fn: (a, b) => b.start_date.seconds - a.start_date.seconds,
    },
    enddown: {
      class: "sort-down",
      fn: (a, b) => b.end_date.seconds - a.end_date.seconds,
    },
    leadsdown: {
      class: "sort-down",
      fn: (a, b) => b.leadsNo - a.leadsNo,
    },
    statusdown: {
      class: "sort-down",
      fn: (a, b) => b.status - a.status,
    },
    startdefault: {
      class: "sort",
      fn: (a, b) => a,
    },
    enddefault: {
      class: "sort",
      fn: (a, b) => a,
    },
    leadsdefault: {
      class: "sort",
      fn: (a, b) => a,
    },
    statusdefault: {
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

  const onSortLeads = () => {
    let nextSort;
    if (currentSort === "leadsdown") nextSort = "leadsup";
    else if (currentSort === "leadsup") nextSort = "leadsdefault";
    else if (currentSort === "leadsdefault") nextSort = "leadsdown";
    else if (currentSort === "leadsup" || "leadsdown" || "leadsdefault")
      nextSort = "leadsdefault";
    setCurrentSort(nextSort);
  };

  const onSortStatus = () => {
    let nextSort;
    if (currentSort === "statusdown") nextSort = "statussup";
    else if (currentSort === "statusup") nextSort = "statusdefault";
    else if (currentSort === "statusdefault") nextSort = "statusdown";
    else if (currentSort === "statusup" || "statusdown" || "statusdefault")
      nextSort = "statusdefault";
    setCurrentSort(nextSort);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p className="table-heading" style={{ padding: "17px 20px 15px 20px" }}>
          My Campaign(s)
        </p>
        <MoreVertIcon
          sx={{ color: "#1F4173" }}
          style={{ marginTop: "20px", paddingRight: "20px" }}
        />
      </div>
      <div className="table-scroll">
        <table className="table-main" width="100%">
          <thead
            style={{
              backgroundColor: "#FAFAFA",
              position: "sticky",
              top: "0",
              zIndex: "1",
            }}
          >
            <tr className="table-header-row">
              <th
                style={{ paddingLeft: "20px" }}
                className="table-header-row-data"
              >
                Campaign
              </th>
              <th
                className="table-header-row-data"
                style={{ cursor: "pointer" }}
                onClick={onSortLeads}
              >
                No. of Leads
              </th>
              <th
                className="table-header-row-data"
                style={{ cursor: "pointer" }}
                onClick={onSortStart}
              >
                Start Date
                <KeyboardArrowDownIcon
                  viewBox="0 0 30 10"
                  style={{ width: "16px", height: "16px" }}
                />
              </th>
              <th
                className="table-header-row-data"
                style={{ cursor: "pointer" }}
                onClick={onSortEnd}
              >
                End Date
                <KeyboardArrowDownIcon
                  viewBox="0 0 30 10"
                  style={{ width: "16px", height: "16px" }}
                />
              </th>
              <th
                className="table-header-row-data"
                style={{ cursor: "pointer" }}
                onClick={onSortStatus}
              >
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

                var startDate = moment
                  .unix(timestampStart)
                  .format("MM/DD/YYYY");
                var endDate = moment.unix(timestampEnd).format("MM/DD/YYYY");
              }

              return (
                <tr key={element.id} className="table-body-row">
                  <td
                    style={{ paddingLeft: "20px" }}
                    className="table-body-row-data"
                  >
                    {element.name}
                  </td>
                  <td className="table-body-row-data">{element.leadsNo}</td>
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
