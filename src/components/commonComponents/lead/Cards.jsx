import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Divider, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addNotestoLeadAction,
  assignLeadToUsersAction,
  getAllLeadsAction,
  getAssignedLeadsAction,
  updateLeadStatus,
} from "../../../redux/actions/leadActions";
import { cardsDisplayAction } from "../../../redux/actions/leadActions";
import IButton from "../../themeComponents/button";
import LeadDescription from "../../commonComponents/leadDescription";
import LeadsDisplay from "../../pageComponents/leads2/LeadsDisplay";
import LeadsSearch from "../../pageComponents/leads2/LeadsSearch";
import LeadsHeader from "../../themeComponents/header/leadsHeader/leadsHeader";
import "../../pageComponents/leads2/leads.scss";
import IAutocomplete from "../../themeComponents/autocomplete/autocomplete";
import Textarea from "../../themeComponents/textarea/textarea";
import { getSingleLeadDetail } from "../../../redux/actions/PopupAction";
import IPopup from "../../themeComponents/popup/leadPopup";
import NotesPopup from "../../themeComponents/popup/notesPopup";

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
  const [showNotesState, setShowNotesState] = useState(false);
  const [reason, setReason] = useState("");
  const leadsData = props.leadData;
  let allLeadData = useSelector((state) => state.PopupReducer.popupData);
  let assignLeadResponse = useSelector(
    (state) => state.assignLeadToReducer.assignLead
  );
  const approveRejectResponse = useSelector(
    (state) => state.allLeads.approveRejectResponse
  );
  const NotesResponse = useSelector(
    (state) => state.addNotesToUserReducer.addedNotes
  );
  const allUsers = useSelector((state) => state.users.users);
  const filterChangeState = useSelector(
    (state) => state.leadsFilter.campaignName
  );
  const filterChangeOwnerState = useSelector(
    (state) => state.leadsFilter.ownerName
  );
  const filterChangeSearchState = useSelector(
    (state) => state.leadsFilter.searchQuery
  );
  const filterChangeCountryState = useSelector(
    (state) => state.leadsFilter.countriesName
  );

  const assignedLeads = useSelector(
    (state) => state.getAssignedLeadsReducer.assignedLeads
  );

  leadsData.sort(
    (a, b) =>
      new Date(b.leadGeneratedDate.seconds).getTime() -
      new Date(a.leadGeneratedDate.seconds).getTime()
  );

  useEffect(() => {
    setSelectedUsers([]);
    setdisplayLeadData(allLeadData);

    if (assignedLeads && allLeadData && allLeadData.id) {
      assignedLeads.forEach((lead) => {
        if (lead.leadId === allLeadData.id) {
          let selectedId = lead.userId;
          const filteredArray = allUsers.filter((value) =>
            selectedId.includes(value.userId)
          );
          setSelectedUsers(filteredArray);
        }
      });
    }
  }, [allLeadData]);

  useEffect(() => {
    dispatch(getAssignedLeadsAction());
  }, [assignLeadResponse]);

  useEffect(() => {
    if (
      (allLeadData && Object.keys(allLeadData).length === 0) ||
      allLeadData === undefined
    ) {
      dispatch(getSingleLeadDetail(leadsData[0]));
      setSlectedLeadId(leadsData[0] && leadsData[0].id ? leadsData[0].id : "");
    }
  }, [leadsData, allLeadData]);

  useEffect(() => {
    dispatch(getSingleLeadDetail(leadsData[0]));
    setSlectedLeadId(leadsData[0] && leadsData[0].id ? leadsData[0].id : "");
  }, [
    filterChangeState,
    filterChangeOwnerState,
    filterChangeCountryState,
    filterChangeSearchState,
  ]);

  useEffect(() => {
    dispatch(getAllLeadsAction());
    if (approveRejectResponse && approveRejectResponse.status) {
      let data = allLeadData;
      data.status = approveRejectResponse.status;
      setdisplayLeadData(data);
    }
    if (
      approveRejectResponse &&
      approveRejectResponse.status &&
      approveRejectResponse.leadsId
    ) {
      approveRejectResponse.leadsId.forEach((ele) => {
        if (displayLeadData.id === ele) {
          let data = allLeadData;
          data.status = approveRejectResponse.status;
          setdisplayLeadData(data);
        }
        leadsData &&
          leadsData.forEach((lead) => {
            if (lead.id === ele) {
              lead.status = approveRejectResponse.status;
            }
          });
      });
    }
  }, [approveRejectResponse]);

  useEffect(() => {
    if (NotesResponse && NotesResponse.leadsId) {
      NotesResponse.leadsId.map((ele) => {
        leadsData &&
          leadsData.forEach((lead) => {
            if (lead.id === ele) {
              if (lead.notes && lead.notes.length > 0) {
                lead.notes = [...lead.notes, NotesResponse.notes];
              } else {
                lead.notes = [NotesResponse.notes];
              }
            }
          });
      });
    }
  }, [NotesResponse]);

  useEffect(() => {
    dispatch(cardsDisplayAction(leadsData));
  }, [leadsData.length]);
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };

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
    let arr = [];
    option &&
      option.forEach((e) => {
        arr.push(e.userId);
      });
    dispatch(assignLeadToUsersAction([selectedLeadId], arr));
  };

  const addNotesFunction = (e) => {
    console.log(e.target);
    if (openText && value.length > 0) {
      const ParamObj = {
        userName: window.localStorage.getItem("userName")
          ? window.localStorage.getItem("userName")
          : "",
        note: value,
        createdAt: `${new Date().getDate()} ${new Date().toLocaleString(
          "default",
          { month: "long" }
        )}, ${new Date().getFullYear()}`,
      };
      if (selectedArray.length > 0) {
        dispatch(addNotestoLeadAction(selectedArray, ParamObj));
        setselectedArray([]);
      } else {
        dispatch(addNotestoLeadAction([selectedLeadId], ParamObj));
      }
      setValue("");
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
      if (reason.length > 0) {
        dispatch(updateLeadStatus([selectedLeadId], status, reason));
      } else {
        dispatch(updateLeadStatus([selectedLeadId], status));
      }
      onClosePopup();
      setReason("");
    }
  };
  console.log(selectedLeadId);
  return (
    <>
      {
        <IPopup
          open={open}
          onClosePopup={onClosePopup}
          handleApply={handleApply}
          title={"Update Lead Status"}
          status={status}
          reason={reason}
          setReason={setReason}
          disabled={
            status && status === -1 && reason && reason.length === 0
              ? true
              : false
          }
        />
      }
      {
        <NotesPopup
          open={showNotesState}
          setShowNotesState={setShowNotesState}
          displayLeadData={displayLeadData}
          type="showNotes"
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
              // onChangeOption={onChangeOption}
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
              selectedArray={selectedArray}
              setselectedArray={setselectedArray}
              //popup
              reason={reason}
              setReason={setReason}
              disabled={
                status && status === -1 && reason && reason.length === 0
                  ? true
                  : false
              }
            />
          </Box>
          <Box component={"div"} className="section leads-details">
            <LeadDescription displayLeadData={displayLeadData} />
          </Box>
          <Box component={"div"} className="section leads-actions">
            {displayLeadData ||
            (selectedLeadId !== undefined && selectedLeadId.length > 0) ? (
              <>
                {" "}
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
                    <Tooltip
                      title={
                        displayLeadData && displayLeadData.reason
                          ? displayLeadData.reason
                          : "Reject"
                      }
                    >
                      <div>
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
                      </div>
                    </Tooltip>
                  </Box>
                </Box>
                <Box className="autocomplete-container">
                  <Box className="autocomplete-title">Assign To</Box>
                  <IAutocomplete
                    options={allUsers}
                    onChangeOption={onChangeOption}
                    // assignUsers={assignUsers}
                    selectedUsers={selectedUsers}
                    width={145}
                  />
                </Box>
                {/* <IButton
              type={"blue"}
              name={"blue"}
              children={"Show Notes"}
              customClass={"show-nts-btn"}
              onclick={() => setShowNotesState(true)}
            /> */}
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
                    children={
                      <>
                        <span onClick={addNotesFunction}>{`Notes`}</span>
                        <span onClick={() => setShowNotesState(true)}>
                          {`\u00A0(${
                            displayLeadData &&
                            displayLeadData.notes &&
                            displayLeadData.notes.length > 0
                              ? displayLeadData.notes.length
                              : 0
                          })`}
                        </span>
                      </>
                    }
                    customClass={"add-nts-btn"}
                    // onclick={addNotesFunction}
                  />
                </Box>
              </>
            ) : null}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Cards;
