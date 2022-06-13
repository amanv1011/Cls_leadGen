import React, { useState, useEffect } from "react";
import "./leadsDisplay.scss";
import { useDispatch } from "react-redux";
import { getPopupEnable } from "../../../../redux/actions/PopupAction";
import LeadsMenu from "../LeadsMenu";
import moment from "moment";
import { Popover } from "@mui/material";
import IButton from "../../../themeComponents/button";
import { updateLeadStatus } from "../../../../redux/actions/leadActions";
import DownArrow from "../../../../assets/jsxIcon/DownArrow";
const LeadsDisplay = ({ leadsList, selectedLeadIdFun, selectedLeadId }) => {
  const dispatch = useDispatch();

  const [, setLeadsListData] = useState([]);
  const [selectedArray, setselectedArray] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  //functions for popover
  const handlePopClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    setLeadsListData(leadsList);
  }, [leadsList]);

  const handleClick = (leadId) => {
    let leadsIdData = leadsList.filter((ele) => ele.id === leadId);
    selectedLeadIdFun(leadsIdData[0].id);
    dispatch(getPopupEnable(leadsIdData));
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
            checked={isChecked}
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
              } `}
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
                    }`}
                  >
                    {lead.title}
                  </div>
                  <span
                    className={`lead-display-timestamp ${
                      selectedLeadId === lead.id ? "selected-sub" : ""
                    } `}
                  >
                    {moment.unix(lead.leadGeneratedDate.seconds).fromNow()}
                  </span>
                </div>

                <div
                  className={`lead-display-subcontainer2 ${
                    selectedLeadId === lead.id ? "selected-sub" : ""
                  }`}
                >
                  <p>{lead.companyName === null ? "NA" : lead.companyName}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </React.Fragment>
  );
};

export default LeadsDisplay;
