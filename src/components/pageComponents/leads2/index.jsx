import { Divider } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import LeadDescription from "../../commonComponents/leadDescription";
import IButton from "../../themeComponents/button";
import LeadsHeader from "../../themeComponents/header/leadsHeader/leadsHeader";
import "./leads.scss";
import LeadsCheckbox from "./LeadsCheckbox";
import LeadsDisplay from "./LeadsDisplay";
import LeadsMenu from "./LeadsMenu";
import LeadsSearch from "./LeadsSearch";
import { useSelector, useDispatch } from "react-redux";
import { updateLeadStatus } from "../../../redux/actions/leadActions";

const Leads2 = () => {
  //Onkar's Workspace
  const [selectedLead, setselectedLead] = useState("");
  //getting lead details on click of any lead
  const LeadData = useSelector((state) => state.popupStatus.popupData[0]);
  console.log(LeadData && LeadData.status && LeadData.status);

  const approveButton = (event) => {
    dispatch(updateLeadStatus(selectedLead, 1));
  };
  const rejectButton = (event) => {
    dispatch(updateLeadStatus(selectedLead, -1));
  };
  const archieveButton = (event) => {
    dispatch(updateLeadStatus(selectedLead, 2));
  };
  const state = useSelector((state) => state);
  //Onkar's Workspace

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
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Box component="div" className="leads-container">
      <Box component={"div"} className="leads-header">
        <LeadsHeader />
      </Box>
      <Divider
        light={true}
        sx={{ height: "1px", background: "#1F4173", opacity: "0.15" }}
      />
      <Box component={"div"} className="leads-body">
        <Box component={"div"} className="section leads-list">
          <LeadsSearch />
          <Box component={"div"} className="section checkbox-menu">
            <LeadsCheckbox
              label={"All"}
              isChecked={isChecked}
              setIsChecked={setIsChecked}
              // onCheckboxChangeHandler={onCheckboxChangeHandler}
            />
            <LeadsMenu
              leadsAllCount={leadsAllCount}
              leadsAprrovedCount={leadsAprrovedCount}
              leadsUnderReviewCount={leadsUnderReviewCount}
              leadsRejectedCount={leadsRejectedCount}
              leadsArchievedCount={leadsArchievedCount}
            />
          </Box>
          <LeadsDisplay setselectedLead={setselectedLead} />
        </Box>
        <Box component={"div"} className="section leads-details">
          <LeadDescription setselectedLead={setselectedLead} />
        </Box>
        <Box component={"div"} className="section leads-actions">
          <Box component={"div"} className="action-title">
            Move To:
          </Box>
          <Box component={"div"} className="action-buttons">
            <IButton
              type={"green"}
              name={"Approve"}
              children="Approve"
              onclick={approveButton}
              disabled={
                LeadData && LeadData.status && LeadData.status === 1
                  ? true
                  : false
              }
            />
            <IButton
              type={"yellow"}
              name={"Archive"}
              children="Archive"
              onclick={archieveButton}
              disabled={
                LeadData && LeadData.status && LeadData.status === 2
                  ? true
                  : false
              }
            />
            <IButton
              type={"grey"}
              name={"Under Review"}
              children="Under Review"
              onclick={() => console.log("e")}
              disabled={true}
            />
            <IButton
              type={"pink"}
              name={"Reject"}
              children="Reject"
              disabled={
                LeadData && LeadData.status && LeadData.status === -1
                  ? true
                  : false
              }
              onclick={rejectButton}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Leads2;
