import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Lead from "../../commonComponents/lead";
import Approve from "../../commonComponents/lead/Approve";
import Reject from "../../commonComponents/lead/Reject";
import UnderReview from "../../commonComponents/lead/UnderReview";
import Archive from "../../commonComponents/lead/Archive";
import "./leads.scss";
import "../../pageComponents/leads2/leads.scss";
const Leads = () => {
  const leadsDropDownFilter = useSelector(
    (state) => state.leadsFilter.leadsDropDownFilter
  );

  return (
    <React.Fragment>
      {leadsDropDownFilter === "AllLeads" ? (
        <>
          <Lead />
        </>
      ) : leadsDropDownFilter === "ApprovedLeads" ? (
        <>
          <Approve />
        </>
      ) : leadsDropDownFilter === "RejectedLeads" ? (
        <>
          <Reject />
        </>
      ) : leadsDropDownFilter === "RejectedLeads" ? (
        <>
          <Reject />
        </>
      ) : leadsDropDownFilter === "UnderReveiwLeads" ? (
        <>
          <UnderReview />
        </>
      ) : leadsDropDownFilter === "ArcheievdLeads" ? (
        <>
          <Archive />
        </>
      ) : null}
    </React.Fragment>
  );
};

export default Leads;
