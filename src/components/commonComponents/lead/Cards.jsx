/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Divider, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addNotestoLeadAction,
  assignLeadToUsersAction,
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
import { getSingleLeadDetail } from "../../../redux/actions/PopupAction";
import IPopup from "../../themeComponents/popup/leadPopup";
import NotesPopup from "../../themeComponents/popup/notesPopup";
import RestrictedComponent from "../../higherOrderComponents/restrictedComponent";

const Cards = (props) => {
  const dispatch = useDispatch();
  const [selectedBatchAssignUsers, setSelectedBatchAssignUsers] = useState([]);
  const [displayLeadData, setdisplayLeadData] = useState([]);
  const [value, setValue] = useState("");
  const [selectedLeadId, setSlectedLeadId] = useState("");
  const [open, setOpen] = useState(false);
  const [openMultipleLeadPopup, setOpenMultipleLeadPopup] = useState(false);
  const [status, setStatus] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedArray, setselectedArray] = useState([]);
  const [showNotesState, setShowNotesState] = useState(false);
  const [filteredUsers, setfilteredUsers] = useState([]);
  const [reason, setReason] = useState("");
  const leadsData = props.leadData;
  let allLeadData = useSelector((state) => state.PopupReducer.popupData);
  const userRole = useSelector(
    (state) => state.getLoggedInUserAction.loggedInUser.user_role_id
  );
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
  const filterChangeDate = useSelector((state) => state.leadsFilter.filterDate);

  const assignedLeads = useSelector(
    (state) => state.getAssignedLeadsReducer.assignedLeads
  );
  const loggedInUser = useSelector(
    (state) => state.getLoggedInUserAction.loggedInUser
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
      assignedLeads &&
        assignedLeads.length &&
        assignedLeads.forEach((lead) => {
          if (lead.leadId === allLeadData.id) {
            let selectedId = lead.userId;
            const filteredArray = allUsers?.filter((value) =>
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
    filterChangeDate,
    props.option,
  ]);

  useEffect(() => {
    if (approveRejectResponse && approveRejectResponse.leadsId) {
      approveRejectResponse.leadsId.forEach((ele) => {
        if (displayLeadData.id === ele) {
          let data = allLeadData;
          data.status = approveRejectResponse.status;
          setdisplayLeadData(data);
          allLeadData.status = approveRejectResponse.status;
        }
        leadsData &&
          leadsData.forEach((lead, idx) => {
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
    if (value.length > 0) {
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
      // setShowNotesState(false);
    }
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

  useEffect(() => {
    const arr =
      allUsers && allUsers?.filter((ele) => ele.userId !== loggedInUser.id);
    setfilteredUsers(arr);
  }, [allUsers, loggedInUser]);

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
          addNotesFunction={addNotesFunction}
          type="showNotes"
          value={value}
          setValue={setValue}
        />
      }
      <Box component="div" className="leads-container">
        <Box component={"div"} className="leads-header">
          <LeadsHeader campaign={props.campaign} userRole={props.userRole} />
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
              options={filteredUsers}
              // onChangeOption={onChangeOption}
              selectedUsers={selectedUsers}
              // setSelectedUsers={setSelectedUsers}
              selectedBatchAssignUsers={selectedBatchAssignUsers}
              setSelectedBatchAssignUsers={setSelectedBatchAssignUsers}
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
                        displayLeadData && displayLeadData.status === 0
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
                {
                  <RestrictedComponent
                    user={userRole}
                    Component={() => (
                      <Box
                        className={`autocomplete-container ${
                          selectedArray.length > 0 ? "disabled" : ""
                        }`}
                      >
                        <Box className="autocomplete-title">Assign To</Box>
                        <IAutocomplete
                          options={filteredUsers}
                          onChangeOption={onChangeOption}
                          // assignUsers={assignUsers}
                          selectedUsers={selectedUsers}
                          width={150}
                        />
                      </Box>
                    )}
                  />
                }
                <Box className="add-notes-container">
                  {/* {openText ? (
                    <Textarea
                      openText={openText}
                      value={value}
                      setValue={setValue}
                    />
                  ) : null} */}
                  <IButton
                    type={"blue"}
                    name={"blue"}
                    onclick={() => setShowNotesState(true)}
                    children={
                      <>
                        <span>{`Notes`}</span>
                        <span>
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
