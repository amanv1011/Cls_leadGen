import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Download from "../../../themeComponents/campTable/Download";
import Delete from "../../../themeComponents/campTable/Delete";
import Edit from "../../../themeComponents/campTable/Edit";
import * as commonFunctions from "../commonFunctions";
import * as campaignActions from "../../../../redux/actions/campaignActions";
import AlertBeforeAction from "../../../themeComponents/campTable/AlertBeforeAction";
import moment from "moment";
import "./campaignButtonActions.scss";

const CampaignButtonActions = ({
  campaignDocument,
  campgaignId,
  leadsList,
  selectedArray,
  campaignsListData,
}) => {
  const dispatch = useDispatch();
  const [openAlert, setOpenAlert] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  const [idForDelete, setIdForDelete] = useState("");

  const current_date = moment().format("YYYY-MM-DD");
  const difference_startDate_endDate = moment(current_date).diff(
    campaignDocument?.start_date &&
      moment
        .unix(
          campaignDocument.start_date.seconds,
          campaignDocument.start_date.nanoseconds
        )
        .format("YYYY-MM-DD"),
    "days"
  );

  const getNumOfLeads = (id) => {
    const val =
      leadsList &&
      leadsList?.filter((valID) => {
        return valID.campaignId === id;
      });
    return val.length;
  };

  const forDownloading = (campaignListId, campaignListItemName) => {
    const val = leadsList?.filter((valID) => {
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
            <span className="campaign-btn-text">Save</span>
          </button>
          <button
            className="campaign-save-cancel-btn cancel-btn"
            onClick={() => {
              dispatch(campaignActions.campaignIDAction(""));
            }}
          >
            <span className="campaign-btn-text">Cancel</span>
          </button>
        </div>
      </form>
    );
  } else {
    return (
      <React.Fragment>
        <div className="campaignButton-actions">
          {campaignDocument.name && (
            <>
              <button
                className="campaign-btn edit-btn"
                onClick={() => {
                  dispatch(
                    campaignActions.campaignIDAction(campaignDocument.id)
                  );
                }}
                disabled={
                  selectedArray.length !== 0 ||
                  difference_startDate_endDate > 0 ||
                  campaignDocument.start_time <= moment().format("HH:mm")
                    ? true
                    : false
                }
                style={
                  selectedArray.length !== 0 ||
                  difference_startDate_endDate > 0 ||
                  campaignDocument.start_time <= moment().format("HH:mm")
                    ? {
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
                    : getNumOfLeads(campaignDocument.id)
                    ? true
                    : false
                }
                style={
                  selectedArray.length !== 0
                    ? {
                        pointerEvents: "auto",
                        cursor: "not-allowed",
                      }
                    : getNumOfLeads(campaignDocument.id)
                    ? { pointerEvents: "auto", cursor: "not-allowed" }
                    : {}
                }
                onClick={() => {
                  setOpenAlert(true);
                  setCampaignName(campaignDocument.name);
                  setIdForDelete(campaignDocument.id);
                }}
              >
                <Delete /> <span className="campaign-btn-text">Delete</span>
              </button>

              <button
                className="campaign-btn download-btn"
                disabled={
                  selectedArray.length !== 0
                    ? true
                    : getNumOfLeads(campaignDocument.id)
                    ? false
                    : true
                }
                style={
                  selectedArray.length !== 0
                    ? {
                        pointerEvents: "auto",
                        cursor: "not-allowed",
                      }
                    : getNumOfLeads(campaignDocument.id)
                    ? {}
                    : { pointerEvents: "auto", cursor: "not-allowed" }
                }
                onClick={() =>
                  forDownloading(campaignDocument.id, campaignDocument.name)
                }
              >
                <Download /> <span className="campaign-btn-text">Download</span>
              </button>
            </>
          )}
        </div>

        <AlertBeforeAction
          open={openAlert}
          setOpenAlert={setOpenAlert}
          campaignItemId={idForDelete}
          setIdForDelete={setIdForDelete}
          campaignName={campaignName}
          setCampaignName={setCampaignName}
          campaignsListData={campaignsListData}
        />
      </React.Fragment>
    );
  }
};

export default CampaignButtonActions;
