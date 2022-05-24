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
import * as XLSX from "xlsx";
import PaginationComponent from "../../commonComponents/PaginationComponent/index";

const Leads = () => {
  const totalCount = useSelector((state) => state.paginationStates.totalCount);
  const dataPerPage = useSelector(
    (state) => state.paginationStates.dataPerPage
  );
  const leadsLoader = useSelector((state) => state.allLeads.loading);
  const cardsToDisplay = useSelector((state) => state.allLeads.cardsToDisplay);

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [day, month, year].join("/");
  }

  const downloadLeads = (leadsList, excelFileName) => {
    let updatedleadsListDataToDownload = [];
    leadsList.forEach((lead) => {
      let campaignListDataToDownload = {
        "Company name": lead.companyName !== null ? lead.companyName : "NA",
        Location: lead.location !== "No location" ? "lead.location" : "NA",
        "Lead generated date": formatDate(lead.leadGeneratedDate.toDate()),
        "Lead posted date": formatDate(lead.leadPostedDate),
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
    let workBook = XLSX.utils.book_new();
    let workSheet = XLSX.utils.json_to_sheet(updatedleadsListDataToDownload);
    XLSX.utils.book_append_sheet(workBook, workSheet, "Sheet 1");
    XLSX.writeFile(workBook, `${excelFileName}.xlsx`);
  };

  const exportLeadsToExcel = () => {
    if (window.location.pathname === "/leads") {
      downloadLeads(cardsToDisplay, "All leads");
    }
    if (window.location.pathname === "/leads/approve") {
      downloadLeads(cardsToDisplay, "Approved Leads");
    }

    if (window.location.pathname === "/leads/reject") {
      downloadLeads(cardsToDisplay, "Rejected Leads");
    }
    if (window.location.pathname === "/leads/underreview") {
      downloadLeads(cardsToDisplay, "Under Review Leads");
    }
    if (window.location.pathname === "/leads/archive") {
      downloadLeads(cardsToDisplay, "Archived Leads");
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
