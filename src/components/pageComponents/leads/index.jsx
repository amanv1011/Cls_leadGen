import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import React from "react";
import BasicTabs from "../../themeComponents/tabs";
import Lead from "../../commonComponents/lead";
import Approve from "../../commonComponents/lead/Approve";
import Reject from "../../commonComponents/lead/Reject";
import "./leads.scss";
import UnderReview from "../../commonComponents/lead/UnderReview";
import Archive from "../../commonComponents/lead/Archive";
import LeadsHeader from "./leadsHeader";
import PaginationComponent from "../../commonComponents/PaginationComponent/index";
import * as commonFunctions from "../../pageComponents/campaign/commonFunctions";

const Leads = () => {
  const totalCount = useSelector((state) => state.paginationStates.totalCount);
  const dataPerPage = useSelector(
    (state) => state.paginationStates.dataPerPage
  );
  const leadsLoader = useSelector((state) => state.allLeads.loading);
  const cardsToDisplay = useSelector((state) => state.allLeads.cardsToDisplay);

  const downloadLeads = (leadsList, excelFileName) => {
    let updatedleadsListDataToDownload = [];
    leadsList.forEach((lead) => {
      let campaignListDataToDownload = {
        "Company name": lead.companyName !== null ? lead.companyName : "NA",
        Location: lead.location !== "No location" ? "lead.location" : "NA",
        "Lead generated date": commonFunctions.formatDate(
          lead.leadGeneratedDate.toDate(),
          false
        ),
        "Lead posted date": commonFunctions.formatDate(
          lead.leadPostedDate,
          false
        ),
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
      `${excelFileName}`
    );
  };

  const exportLeadsToExcel = () => {
    if (window.location.pathname === "/leads") {
      downloadLeads(cardsToDisplay, "All leads");
    }
    if (window.location.pathname === "/leads/approve") {
      downloadLeads(cardsToDisplay, "Approved leads");
    }

    if (window.location.pathname === "/leads/reject") {
      downloadLeads(cardsToDisplay, "Rejected leads");
    }
    if (window.location.pathname === "/leads/underreview") {
      downloadLeads(cardsToDisplay, "Under review leads");
    }
    if (window.location.pathname === "/leads/archive") {
      downloadLeads(cardsToDisplay, "Archived leads");
    }
  };

  return (
    <React.Fragment>
      <Box className="leads-container">
        <Box className="leads-header">
          <LeadsHeader />
        </Box>
        <Box className="leads-table-container">
          <Box
            classNAme="leads-header-container"
            style={{
              display: "flex",
              paddingRight: "27px",
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <BasicTabs type="leadsTabs" />
            <span>
              <Button
                variant="outlined"
                onClick={exportLeadsToExcel}
                className="export-to-excel-button"
                disabled={cardsToDisplay.length === 0 ? true : false}
                style={
                  cardsToDisplay.length === 0
                    ? {
                        pointerEvents: "auto",
                        cursor: "not-allowed",
                      }
                    : {}
                }
              >
                Export to Excel
              </Button>
            </span>
          </Box>
          <Box className="leads-table">
            {window.location.pathname === "/leads" ? (
              <>
                <Lead />
              </>
            ) : null}

            {window.location.pathname === "/leads/approve" ? (
              <>
                <Approve />
              </>
            ) : null}

            {window.location.pathname === "/leads/reject" ? (
              <>
                <Reject />
              </>
            ) : null}

            {window.location.pathname === "/leads/underreview" ? (
              <>
                <UnderReview />
              </>
            ) : null}

            {window.location.pathname === "/leads/archive" ? (
              <>
                <Archive />
              </>
            ) : null}
          </Box>
        </Box>
        <div className="leadsPage_pagination">
          <PaginationComponent
            dataPerPage={dataPerPage}
            dataLength={totalCount}
            loader={leadsLoader}
          />
        </div>
      </Box>
    </React.Fragment>
  );
};

export default Leads;
