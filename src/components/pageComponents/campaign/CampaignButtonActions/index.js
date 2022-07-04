import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Download from "../../../themeComponents/campTable/Download";
import Delete from "../../../themeComponents/campTable/Delete";
import Edit from "../../../themeComponents/campTable/Edit";
import Cancel from "../../../themeComponents/campTable/Cancel";
import * as commonFunctions from "../commonFunctions";
import * as campaignActions from "../../../../redux/actions/campaignActions";
import AlertBeforeAction from "../../../themeComponents/campTable/AlertBeforeAction";
import moment from "moment";
import "./campaignButtonActions.scss";

const CampaignButtonActions = ({
  campaignDoc,
  campgaignId,
  leadsList,
  selectedArray,
  searchedCampaignList,
}) => {
  const dispatch = useDispatch();
  const [openAlert, setOpenAlert] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  const [idForDelete, setIdForDelete] = useState("");

  const current_date = moment().format("YYYY-MM-DD");
  const difference_startDate_endDate = moment(current_date).diff(
    campaignDoc?.start_date &&
      moment
        .unix(
          campaignDoc.start_date.seconds,
          campaignDoc.start_date.nanoseconds
        )
        .format("MM/DD/YYYY"),
    "days"
  );

  const getNumOfLeads = (id) => {
    const val =
      leadsList &&
      leadsList.filter((valID) => {
        return valID.campaignId === id;
      });
    return val.length;
  };

  const forDownloading = (campaignListId, campaignListItemName) => {
    const val = leadsList.filter((valID) => {
      return valID.campaignId === campaignListId;
    });

    let updatedleadsListDataToDownload = [];
    val.forEach((lead) => {
      let campaignListDataToDownload = {
        "Company name": lead.companyName !== null ? lead.companyName : "NA",
        Location: lead.location !== "No location" ? lead.location : "NA",
        "Lead generated date":
          lead.leadGeneratedDate !== null
            ? moment
                .unix(
                  lead.leadGeneratedDate.seconds,
                  lead.leadGeneratedDate.nanoseconds
                )
                .format("MM/DD/YYYY")
            : "NA",
        "Lead posted date":
          lead.leadPostedDate !== null
            ? moment(lead.leadPostedDate).format("MM/DD/YYYY")
            : "NA",
        Link: lead.link,
        Summary: lead.summary !== "No summary" ? lead.summary : "NA",
        Title: lead.title,
        "Status of the lead":
          lead.status === 1
            ? "Approved"
            : lead.status === -1
            ? "Rejected"
            : lead.status === 2
            ? "Archived"
            : "Under review",
      };

      updatedleadsListDataToDownload = [
        ...updatedleadsListDataToDownload,
        campaignListDataToDownload,
      ];
    });
    commonFunctions.downloadInExcel(
      updatedleadsListDataToDownload,
      `${campaignListItemName} leads list`
    );
  };

  if (campgaignId) {
    return (
      <form id="campaignUpdate-form">
        <div className="campaignButton-actions-edit">
          <button
            className="campaign-save-cancel-btn save-btn"
            form="campaignUpdate-form"
            type="submit"
          >
            {/* <Cancel />  */}
            <span className="campaign-btn-text">Save</span>
          </button>
          <button
            className="campaign-save-cancel-btn cancel-btn"
            onClick={() => {
              dispatch(campaignActions.campaignIDAction(""));
            }}
          >
            {/* <Cancel /> */}
            <span className="campaign-btn-text">Cancel</span>
          </button>
        </div>
      </form>
    );
  } else {
    return (
      <React.Fragment>
        <div className="campaignButton-actions">
          <button
            className="campaign-btn edit-btn"
            onClick={() => {
              dispatch(campaignActions.campaignIDAction(campaignDoc.id));
            }}
            disabled={
              selectedArray.length !== 0
                ? // || difference_startDate_endDate > 0
                  true
                : false
            }
            style={
              selectedArray.length !== 0
                ? // || difference_startDate_endDate > 0
                  {
                    pointerEvents: "auto",
                    cursor: "not-allowed",
                  }
                : {}
            }
          >
            <Edit /> <span className="campaign-btn-text">Edit</span>
          </button>

          <button
            className="campaign-btn delete-btn"
            disabled={
              selectedArray.length !== 0
                ? true
                : getNumOfLeads(campaignDoc.id)
                ? true
                : false
            }
            style={
              selectedArray.length !== 0
                ? {
                    pointerEvents: "auto",
                    cursor: "not-allowed",
                  }
                : getNumOfLeads(campaignDoc.id)
                ? { pointerEvents: "auto", cursor: "not-allowed" }
                : {}
            }
            onClick={() => {
              setOpenAlert(true);
              setCampaignName(campaignDoc.name);
              setIdForDelete(campaignDoc.id);
            }}
          >
            <Delete /> <span className="campaign-btn-text">Delete</span>
          </button>
          <button
            className="campaign-btn download-btn"
            disabled={
              selectedArray.length !== 0
                ? true
                : getNumOfLeads(campaignDoc.id)
                ? false
                : true
            }
            style={
              selectedArray.length !== 0
                ? {
                    pointerEvents: "auto",
                    cursor: "not-allowed",
                  }
                : getNumOfLeads(campaignDoc.id)
                ? {}
                : { pointerEvents: "auto", cursor: "not-allowed" }
            }
            onClick={() => forDownloading(campaignDoc.id, campaignDoc.name)}
          >
            <Download /> <span className="campaign-btn-text">Download</span>
          </button>
        </div>
        {/* <div>Updated by:</div>
        <div>Updated at</div> */}
        <AlertBeforeAction
          open={openAlert}
          setOpenAlert={setOpenAlert}
          campaignItemId={idForDelete}
          setIdForDelete={setIdForDelete}
          campaignName={campaignName}
          setCampaignName={setCampaignName}
          searchedCampaignList={searchedCampaignList}
        />
      </React.Fragment>
    );
  }
};

export default CampaignButtonActions;
