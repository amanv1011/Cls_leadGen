import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Lead from "../../commonComponents/lead";
import Approve from "../../commonComponents/lead/Approve";
import Reject from "../../commonComponents/lead/Reject";
import UnderReview from "../../commonComponents/lead/UnderReview";
import Archive from "../../commonComponents/lead/Archive";
import "./leads.scss";
import "../../pageComponents/leads2/leads.scss";
import {
  getAllLeadsAction,
  getAssignedLeadsAction,
  getLeadsFullDescriptionAction,
} from "../../../redux/actions/leadActions";
import {
  getAllCampaignsAction,
  getAssignedCampaignsAction,
} from "../../../redux/actions/campaignActions";
import { getAllUsersAction } from "../../../redux/actions/usersAction";
import { getCountryAction } from "../../../redux/actions/countryActions";
import { getlastCrawledDateAction } from "../../../redux/actions/lastCrawledDateActions";

const Leads = () => {
  const dispatch = useDispatch();
  const leadsDropDownFilter = useSelector(
    (state) => state.leadsFilter.leadsDropDownFilter
  );
  useEffect(() => {
    dispatch(getAssignedLeadsAction());
    dispatch(getAllCampaignsAction());
    dispatch(getAllLeadsAction());
    dispatch(getLeadsFullDescriptionAction());
    dispatch(getAllUsersAction());
    dispatch(getCountryAction());
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

export default memo(Leads);
