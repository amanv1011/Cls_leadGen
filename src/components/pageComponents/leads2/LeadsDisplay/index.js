import React from "react";
import LeadsCheckbox from "../LeadsCheckbox";
import "./leadsDisplay.scss";
import { useDispatch } from "react-redux";
import { getPopupEnable } from "../../../../redux/actions/PopupAction";

const LeadsDisplay = ({ leadsList, selectedLeadIdFun, selectedLeadId }) => {
  const dispatch = useDispatch();

  const handleClick = (leadId) => {
    let leadsIdData = leadsList.filter((ele) => ele.id === leadId);
    selectedLeadIdFun(leadsIdData[0].id);
    dispatch(getPopupEnable(leadsIdData));
  };

  return (
    <React.Fragment>
      <div className="lead-display-container">
        {leadsList &&
          leadsList.map((lead) => (
            <div
              className={`lead-display-subcontainers ${
                selectedLeadId === lead.id ? "selected" : ""
              } `}
              onClick={() => handleClick(lead.id)}
              key={lead.id}
            >
              <div className="lead-display-check">
                <LeadsCheckbox />
              </div>
              <div
                className={`lead-display-subcontainer1 ${
                  selectedLeadId === lead.id ? "selected" : ""
                }`}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    className={`lead-display-btn-textl ${
                      selectedLeadId === lead.id ? "selected" : ""
                    }`}
                  >
                    {lead.title.slice(0, 15)}
                  </span>
                  <span
                    className={`lead-display-timestamp ${
                      selectedLeadId === lead.id ? "selected-sub" : ""
                    } `}
                  >
                    3 Sec ago
                  </span>
                </div>

                <div
                  className={`lead-display-subcontainer2 ${
                    selectedLeadId === lead.id ? "selected-sub" : ""
                  }`}
                >
                  <p>{lead.companyName === null ? "NA" : lead.companyName}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </React.Fragment>
  );
};

export default LeadsDisplay;
