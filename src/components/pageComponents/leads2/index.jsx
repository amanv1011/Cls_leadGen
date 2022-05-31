import { Box } from "@mui/system";
import React from "react";
import LeadDescription from "../../commonComponents/leadDescription";
import IButton from "../../themeComponents/button";
import LeadsHeader from "../../themeComponents/header/leadsHeader/leadsHeader";
import "./leads.scss";

const Leads2 = () => {
  return (
    <Box component="div" className="leads-container">
      <Box component={"div"} className="leads-header">
        <LeadsHeader />
      </Box>
      <Box component={"div"} className="leads-body">
        <Box component={"div"} className="section leads-list">
          List Here
        </Box>
        <Box component={"div"} className="section leads-details">
          <LeadDescription />
        </Box>
        <Box component={"div"} className="section leads-actions">
          Leads Action Here
          <IButton
            type={"green"}
            name={"Approve"}
            children="Approve"
            onclick={console.log("e")}
          />
          <IButton
            type={"yellow"}
            name={"Archive"}
            children="Archive"
            onclick={console.log("e")}
          />
          <IButton
            type={"grey"}
            name={"Under Review"}
            children="Under Review"
            onclick={console.log("e")}
          />
          <IButton
            type={"pink"}
            name={"Reject"}
            children="Reject"
            onclick={console.log("e")}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Leads2;
