import React from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import BasicTabs from "../../themeComponents/tabs";
import Lead from "../../commonComponents/lead";
import Approve from "../../commonComponents/lead/Approve";
import Reject from "../../commonComponents/lead/Reject";
import "./leads.scss";
import UnderReview from "../../commonComponents/lead/UnderReview";
import Archive from "../../commonComponents/lead/Archive";
import LeadsHeader from "./leadsHeader";
import * as XLSX from "xlsx";

const Leads = () => {
  const genratedLeadData = useSelector((state) => state.allLeads.leadsList);
  const approveList = genratedLeadData.filter((ele) => ele.status === 1);
  const rejectList = genratedLeadData.filter((ele) => ele.status === -1);
  const underReviewList = genratedLeadData.filter((ele) => ele.status === 0);

  const downloadLeads = (leadsList, excelFileName) => {
    let workBook = XLSX.utils.book_new();
    let workSheet = XLSX.utils.json_to_sheet(leadsList);
    XLSX.utils.book_append_sheet(workBook, workSheet, "Sheet 1");
    XLSX.writeFile(workBook, `${excelFileName}.xlsx`);
  };

  const exportLeadsToExcel = () => {
    if (window.location.pathname === "/leadgen/app/dashboard/leads") {
      console.log("leads", genratedLeadData);
      if (genratedLeadData.length === 0) {
        return;
      }
      downloadLeads(genratedLeadData, "All leads");
    }
    if (window.location.pathname === "/leadgen/app/dashboard/leads/approve") {
      if (approveList.length === 0) {
        return;
      }
      downloadLeads(approveList, "Approved Leads");
    }

    if (window.location.pathname === "/leadgen/app/dashboard/leads/reject") {
      if (rejectList.length === 0) {
        return;
      }
      downloadLeads(rejectList, "Rejected Leads");
    }
    if (
      window.location.pathname === "/leadgen/app/dashboard/leads/underreview"
    ) {
      if (underReviewList.length === 0) {
        return;
      }
      downloadLeads(underReviewList, "Under Review Leads");
    }
    if (window.location.pathname === "/leadgen/app/dashboard/leads/archive") {
    }
  };

  return (
    <Box className="leads-container">
      <Box className="leads-header">
        <LeadsHeader />
      </Box>
      <Box className="leads-table-container">
        <Box classNAme="leads-header-container" style={{ display: "flex" }}>
          <BasicTabs type="leadsTabs" />
          <span>
            <Button
              onClick={exportLeadsToExcel}
              style={{
                fontFamily: "Segoe UI",
                textTransform: "none",
                height: "40px",
                width: "181px",
                padding: "10px",
                borderRadius: "10px",
                marginLeft: "10px",
                backgroundColor: "rgba(138,153, 183)",
                color: "rgba(255, 255, 255, 1)",
              }}
            >
              Export to Excel
            </Button>
          </span>
        </Box>
        <Box className="leads-table">
          {window.location.pathname === "/leadgen/app/dashboard/leads" ? (
            <>
              <Lead />
            </>
          ) : null}

          {window.location.pathname ===
          "/leadgen/app/dashboard/leads/approve" ? (
            <>
              <Approve />
            </>
          ) : null}

          {window.location.pathname ===
          "/leadgen/app/dashboard/leads/reject" ? (
            <>
              <Reject />
            </>
          ) : null}

          {window.location.pathname ===
          "/leadgen/app/dashboard/leads/underreview" ? (
            <>
              <UnderReview />
            </>
          ) : null}

          {window.location.pathname ===
          "/leadgen/app/dashboard/leads/archive" ? (
            <>
              <Archive />
            </>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default Leads;
