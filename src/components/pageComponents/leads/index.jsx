import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Lead from "../../commonComponents/lead";
import Approve from "../../commonComponents/lead/Approve";
import Reject from "../../commonComponents/lead/Reject";
import UnderReview from "../../commonComponents/lead/UnderReview";
import Archive from "../../commonComponents/lead/Archive";
import "./leads.scss";
import "../../pageComponents/leads2/leads.scss";
import { getAssignedLeadsAction } from "../../../redux/actions/leadActions";
const Leads = () => {
  const dispatch = useDispatch();
  const leadsDropDownFilter = useSelector(
    (state) => state.leadsFilter.leadsDropDownFilter
  );
  useEffect(() => {
    dispatch(getAssignedLeadsAction());
  }, []);

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
