import React, { useState, useEffect } from "react";
import "./leadsDisplay.scss";
import { useDispatch, useSelector } from "react-redux";
import { getSingleLeadDetail } from "../../../../redux/actions/PopupAction";
import LeadsMenu from "../LeadsMenu";
import moment from "moment";
import { Popover } from "@mui/material";
import IButton from "../../../themeComponents/button";
import {
  updateLeadStatus,
  updateLeadViewStatusAction,
} from "../../../../redux/actions/leadActions";
import DownArrow from "../../../../assets/jsxIcon/DownArrow";
const LeadsDisplay = ({ leadsList, selectedLeadIdFun, selectedLeadId }) => {
  const dispatch = useDispatch();

  const [leadsListData, setLeadsListData] = useState([]);
  const [selectedArray, setselectedArray] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  //functions for popover
  const handlePopClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const leadViewUpdate = useSelector(
    (state) => state.updateLeadViewStatusReducer.leadViewStatus
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    setLeadsListData(leadsList);
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
    let leadsIdData = leadsList.filter((ele) => ele.id === leadId);
    selectedLeadIdFun(leadsIdData[0].id);
    dispatch(getSingleLeadDetail(leadsIdData[0]));
    //update seen status here
    if ((leadsIdData[0] && leadsIdData[0].seen !== true) || undefined) {
      dispatch(updateLeadViewStatusAction(leadId));
    }
  };

  const handleOnCheckboxChange = (event) => {
    if (event.target.checked) {
      setselectedArray([...selectedArray, event.target.value]);
    } else {
      const filtered = selectedArray.filter(
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

  const updateLeadBatchStatus = (status) => {
    handleClose();
    dispatch(updateLeadStatus(selectedArray, status));
    setselectedArray([]);
  };

  return (
    <React.Fragment>
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
                  onclick={() => updateLeadBatchStatus(1)}
                />
                {/* <IButton
                  type={"blue"}
                  name={"blue"}
                  children={"Assign"}
                  onclick={() => {
                    console.log("Assigned");
                  }}
                /> */}
                <IButton
                  type={"yellow"}
                  name={"yellow"}
                  children={"Archive"}
                  onclick={() => {
                    updateLeadBatchStatus(2);
                  }}
                />
                <IButton
                  type={"grey"}
                  name={"grey"}
                  children="Under Review"
                  onclick={() => updateLeadBatchStatus(0)}
                />
                <IButton
                  type={"pink"}
                  name={"pink"}
                  children=" Reject"
                  onclick={() => updateLeadBatchStatus(-1)}
                />
              </div>
            </Popover>
          </div>
        </div>
        <LeadsMenu />
      </div>
      <div className="lead-display-container">
        {leadsList &&
          leadsList.map((lead) => (
            <div
              className={`lead-display-subcontainers ${
                selectedLeadId === lead.id ? "selected" : ""
              }  ${lead && lead.seen && lead.seen === true ? "seen" : ""} `}
              onClick={() => handleClick(lead.id)}
              key={lead.id}
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
                    selectedArray.filter((it) => it === lead.id).length > 0
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
                  className="display-cont"
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
      </div>
    </React.Fragment>
  );
};

export default LeadsDisplay;
