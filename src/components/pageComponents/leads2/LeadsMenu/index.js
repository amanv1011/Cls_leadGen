import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { leadsDropDownFilterAction } from "../../../../redux/actions/leadsFilter";
import "./leadsMenu.scss";

const LeadsMenu = () => {
  const dispatch = useDispatch();

  const leadsAllCount = useSelector(
    (state) => state.approveRejectCount.allCount
  );
  const leadsAprrovedCount = useSelector(
    (state) => state.approveRejectCount.approveCount
  );
  const leadsUnderReviewCount = useSelector(
    (state) => state.approveRejectCount.underreviewCount
  );
  const leadsRejectedCount = useSelector(
    (state) => state.approveRejectCount.rejectCount
  );
  const leadsArchievedCount = useSelector(
    (state) => state.approveRejectCount.archieveCount
  );
  const leadsDropDownFilter = useSelector(
    (state) => state.leadsFilter.leadsDropDownFilter
  );

  return (
    <select
      value={leadsDropDownFilter}
      onChange={(event) => {
        dispatch(leadsDropDownFilterAction(event.target.value));
      }}
      className="menu-select"
    >
      <option
        className="menu-option"
        value="AllLeads"
      >{`All Leads(${leadsAllCount})`}</option>
      <option
        className="menu-option"
        value="UnderReveiwLeads"
      >{`UnderReveiw (${leadsUnderReviewCount})`}</option>
      <option
        className="menu-option"
        value="ApprovedLeads"
      >{`Approved (${leadsAprrovedCount})`}</option>
      <option
        className="menu-option"
        value="RejectedLeads"
      >{`Rejected (${leadsRejectedCount})`}</option>
      <option
        className="menu-option"
        value="ArcheievdLeads"
      >{`Archieved (${leadsArchievedCount})`}</option>
    </select>
  );
};
export default LeadsMenu;
