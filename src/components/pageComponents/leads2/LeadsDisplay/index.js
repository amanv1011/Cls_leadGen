import React, { useState, useEffect } from "react";
import LeadsCheckbox from "../LeadsCheckbox";
import "./leadsDisplay.scss";
import { useDispatch } from "react-redux";
import { getPopupEnable } from "../../../../redux/actions/PopupAction";
import LeadsMenu from "../LeadsMenu";

const LeadsDisplay = ({ leadsList, selectedLeadIdFun }) => {
  const dispatch = useDispatch();

  const [leadsListData, setLeadsListData] = useState([]);

  useEffect(() => {
    setLeadsListData(leadsList);
  }, [leadsList]);

  const handleClick = (leadId) => {
    let leadsIdData = leadsList.filter((ele) => ele.id === leadId);
    selectedLeadIdFun(leadsIdData[0].id);
    dispatch(getPopupEnable(leadsIdData));
  };

  const handleOnCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (name === "allCheck") {
      let tempLeadsArray = leadsListData.map((lead) => ({
        ...lead,
        isChecked: checked,
      }));
      setLeadsListData(tempLeadsArray);
    } else {
      let tempLeadsArray = leadsListData.map((lead) =>
        lead.id === name ? { ...lead, isChecked: checked } : lead
      );
      setLeadsListData(tempLeadsArray);
    }
  };

  console.log("leadsListData", leadsListData);

  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <input
            type="checkbox"
            name="allCheck"
            checked={
              leadsListData.filter((lead) => lead?.isChecked !== true).length <
              1
            }
            onChange={handleOnCheckboxChange}
          />
          <label>All</label>
        </div>
        <LeadsMenu />
      </div>
      <div className="lead-display-container">
        {leadsListData &&
          leadsListData.map((lead) => (
            <div className="lead-display-subcontainers" key={lead.id}>
              <div className="lead-display-subcontainer1">
                <input
                  type="checkbox"
                  name={lead.id}
                  checked={lead?.isChecked || false}
                  onChange={handleOnCheckboxChange}
                />
                <p
                  className="lead-display-btn-text"
                  onClick={() => handleClick(lead.id)}
                >
                  {lead.title && lead.title.slice(0, 15)}
                </p>
                <p>Gene</p>
              </div>
              <div className="lead-display-subcontainer2">
                <p>{lead.companyName === null ? "NA" : lead.companyName}</p>
              </div>
            </div>
          ))}
      </div>
    </React.Fragment>
  );
};

export default LeadsDisplay;
