import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateLeadStatus } from "../../../redux/actions/leadActions";
import { cardsDisplayAction } from "../../../redux/actions/leadActions";
import IButton from "../../themeComponents/button";
import LeadDescription from "../../commonComponents/leadDescription";
import LeadsDisplay from "../../pageComponents/leads2/LeadsDisplay";
import LeadsSearch from "../../pageComponents/leads2/LeadsSearch";
import LeadsHeader from "../../themeComponents/header/leadsHeader/leadsHeader";
import "./lead.scss";
import "../../pageComponents/leads2/leads.scss";

const Cards = (props) => {
  const dispatch = useDispatch();

  const leadsData = props.leadData;

  const displayLeadData = useSelector(
    (state) => state.popupStatus.popupData[0]
  );

  useEffect(() => {
    dispatch(cardsDisplayAction(leadsData));
  }, [leadsData.length]);

  let approveButton = () => {
    dispatch(updateLeadStatus(selectedLeadId, 1));
  };
  let rejectButton = () => {
    dispatch(updateLeadStatus(selectedLeadId, -1));
  };
  let archieveButton = () => {
    dispatch(updateLeadStatus(selectedLeadId, 2));
  };

  const [selectedLeadId, setSlectedLeadId] = useState("");

  const selectedLeadIdFun = (leadId) => {
    setSlectedLeadId(leadId);
  };

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

          {/* <Box component={"div"} className="section checkbox-menu"> */}
          {/* <LeadsCheckbox label={"All"} /> */}

          {/* </Box> */}
          <LeadsDisplay
            leadsList={leadsData}
            selectedLeadIdFun={selectedLeadIdFun}
            selectedLeadId={selectedLeadId}
          />
        </Box>
        <Box component={"div"} className="section leads-details">
          <LeadDescription leadsList={leadsData} />
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
                displayLeadData &&
                displayLeadData.status &&
                displayLeadData.status === 1
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
                displayLeadData &&
                displayLeadData.status &&
                displayLeadData.status === 2
                  ? true
                  : false
              }
            />
            <IButton
              type={"grey"}
              name={"Under Review"}
              children="Under Review"
              onclick={() => console.log("e")}
            />
            <IButton
              type={"pink"}
              name={"Reject"}
              children="Reject"
              disabled={
                displayLeadData &&
                displayLeadData.status &&
                displayLeadData.status === -1
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

export default Cards;
