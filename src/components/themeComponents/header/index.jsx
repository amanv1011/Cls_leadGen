import React from "react";
import "./header.scss";
import { Box } from "@mui/system";
import BasicTabs from "../tabs";
import Popup from "../../themeComponents/popup";

const Header = () => {
  return (
    <Box className="header-container">
      <Box className="tabs">
        <BasicTabs type="dashboardTabs" />
      </Box>
      {window.location.pathname === "/campaign" ? (
        <>
          <Box className="impt-button">
            <Popup />
          </Box>
        </>
      ) : null}
    </Box>
  );
};

export default Header;
