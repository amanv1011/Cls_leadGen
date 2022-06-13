import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
// import LeadsMenu from "../LeadsMenu";
import moment from "moment";
import { Popover } from "@mui/material";
import IButton from "../../../themeComponents/button";
import * as campaignActions from "../../../../redux/actions/campaignActions";
import { openAlertAction } from "../../../../redux/actions/alertActions";
import PaginationComponent from "../../../commonComponents/PaginationComponent";
import DownArrow from "../../leads/DownArrow";
import Download from "../../../themeComponents/campTable/Download";
import Delete from "../../../themeComponents/campTable/Delete";
import "./campaignDisplay.scss";

const CampaignDisplay = ({
  campaignsList,
  searchedCampaignList,
  campaignLoader,
  searchValue,
  campaignDoc,
  currentPage,
  dataPerPage,
  leadsList,
}) => {
  const dispatch = useDispatch();
  const [campaignsListData, setcampaignsListData] = useState([]);
  const [selectedArray, setselectedArray] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const getNumOfLeads = (id) => {
    const val = leadsList.filter((valID) => {
      return valID.campaignId === id;
    });
    return val.length;
  };

  const Viewed = async (campaignListItemId) => {
    try {
      await dispatch(campaignActions.getACampaignAction(campaignListItemId));
    } catch (error) {
      dispatch(openAlertAction(`${error.message}`, true, "error"));
    }
  };

  const handlePopClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    setcampaignsListData(campaignsList);
  }, [campaignsList]);

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
      campaignsList.forEach((element) => {
        arr.push(element.id);
      });
      setselectedArray(arr);
    } else {
      setselectedArray([]);
    }
  };
  console.log("selectedArray", selectedArray);

  const indexOfLastLead = currentPage * dataPerPage;
  const indexOfFirstLead = indexOfLastLead - dataPerPage;
  const currentCampaigns = searchedCampaignList.slice(
    indexOfFirstLead,
    indexOfLastLead
  );

  if (campaignLoader === false && searchedCampaignList.length === 0) {
    if (searchValue) {
      return (
        <React.Fragment>
          <div className="checkbox-menu-container">
            <div className="checkbox-container">
              <input type="checkbox" disabled="true" />
              <label className="all-label">All</label>
            </div>
            {/* <LeadsMenu /> */}
          </div>
          <div className="campaign-display-container">
            <div className="campaign-display-subcontainers">
              <div className="campaign-display-subcontainer1">
                <div
                  className="display-cont"
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="campaign-display-btn-text searched-campaign-empty">
                    Searched campaigns(s) not found
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      return "No Campaigns found";
    }
  } else {
    return (
      <React.Fragment>
        <div className="checkbox-menu-container">
          <div className="checkbox-container">
            <input
              type="checkbox"
              name="allCheck"
              checked={
                selectedArray.length !== campaignsList.length ? false : true
              }
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
                PaperProps={{
                  boxShadow: "0px 6px 10px rgba(180, 180, 180, 0.35)",
                  borderRadius: "10px",
                }}
              >
                <div className="popover-body">
                  {/* <IButton type={"green"} name={"green"} children="Approve" />
                  <IButton type={"yellow"} name={"yellow"} children="Archive" />
                  <IButton
                    type={"grey"}
                    name={"grey"}
                    children="Under Review"
                  />
                  <IButton type={"pink"} name={"pink"} children=" Reject" /> */}
                  <button className="campaign-btn download-btn">
                    <Download />
                    <span className="campaign-btn-text">
                      Download selected campaigns
                    </span>
                  </button>

                  <button className="campaign-btn delete-btn">
                    <Delete />
                    <span className="campaign-btn-text">
                      Delete selected campaigns
                    </span>
                  </button>
                </div>
              </Popover>
            </div>
          </div>
          {/* <LeadsMenu /> */}
        </div>
        <div className="campaign-display-container">
          {currentCampaigns.length !== 0 &&
            currentCampaigns.map((campaign) => (
              <div
                onClick={() => Viewed(campaign.id)}
                className={`campaign-display-subcontainers ${
                  campaignDoc.id === campaign.id ? "selected" : ""
                } `}
                key={campaign.id}
              >
                <div className="campaign-display-check">
                  {/* <campaignsCheckbox /> */}
                  <input
                    type="checkbox"
                    name={campaign.id}
                    value={campaign.id}
                    className="checkbox"
                    checked={
                      selectedArray &&
                      selectedArray.filter((it) => it === campaign.id).length >
                        0
                        ? true
                        : false
                    }
                    onChange={handleOnCheckboxChange}
                  />
                </div>
                <div
                  className={`campaign-display-subcontainer1 ${
                    campaignDoc.id === campaign.id ? "selected" : ""
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
                      className={`campaign-display-btn-text ${
                        campaignDoc.id === campaign.id ? "selected" : ""
                      }`}
                    >
                      {campaign.name}
                    </div>
                    <span
                      className={`campaign-display-timestamp ${
                        campaignDoc.id === campaign.id ? "selected-sub" : ""
                      } `}
                    >
                      {`${getNumOfLeads(campaign.id)} leads`}

                      {/* {`${campaignDoc.id === campaign.id}?campaignDoc.`} */}
                    </span>
                  </div>

                  <div
                    className={`campaign-display-subcontainer2 ${
                      campaignDoc.id === campaign.id ? "selected-sub" : ""
                    }`}
                  >
                    <p>
                      {campaign.location === null ? "NA" : campaign.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <PaginationComponent
          dataPerPage={dataPerPage}
          dataLength={searchedCampaignList.length}
        />
      </React.Fragment>
    );
  }
};

export default CampaignDisplay;
