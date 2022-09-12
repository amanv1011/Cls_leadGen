import React, { useState, useEffect } from "react";
import "./leadsDisplay.scss";
import { useDispatch, useSelector } from "react-redux";
import { getSingleLeadDetail } from "../../../../redux/actions/PopupAction";
import LeadsMenu from "../LeadsMenu";
import moment from "moment";
import { Button, Popover } from "@mui/material";
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
import Pagination from "@mui/material/Pagination";
import { postBlockedCompanyAction } from "../../../../redux/actions/blockedCompaniesAction";
import { getBlockedCompaniesListAction } from "../../../../redux/actions/blockedCompaniesAction";

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
  const [blockedCompanies, setBlockedCompanies] = useState(false);
  //pagination state
  const [pageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [index, setIndex] = useState(1);
  const [data, setData] = useState();
  const firstIndex = 0;
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

  const blockedCompaniesList = useSelector(
    (state) => state.blockedCompaniesReducer.blockedCompainesList
  );

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    setLeadsListData(leadsList);
    setData(
      leadsList.slice(firstIndex + pageSize * (index - 1), pageSize * index)
    );
  }, [leadsList]);

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

  // For multiple blocking
  useEffect(() => {
    dispatch(getBlockedCompaniesListAction());
  }, [blockedCompaniesList.length]);

  let array1 = leadsList
    .filter(function (item) {
      return selectedArray.includes(item.id);
    })
    .map((item) => item.companyName)
    .filter((value) => value !== null);
  array1 = [...new Set(array1)];

  let array2 = array1.map((companyName) =>
    leadsList.filter((lead) => lead.companyName === companyName)
  );
  let array3 = array2.map((filteredLead) =>
    filteredLead.map((item) => ({
      leadId: item.id,
      companyName: item.companyName,
    }))
  );

  let ans =
    array3.length > 0 &&
    array3.map((item) =>
      item.reduce((agg, curr) => {
        let found = agg.find((x) => x.companyName === curr.companyName);
        if (found) {
          found.leadId.push(curr.leadId);
        } else {
          agg.push({
            companyName: curr.companyName,
            leadId: [curr.leadId],
          });
        }
        return agg;
      }, [])
    );
  let array5 = [];
  ans && ans.map((item) => item.map((value) => array5.push(value)));

  const ids = array5.map((o) => o.companyName);
  array5 = array5.filter(
    ({ companyName }, index) => !ids.includes(companyName, index + 1)
  );

  let array6 = [];
  ans &&
    ans.map((item) =>
      item.map((value) => value.leadId.map((id) => array6.push(id)))
    );
  array6 = [...new Set(array6)];

  const handleBatchApply = () => {
    handleClose();
    if (blockedCompanies === true) {
      dispatch(postBlockedCompanyAction(array5));

      if (reason.length > 0) {
        dispatch(updateLeadStatus(array6, status, reason));
      } else {
        dispatch(updateLeadStatus(array6, status));
      }
    }
    if (blockedCompanies === false) {
      if (reason.length > 0) {
        dispatch(updateLeadStatus(selectedArray, status, reason));
      } else {
        dispatch(updateLeadStatus(selectedArray, status));
      }
    }
    setselectedArray([]);
    onClosePopup();
    setBlockedCompanies(false);
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
    setIndex(value);
    setPage(value);
    setData(
      leadsList.slice(firstIndex + pageSize * (value - 1), pageSize * value)
    );
  };

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
          blockedCompanies={blockedCompanies}
          setBlockedCompanies={setBlockedCompanies}
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
                  } ${lead && lead.seen && lead.seen === true ? "seen" : ""}`}
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
                        } ${
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
                      <div
                        style={
                          {
                            // textOverflow: "ellipsis",
                            // width: "50%",
                            // whiteSpace: "nowrap",
                            // overflow: "hidden",
                            // textAlign: "start",
                          }
                        }
                      >
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
    </React.Fragment>
  );
};

export default LeadsDisplay;
