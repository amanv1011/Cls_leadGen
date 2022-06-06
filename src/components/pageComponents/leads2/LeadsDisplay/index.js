import React from "react";
import LeadsCheckbox from "../LeadsCheckbox";
import "./leadsDisplay.scss";
import { useSelector, useDispatch } from "react-redux";
import { getPopupEnable } from "../../../../redux/actions/PopupAction";

const LeadsDisplay = ({ setselectedLead }) => {
  const dispatch = useDispatch();
  const leadsList = useSelector((state) => state.allLeads.cardsToDisplay);

  const handleClick = (leadId) => {
    setselectedLead(leadId);
    let leadsIdData = leadsList.filter((ele) => ele.id === leadId);
    dispatch(getPopupEnable(leadsIdData));
  };

  return (
    <React.Fragment>
      <div className="lead-display-container">
        {leadsList.map((lead) => (
          <div
            className="lead-display-subcontainers"
            onClick={() => handleClick(lead.id)}
            key={lead.id}
          >
            <div className="lead-display-subcontainer1">
              <LeadsCheckbox />
              <p className="lead-display-btn-text">{lead.title.slice(0, 15)}</p>
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
