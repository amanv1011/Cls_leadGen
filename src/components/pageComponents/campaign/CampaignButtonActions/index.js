import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Download from "../../../themeComponents/campTable/Download";
import Delete from "../../../themeComponents/campTable/Delete";
import Edit from "../../../themeComponents/campTable/Edit";
import Cancel from "../../../themeComponents/campTable/Cancel";
import * as commonFunctions from "../commonFunctions";
import * as campaignActions from "../../../../redux/actions/campaignActions";
import moment from "moment";
import "./campaignButtonActions.scss";
import AlertBeforeAction from "../../../themeComponents/campTable/AlertBeforeAction";

const CampaignButtonActions = ({ campaignDoc, campgaignId, leadsList }) => {
  const dispatch = useDispatch();
  const [openAlert, setOpenAlert] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  const [idForDelete, setIdForDelete] = useState("");

  const getNumOfLeads = (id) => {
    const val = leadsList.filter((valID) => {
      return valID.campaignId === id;
    });
    return val.length;
  };

  const forDownloading = (campaignListId, campaignListItemName) => {
    console.log("Yes it's a campaign");
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
      <div className="campaignButton-actions">
        <button className="campaign-btn save-btn">
          <Cancel /> <span className="campaign-btn-text">Save</span>
        </button>
        <button
          className="campaign-btn cancel-btn"
          onClick={() => {
            dispatch(campaignActions.campaignIDAction(""));
            // dispatch(campaignActions.showModal());
          }}
        >
          <Cancel /> <span className="campaign-btn-text">Cancel</span>
        </button>
      </div>
    );
  } else {
    return (
      <>
        <div className="campaignButton-actions">
          <button
            className="campaign-btn edit-btn"
            disabled={
              campaignDoc.id ? false : true
              // moment(campaignDoc.end_Date).isSameOrBefore(
              //   campaignDoc.current_Date
              // )
              //   ? true
              //   : false
            }
            // style={
            //   moment(campaignDoc.end_Date).isSameOrBefore(
            //     campaignDoc.current_Date
            //   )
            //     ? {
            //         pointerEvents: "auto",
            //         cursor: "not-allowed",
            //       }
            //     : {}
            // }
            onClick={() => {
              dispatch(campaignActions.campaignIDAction(campaignDoc.id));
              // dispatch(campaignActions.showModal());
            }}
          >
            <Edit /> <span className="campaign-btn-text">Edit</span>
          </button>

          <button
            className="campaign-btn delete-btn"
            disabled={getNumOfLeads(campaignDoc.id) ? true : false}
            style={
              getNumOfLeads(campaignDoc.id) === 0
                ? {}
                : {
                    pointerEvents: "auto",
                    cursor: "not-allowed",
                  }
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
            disabled={getNumOfLeads(campaignDoc.id) ? false : true}
            style={
              getNumOfLeads(campaignDoc.id) === 0
                ? {
                    pointerEvents: "auto",
                    cursor: "not-allowed",
                  }
                : {}
            }
            onClick={() => forDownloading(campaignDoc.id, campaignDoc.name)}
          >
            <Download /> <span className="campaign-btn-text">Download</span>
          </button>
        </div>
        <AlertBeforeAction
          open={openAlert}
          setOpenAlert={setOpenAlert}
          campaignItemId={idForDelete}
          setIdForDelete={setIdForDelete}
          campaignName={campaignName}
          setCampaignName={setCampaignName}
        />
      </>
    );
  }
};

export default CampaignButtonActions;
