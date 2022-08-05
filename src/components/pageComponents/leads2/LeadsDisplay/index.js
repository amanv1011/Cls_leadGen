import React, { useState, useEffect } from "react";
import "./leadsDisplay.scss";
import { useDispatch, useSelector } from "react-redux";
import { getSingleLeadDetail } from "../../../../redux/actions/PopupAction";
import LeadsMenu from "../LeadsMenu";
import moment from "moment";
import { Popover } from "@mui/material";
import IButton from "../../../themeComponents/button";
import {
  assignLeadToUsersAction,
  updateLeadStatus,
  updateLeadViewStatusAction,
} from "../../../../redux/actions/leadActions";
import DownArrow from "../../../../assets/jsxIcon/DownArrow";
import IPopup from "../../../themeComponents/popup/leadPopup";
import IModal from "../../../themeComponents/popup/modal";
import RestrictedComponent from "../../../higherOrderComponents/restrictedComponent";
import PaginationComponent from "../../../commonComponents/PaginationComponent/index";
//import { Pagination } from "rsuite";
import Pagination from "@mui/material/Pagination";

const firstIndex = 0;
const LeadsDisplay = ({
  leadsList,
  selectedLeadIdFun,
  selectedLeadId,
  onClosePopup,
  handleBatchUpdateStatus,
  openDeletePopup,
  status,
  options,
  onChangeOption,
  setSelectedBatchAssignUsers,
  selectedBatchAssignUsers,
  selectedArray,
  setselectedArray,
  reason,
  setReason,
  disabled,
}) => {
  const dispatch = useDispatch();

  const [leadsListData, setLeadsListData] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openAssignModel, setOpenAssignModel] = useState(false);
  //pagination state
  //const [activePage, setActivePage] = React.useState(2);
  const [pageSize, setPageSize] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [data, setData] = React
    .useState
    // leadsListData.slice(firstIndex, pageSize)
    ();

  //functions for popover
  const handlePopClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const leadViewUpdate = useSelector(
    (state) => state.updateLeadViewStatusReducer.leadViewStatus
  );
  const userRole = useSelector(
    (state) => state.getLoggedInUserAction.loggedInUser.user_role_id
  );
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    setLeadsListData(leadsList);
    setData(leadsList.slice(firstIndex, pageSize));
  }, []);

  useEffect(() => {
    leadViewUpdate &&
      leadsListData &&
      leadsListData.forEach((e) => {
        if (e.id === leadViewUpdate.leadsId) {
          e.seen = leadViewUpdate.seen;
        }
      });
  }, [leadViewUpdate]);

  const handleClick = (leadId) => {
    let leadsIdData = leadsList?.filter((ele) => ele.id === leadId);
    selectedLeadIdFun(leadsIdData[0].id);
    dispatch(getSingleLeadDetail(leadsIdData[0]));
    //set already assigned user here
    //update seen status here
    if ((leadsIdData[0] && leadsIdData[0].seen !== true) || undefined) {
      dispatch(updateLeadViewStatusAction(leadId));
    }
  };
  const handleOnCheckboxChange = (event) => {
    if (event.target.checked) {
      setselectedArray([...selectedArray, event.target.value]);
    } else {
      const filtered = selectedArray?.filter(
        (item) => item !== event.target.value
      );
      setselectedArray(filtered);
    }
  };

  const handleAllCheck = (e) => {
    setIsChecked(!isChecked);
    if (e.target.checked) {
      let arr = [];
      leadsList.forEach((element) => {
        arr.push(element.id);
      });
      setselectedArray(arr);
    } else {
      setselectedArray([]);
    }
  };

  const handleBatchApply = () => {
    handleClose();
    if (reason.length > 0) {
      dispatch(updateLeadStatus(selectedArray, status, reason));
    } else {
      dispatch(updateLeadStatus(selectedArray, status));
    }
    setselectedArray([]);
    onClosePopup();
  };

  const assignBatchUsers = (e, option, multiple = true) => {
    setSelectedBatchAssignUsers(option);
    if (selectedArray.length > 0 && selectedBatchAssignUsers.length >= 0) {
      let arr = [];
      option &&
        option.forEach((e) => {
          arr.push(e.userId);
        });
      dispatch(assignLeadToUsersAction(selectedArray, arr, multiple));
    }
  };
  //pagination
  React.useEffect(() => {
    setData(leadsListData.slice(0, pageSize));
  }, [pageSize]);

  const handleChange = (event, value) => {
    setPage(value);
    setData(
      leadsListData.slice(firstIndex + pageSize * (value - 1), pageSize * value)
    );
  };

  // //Change widths
  // const changeWidth = (e) => {
  //   setPageSize(parseInt(e.target.value, 10));
  // };

  return (
    <React.Fragment>
      {
        <IPopup
          open={openDeletePopup}
          onClosePopup={onClosePopup}
          handleApply={handleBatchApply}
          title={"Update Lead Status"}
          status={status}
          reason={reason}
          setReason={setReason}
          disabled={disabled}
        />
      }
      {
        <IModal
          open={openAssignModel}
          setOpenAssignModel={setOpenAssignModel}
          options={options}
          onChangeOption={assignBatchUsers}
          // assignUsers={assignBatchUsers}
          selectedBatchAssignUsers={selectedBatchAssignUsers}
          setSelectedBatchAssignUsers={setSelectedBatchAssignUsers}
        />
      }
      <div className="checkbox-menu-container">
        <div className="checkbox-container">
          <input
            type="checkbox"
            name="allCheck"
            checked={selectedArray.length !== leadsList.length ? false : true}
            onChange={handleAllCheck}
            className="checkbox"
          />
          {selectedArray.length > 0 ? (
            <div
              variant="contained"
              className="action-btn"
              onClick={handlePopClick}
            >
              Action
              <DownArrow />
            </div>
          ) : (
            <label className="all-label">All</label>
          )}
          <div>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <div className="popover-body">
                <IButton
                  type={"green"}
                  name={"green"}
                  children="Approve"
                  onclick={() => handleBatchUpdateStatus(1)}
                />
                <RestrictedComponent
                  user={userRole}
                  Component={() => (
                    <IButton
                      type={"blue"}
                      name={"blue"}
                      children={"Assign"}
                      onclick={() => setOpenAssignModel(true)}
                    />
                  )}
                />
                <IButton
                  type={"yellow"}
                  name={"yellow"}
                  children={"Archive"}
                  onclick={() => {
                    handleBatchUpdateStatus(2);
                  }}
                />
                <IButton
                  type={"grey"}
                  name={"grey"}
                  children="Under Review"
                  onclick={() => handleBatchUpdateStatus(0)}
                />
                <IButton
                  type={"pink"}
                  name={"pink"}
                  children=" Reject"
                  onclick={() => handleBatchUpdateStatus(-1)}
                />
              </div>
            </Popover>
          </div>
        </div>
        <LeadsMenu />
      </div>
      <div className="lead-display-container">
        {data && data.length > 0 ? (
          <>
            {data &&
              data.map((lead, idx) => (
                <div
                  className={`lead-display-subcontainers ${
                    selectedLeadId === lead.id ? "selected" : ""
                  }  ${lead && lead.seen && lead.seen === true ? "seen" : ""} `}
                  onClick={() => handleClick(lead.id)}
                  key={idx}
                >
                  <div className="lead-display-check">
                    {/* <LeadsCheckbox /> */}
                    <input
                      type="checkbox"
                      name={lead.id}
                      value={lead.id}
                      className="checkbox"
                      checked={
                        selectedArray &&
                        selectedArray?.filter((it) => it === lead.id).length > 0
                          ? true
                          : false
                      }
                      onChange={handleOnCheckboxChange}
                    />
                  </div>
                  <div
                    className={`lead-display-subcontainer1 ${
                      selectedLeadId === lead.id ? "selected" : ""
                    }`}
                  >
                    <div
                      className="display-count"
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        className={`lead-display-btn-text ${
                          selectedLeadId === lead.id ? "selected" : ""
                        }  ${
                          lead && lead.seen && lead.seen === true ? "seen" : ""
                        }`}
                      >
                        {lead.title}
                      </div>
                    </div>
                    <div
                      className={`lead-display-subcontainer2 ${
                        selectedLeadId === lead.id ? "selected-sub" : ""
                      }`}
                    >
                      <div>
                        {lead.companyName === null ? "NA" : lead.companyName}
                      </div>
                      <span
                        className={`lead-display-timestamp ${
                          selectedLeadId === lead.id ? "selected-sub" : ""
                        } `}
                      >
                        {moment.unix(lead.leadGeneratedDate.seconds).fromNow()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            <Pagination
              count={Math.ceil(leadsListData.length / pageSize)}
              page={page}
              color="primary"
              size="small"
              sx={{
                marginTop: "8px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
              boundaryCount={1}
              onChange={handleChange}
            />
            {/* <Pagination
              prev
              last
              next
              first
              size="sm"
              total={leadsList.length}
              limit={20}
              activePage={activePage}
              onChangePage={setActivePage}
            /> */}
            {/* <PaginationComponent dataPerPage={10} dataLength={leadsList.length} /> */}
          </>
        ) : (
          <>
            <p
              style={{
                padding: "10px",
                color: "rgb(92, 117, 154)",
                fontSize: "14px",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              No lead(s) to display!
            </p>
          </>
        )}
      </div>
    </React.Fragment>
  );
};

export default LeadsDisplay;
