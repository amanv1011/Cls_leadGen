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
  const totalCount = useSelector((state) => state.paginationStates.totalCount);
  const leadsPerPage = useSelector(
    (state) => state.paginationStates.leadsPerPage
  );
  const leadsLoader = useSelector((state) => state.allLeads.loading);
  const cardsToDisplay = useSelector((state) => state.allLeads.cardsToDisplay);

  const downloadLeads = (leadsList, excelFileName) => {
    let workBook = XLSX.utils.book_new();
    let workSheet = XLSX.utils.json_to_sheet(leadsList);
    XLSX.utils.book_append_sheet(workBook, workSheet, "Sheet 1");
    XLSX.writeFile(workBook, `${excelFileName}.xlsx`);
  };

  const exportLeadsToExcel = () => {
    if (window.location.pathname === "/leads") {
      // if (cardsToDisplay.length === 0) {
      //   return;
      // }
      downloadLeads(cardsToDisplay, "All leads");
    }
    if (window.location.pathname === "/leads/approve") {
      // if (cardsToDisplay.length === 0) {
      //   return;
      // }
      downloadLeads(cardsToDisplay, "Approved Leads");
    }

    if (window.location.pathname === "/leads/reject") {
      // if (cardsToDisplay.length === 0) {
      //   return;
      // }
      downloadLeads(cardsToDisplay, "Rejected Leads");
    }
    if (window.location.pathname === "/leads/underreview") {
      // if (cardsToDisplay.length === 0) {
      //   return;
      // }
      downloadLeads(cardsToDisplay, "Under Review Leads");
    }
    if (window.location.pathname === "/leads/archive") {
      // if (cardsToDisplay.length === 0) {
      //   return;
      // }
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
            style={{ display: "flex", paddingRight: "27px" }}
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
        <div className="pagination">
          <select
            className="card-selects"
            name="source"
            onChange={(event) => {
              dispatch(paginationActions.setLeadsPerPage(event.target.value));
              dispatch(paginationActions.setActivePage(1));
            }}
            autoComplete="off"
            defaultValue={leadsPerPage}
          >
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <PaginationComponent
            leadsPerPage={leadsPerPage}
            totalLeads={totalCount}
            loader={leadsLoader}
          />
        </div>
      </Box>
    </React.Fragment>
  );
};

export default Leads;
