import { Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
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
import * as paginationActions from "../../../redux/actions/paginationActions";

const Leads = () => {
  const dispatch = useDispatch();
  const genratedLeadData = useSelector((state) => state.allLeads.leadsList);
  const totalCount = useSelector((state) => state.paginationStates.totalCount);
  const leadsPerPage = useSelector(
    (state) => state.paginationStates.leadsPerPage
  );
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
    if (window.location.pathname === "/leads") {
      if (genratedLeadData.length === 0) {
        return;
      }
      downloadLeads(genratedLeadData, "All leads");
    }
    if (window.location.pathname === "/leads/approve") {
      if (approveList.length === 0) {
        return;
      }
      downloadLeads(approveList, "Approved Leads");
    }

    if (window.location.pathname === "/leads/reject") {
      if (rejectList.length === 0) {
        return;
      }
      downloadLeads(rejectList, "Rejected Leads");
    }
    if (window.location.pathname === "/leads/underreview") {
      if (underReviewList.length === 0) {
        return;
      }
      downloadLeads(underReviewList, "Under Review Leads");
    }
    if (window.location.pathname === "/leads/archive") {
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
            style={{ display: "flex", paddingRight: "27px" }}
          >
            <BasicTabs type="leadsTabs" />
            <span>
              <Button
                variant="outlined"
                onClick={exportLeadsToExcel}
                className="export-to-excel-button"
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
        <div className="pagination">
          <select
            className="card-selects"
            name="source"
            // value={leadsPerPage}
            onChange={(event) => {
              dispatch(paginationActions.setLeadsPerPage(event.target.value));
              dispatch(paginationActions.setActivePage(1));
            }}
            autoComplete="off"
          >
            <option value="" disabled selected>
              Select number of leads to display
            </option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={150}>150</option>
            <option value={200}>200</option>
          </select>
          <PaginationComponent
            leadsPerPage={leadsPerPage}
            totalLeads={totalCount}
          />
        </div>
      </Box>
    </React.Fragment>
  );
};

export default Leads;
