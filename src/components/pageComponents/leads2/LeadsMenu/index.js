import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { leadsDropDownFilterAction } from "../../../../redux/actions/leadsFilter";
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
    >
      <option value="AllLeads">{`All (${leadsAllCount})`}</option>
      <option value="UnderReveiwLeads">{`UnderReveiw (${leadsUnderReviewCount})`}</option>
      <option value="ApprovedLeads">{`Approved (${leadsAprrovedCount})`}</option>
      <option value="RejectedLeads">{`Rejected (${leadsRejectedCount})`}</option>
      <option value="ArcheievdLeads">{`Archieved (${leadsArchievedCount})`}</option>
    </select>
  );
};
export default LeadsMenu;
