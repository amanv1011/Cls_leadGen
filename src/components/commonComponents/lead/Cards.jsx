import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addNotestoLeadAction,
  assignLeadToUsersAction,
  getAllLeadsAction,
  updateLeadStatus,
} from "../../../redux/actions/leadActions";
import { cardsDisplayAction } from "../../../redux/actions/leadActions";
import IButton from "../../themeComponents/button";
import LeadDescription from "../../commonComponents/leadDescription";
import LeadsDisplay from "../../pageComponents/leads2/LeadsDisplay";
import LeadsSearch from "../../pageComponents/leads2/LeadsSearch";
import LeadsHeader from "../../themeComponents/header/leadsHeader/leadsHeader";
// import "./lead.scss";
import "../../pageComponents/leads2/leads.scss";
import IAutocomplete from "../../themeComponents/autocomplete/autocomplete";
import Textarea from "../../themeComponents/textarea/textarea";
import { getSingleLeadDetail } from "../../../redux/actions/PopupAction";
import IPopup from "../../themeComponents/popup/leadPopup";

const Cards = (props) => {
  const dispatch = useDispatch();
  const [openText, setopenText] = useState(false);
  const [displayLeadData, setdisplayLeadData] = useState([]);
  const [value, setValue] = useState("");
  const [selectedLeadId, setSlectedLeadId] = useState("");
  const [open, setOpen] = useState(false);
  const [openMultipleLeadPopup, setOpenMultipleLeadPopup] = useState(false);
  const [status, setStatus] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedArray, setselectedArray] = useState([]);
  const leadsData = props.leadData;
  const allLeadData = useSelector((state) => state.PopupReducer.popupData);
  const approveRejectResponse = useSelector(
    (state) => state.allLeads.approveRejectResponse
  );
  const allUsers = useSelector((state) => state.users.users);
  useEffect(() => {
    setdisplayLeadData(allLeadData);
  }, [allLeadData]);

  useEffect(() => {
    if (
      (allLeadData && Object.keys(allLeadData).length === 0) ||
      allLeadData === undefined
    ) {
      dispatch(getSingleLeadDetail(leadsData[0]));
      setSlectedLeadId(leadsData[0] && leadsData[0].id);
    }
  }, [leadsData, allLeadData]);

  useEffect(() => {
    dispatch(getAllLeadsAction());
    if (approveRejectResponse && approveRejectResponse.status) {
      let data = displayLeadData;
      data.status = approveRejectResponse && approveRejectResponse.status;
      setdisplayLeadData(data);
    }
  }, [approveRejectResponse]);

  useEffect(() => {
    dispatch(cardsDisplayAction(leadsData));
  }, [leadsData.length]);

  const handleUpdateStatus = (status) => {
    setOpen(true);
    setStatus(status);
  };

  const selectedLeadIdFun = (leadId) => {
    setSlectedLeadId(leadId);
  };
  //assigning lead to a user
  const onChangeOption = (e, option) => {
    setSelectedUsers(option);
  };

  const assignUsers = () => {
    if (selectedLeadId.length > 0 && selectedUsers.length > 0) {
      let arr = [];
      selectedUsers &&
        selectedUsers.forEach((e) => {
          arr.push(e.userId);
        });
      dispatch(assignLeadToUsersAction([selectedLeadId], arr));
      setSelectedUsers([]);
    }
  };

  const addNotesFunction = () => {
    if (openText && value.length > 0) {
      if (selectedArray.length > 0) {
        dispatch(addNotestoLeadAction(selectedArray, value));
        setselectedArray([]);
      } else {
        dispatch(addNotestoLeadAction([selectedLeadId], value));
      }
    }
    setopenText(!openText);
  };

  const onClosePopup = () => {
    setOpen(false);
    setOpenMultipleLeadPopup(false);
  };
  const handleBatchUpdateStatus = (status) => {
    setOpenMultipleLeadPopup(true);
    setStatus(status);
  };
  const handleApply = () => {
    if (selectedLeadId && status !== null) {
      dispatch(updateLeadStatus([selectedLeadId], status));
      onClosePopup();
    }
  };

  return (
    <>
      {
        <IPopup
          open={open}
          onClosePopup={onClosePopup}
          handleApply={handleApply}
          title={"Update Lead Status"}
        />
      }
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
              openDeletePopup={openMultipleLeadPopup}
              onClosePopup={onClosePopup}
              handleBatchUpdateStatus={handleBatchUpdateStatus}
              status={status}
              //autocomplete props
              options={allUsers}
              onChangeOption={onChangeOption}
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
              selectedArray={selectedArray}
              setselectedArray={setselectedArray}
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
              <Box
                component={"div"}
                className={`action-buttons ${
                  selectedArray.length > 0 ? "disabled" : ""
                }`}
              >
                <IButton
                  type={"green"}
                  name={"Approve"}
                  children="Approve"
                  onclick={() => handleUpdateStatus(1)}
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
                  onclick={() => handleUpdateStatus(2)}
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
                  disabled={
                    Number(
                      displayLeadData &&
                        displayLeadData.status &&
                        displayLeadData.status
                    ) === Number(0)
                      ? true
                      : false
                  }
                  onclick={() => handleUpdateStatus(0)}
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
                  onclick={() => handleUpdateStatus(-1)}
                />
              </Box>
            </Box>
            <Box className="autocomplete-container">
              <Box className="autocomplete-title">Assign To</Box>
              <IAutocomplete
                options={allUsers}
                onChangeOption={onChangeOption}
                assignUsers={assignUsers}
                selectedUsers={selectedUsers}
              />
            </Box>
            <Box className="add-notes-container">
              {openText ? (
                <Textarea
                  openText={openText}
                  value={value}
                  setValue={setValue}
                />
              ) : null}
              <IButton
                type={"blue"}
                name={"blue"}
                children={"Add Notes"}
                customClass={"add-nts-btn"}
                onclick={addNotesFunction}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Cards;
