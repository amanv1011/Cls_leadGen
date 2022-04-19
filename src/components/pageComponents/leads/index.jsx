import React from "react";
import { Box, Divider } from "@mui/material";
import { Button } from "@mui/material";
import IButton from "../../themeComponents/button";
import IInput from "../../themeComponents/input";
import BasicTabs from "../../themeComponents/tabs";
import Lead from "../../commonComponents/lead";
import BasicDateRangePicker from "./DatePicker";
import DownArrow from "./DownArrow";
import DoenArrowWhite from "./DoenArrowWhite";
import Approve from "../../commonComponents/lead/Approve";
import Reject from "../../commonComponents/lead/Reject";
import { useRef } from "react";
import "./leads.scss";
import { WindowSharp } from "@mui/icons-material";
import UnderReview from "../../commonComponents/lead/UnderReview";
import Archive from "../../commonComponents/lead/Archive";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LeadsHeader from "./leadsHeader";

const Leads = () => {
  return (
    <Box className="leads-container">
      <Box className="leads-header">
        <LeadsHeader />
      </Box>
      <Box className="leads-table-container">
        <Box classNAme="leads-header-container" style={{ display: "flex" }}>
          <BasicTabs type="leadsTabs" />
          <span>
            {" "}
            <Button
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
              Export to Excel{" "}
              <div style={{ paddingBottom: "5px", paddingLeft: "23px" }}>
                <DoenArrowWhite />
              </div>
            </Button>{" "}
          </span>
        </Box>
        <Box className="leads-table">
          {window.location.pathname === "/app/dashboard/leads" ? (
            <>
              <Lead />
            </>
          ) : null}

          {window.location.pathname === "/app/dashboard/leads/approve" ? (
            <>
              <Approve />
            </>
          ) : null}

          {window.location.pathname === "/app/dashboard/leads/reject" ? (
            <>
              <Reject />
            </>
          ) : null}

          {window.location.pathname === "/app/dashboard/leads/underreview" ? (
            <>
              <UnderReview />
            </>
          ) : null}

          {window.location.pathname === "/app/dashboard/leads/archive" ? (
            <>
              <Archive />
            </>
          ) : null}
          {/* <Lead /> */}
        </Box>
      </Box>
    </Box>
  );
};

export default Leads;
