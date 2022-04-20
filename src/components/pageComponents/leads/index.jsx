import React from "react";
import { Box, Divider } from "@mui/material";
import { Button } from "@mui/material";
import IButton from "../../themeComponents/button";
import IInput from "../../themeComponents/input";
import BasicTabs from "../../themeComponents/tabs";
import Lead from "../../commonComponents/lead";
import DownArrow from "./DownArrow";
import DoenArrowWhite from "./DoenArrowWhite";
import Approve from "../../commonComponents/lead/Approve";
import Reject from "../../commonComponents/lead/Reject";
import BasicDateRangePicker from './DatePicker';


import "./leads.scss";
import { WindowSharp } from "@mui/icons-material";
import UnderReview from "../../commonComponents/lead/UnderReview";
import Archive from "../../commonComponents/lead/Archive";
import DateModal from "./DateModal";


const Leads = () => {
  return (
    <Box className="leads-container">
      <Box className="leads-header">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex" }}>
            <IInput
              style={{ color: "rgba(92, 117,154)" }}
              placeholder={"Search"}
              isSearch={true}
            />
            <Button
              style={{
                fontFamily: "Segoe UI",
                textTransform: "none",
                height: "40px",
                width: "181px",
                justifyContent: "flex-start",
                padding: "10px",
                borderRadius: "10px",
                marginLeft: "10px",
                backgroundColor: "#E7E7E7",
                color: "rgba(92, 117,154)",
              }}
            >
              All Campaigns{" "}
              <span style={{ marginLeft: "38px", paddingBottom: "5px" }}>
                {" "}
                <DownArrow />{" "}
              </span>
            </Button>
          </div>

          <div style={{ display: "flex" }}>
            <div>
              
            {/* <BasicDateRangePicker /> */}
            <DateModal />
           
            </div>
            

            

            <Button
              style={{
                fontFamily: "Segoe UI",
                justifyContent: "flex-start",
                textTransform: "none",
                height: "40px",
                width: "181px",
                padding: "10px",
                borderRadius: "10px",
                marginLeft: "10px",
                backgroundColor: "#E7E7E7",
                color: "rgba(92, 117,154)",
              }}
            >
              Owner
              <div style={{ paddingBottom: "5px", paddingLeft: "80px" }}>
                <DownArrow />
              </div>
            </Button>
          </div>
        </div>
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
