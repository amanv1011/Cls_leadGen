import React from "react";
import "./header.scss";
import { Box } from "@mui/system";
import BasicTabs from "../tabs";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Popup from "../../themeComponents/popup";

const Header = () => {
  return (
    <Box className="header-container">
      <Box className="tabs">
        <BasicTabs type="dashboardTabs" />
      </Box>
      {window.location.pathname === "/app/dashboard/campaign" ? (
        <>
          <Box className="impt-button">
            <Popup />
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="exportToExcel"
              table="table-to-xls"
              filename="tablexls"
              sheet="tablexls"
              buttonText="Export to Excel"
            />
          </Box>
        </>
      ) : null}
    </Box>
  );
};

export default Header;
