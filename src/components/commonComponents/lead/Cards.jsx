import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Divider, TextField } from "@mui/material";
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
import IAutocomplete from "../../themeComponents/autocomplete/autocomplete";
import Textarea from "../../themeComponents/textarea/textarea";

const Cards = (props) => {
  const dispatch = useDispatch();
  const [openText, setopenText] = useState(false);
  const [value, setValue] = useState("");
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
  console.log("render");
  const disable =
    Number(
      displayLeadData && displayLeadData.status && displayLeadData.status
    ) === Number(0)
      ? true
      : false;
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
          <div
            style={{
              padding: "2px 12px",
            }}
          >
            <LeadsSearch />
          </div>
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
          <Box>
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
                disabled={disable}
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
          <Box className="autocomplete-container">
            <Box className="autocomplete-title">Assign To</Box>
            <IAutocomplete />
          </Box>
          <Box className="autocomplete-container">
            <Box>
              {/* <TextField
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
                className={openText ? "show" : "hide"}
              /> */}
              <Textarea />
              <IButton
                type={"blue"}
                name={"blue"}
                children={"Add Notes"}
                onclick={() => setopenText(!openText)}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Cards;
