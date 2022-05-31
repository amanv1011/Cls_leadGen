import { Divider } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import "./leadDescription.scss";

const desc =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
const LeadDescription = () => {
  return (
    <Box component={"div"} className="leads-description-container">
      <Box component={"div"} className="leads-description-header">
        <Box component={"div"} className="left-section">
          <Box component={"div"} className="title">
            Quality Test Assurence
          </Box>
          <Box component={"div"} className="subtitle">
            Subtitle
          </Box>
        </Box>
        <Box component={"div"} className="right-section">
          <Box component={"div"} className="links">
            Links
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box component={"div"} className="leads-description-body">
        <Box component={"div"} className="leads-description-heading">
          <Box component={"div"} className="heading-element">
            Name : "Onkar Singh"
          </Box>
          <Box component={"div"} className="heading-element">
            Name : "Onkar Singh"
          </Box>
          <Box component={"div"} className="heading-element">
            Name : "Onkar Singh"
          </Box>
        </Box>
        <Box component={"div"} className="leads-description-desc">
          <Box component={"div"} className="leads-description-desc-title">
            Description
          </Box>
          <Box component={"div"} className="leads-description-desc-desc">
            {desc}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LeadDescription;
